import _ from 'lodash';
import { isRSAA, RSAA } from 'redux-api-middleware';
import URI from 'urijs';

import { getOne, UPDATE_SUCCESS } from '@shoutem/redux-io';
import { priorities, setPriority, before } from 'shoutem-core';

import { getExtensionSettings, RESTART_APP } from 'shoutem.application';
import {
  createResetToCurrentRoute,
  isEmptyRoute,
  isNavigationAction,
  navigateTo,
  redirectTo,
} from 'shoutem.navigation';

import { ext } from './const';
import { isAuthenticationRequired } from './isAuthenticationRequired';
import {
  isAuthenticated,
  isUserUpdateAction,
  getUser,
  LOGOUT,
  AUTHENTICATE,
  getAccessToken,
} from './redux';
import { clearSession, getSession, saveSession } from './session.js';

function getAuthHeader(state) {
  return `Bearer ${getAccessToken(state)}`;
}

const APPLICATION_EXTENSION = 'shoutem.application';
const AUTH_HEADERS = 'headers.Authorization';

const hasValidRoute = action => action.route && !isEmptyRoute(action.route);

export function createLoginMiddleware(screens) {
  return setPriority(
    store => next => action => {
      // We want to intercept only actions with a route because this is the only way
      // to open a new screen.
      if (isNavigationAction(action) && hasValidRoute(action)) {
        const state = store.getState();

        if (
          isAuthenticationRequired(screens, action, state) &&
          !isAuthenticated(state)
        ) {
          const navigateToCurrentRoute = createResetToCurrentRoute(
            state,
            store.dispatch,
            action.route,
          );

          return next(
            redirectTo(action, {
              screen: ext('LoginScreen'),
              props: {
                action,
                onLoginSuccess: navigateToCurrentRoute,
                interceptedRoute: _.get(action, 'route', null),
              },
            }),
          );
        }
      }

      return next(action);
    },
    priorities.AUTH,
  );
}

/**
 * Enables an action within a screen to require authentication.
 * For example, when a comment button is clicked and this action requires a session.
 *
 * If the user is not authenticated, this middleware will present a login screen.
 * After successful login, it will execute the callback provided in the action.
 * If the user is already logged in, the callback will be immediately executed.
 */
export const authenticateMiddleware = setPriority(
  store => next => action => {
    if (action.type === AUTHENTICATE) {
      const state = store.getState();
      const { dispatch } = store;

      if (isAuthenticated(state)) {
        const { user } = state[ext()];

        action.callback(getOne(user, state));
      } else {
        const navigateToCurrentRoute = createResetToCurrentRoute(
          state,
          dispatch,
        );

        dispatch(
          navigateTo({
            screen: ext('LoginScreen'),
            props: {
              onLoginSuccess: user => {
                navigateToCurrentRoute();
                action.callback(user);
              },
              onRegisterSuccess: user => {
                action.callback(user);
              },
            },
          }),
        );
      }
    }

    return next(action);
  },
  priorities.AUTH,
);

/**
 * Listens to user profile changes and updates the saved session.
 * When the app is restarted and we restore the session, it will have the updates.
 */
export const userUpdatedMiddleware = store => next => action => {
  if (action.type === UPDATE_SUCCESS && isUserUpdateAction(action)) {
    getSession().then((session = {}) => {
      const user = getUser(store.getState());

      const newSession = { ...JSON.parse(session), user };
      saveSession(JSON.stringify(newSession));
    });
  }
  return next(action);
};

let legacyApiDomain;

/**
 * Sets header Authorization value for every network request to endpoints registered
 * in shoutem.application that doesn't already include any Authorization header
 */
export const networkRequestMiddleware = setPriority(
  store => next => action => {
    if (isRSAA(action)) {
      const state = store.getState();

      if (!legacyApiDomain) {
        const appSettings = getExtensionSettings(state, APPLICATION_EXTENSION);

        const { legacyApiEndpoint } = appSettings;

        legacyApiDomain =
          legacyApiEndpoint && new URI(legacyApiEndpoint).domain();
      }

      const endpointDomain = new URI(action[RSAA].endpoint).domain();

      if (
        legacyApiDomain === endpointDomain &&
        !_.has(action[RSAA], AUTH_HEADERS)
      ) {
        _.set(action[RSAA], AUTH_HEADERS, getAuthHeader(state));
      }
    }

    return next(action);
  },
  before(priorities.NETWORKING),
);

export const logoutMiddleware = setPriority(
  store => next => action => {
    const actionType = _.get(action, 'type');

    if (actionType === LOGOUT) {
      clearSession().then(
        () => store.dispatch({ type: RESTART_APP }),
        reason => console.warn(reason),
      );
    }
    return next(action);
  },
  priorities.AUTH,
);
