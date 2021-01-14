import React, { Component } from 'react';
import autoBindReact from 'auto-bind/react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectStyle } from '@shoutem/theme';
import { View, Screen } from '@shoutem/ui';
import { executeShortcut } from 'shoutem.application/redux';
import { ScreenStack } from '../components/stacks';
import TabBarItem from '../components/TabBarItem';
import { NavigationBar } from '../components/ui';
import {
  navigateTo,
  jumpToKey,
  resetToRoute,
  navigateBack,
  setActiveNavigationStack,
  hasRouteWithKey,
} from '../redux/core';
import { ext } from '../const';
import { shortcutChildrenRequired } from '../helpers';
import {
  TAB_BAR_NAVIGATION_STACK,
  getTabNavigationStateFromTabBarState,
  getTabNavigationStack,
} from '../redux';

const TABS_LIMIT = 5;

export class TabBar extends Component {
  static propTypes = {
    // Server props
    shortcut: PropTypes.object.isRequired,
    startingScreen: PropTypes.string,
    showText: PropTypes.bool,
    showIcon: PropTypes.bool,

    // Props from local state (connect)
    tabStates: PropTypes.object,
    navigationState: PropTypes.object,
    // navigationState.routes contains the specific tab shortcut object

    // Props from mapDispatchToProps
    executeShortcut: PropTypes.func,
    navigateTo: PropTypes.func,
    navigateBack: PropTypes.func,
    resetToRoute: PropTypes.func,
    jumpToKey: PropTypes.func,
    setActiveNavigationStack: PropTypes.func,
  };

  state = {
    // Stores the currently selected shortcut. We cannot use the active
    // shortcut from global state, because shortcuts can be nested. The
    // tab should remain selected while the shortcut from the tab bar is
    // active, or any of its children are active.
    selectedShortcut: null,
  };

  constructor(props, context) {
    super(props, context);

    autoBindReact(this);

    // Debounce the reset tab to top to avoid weird issues (e.g., app freezes)
    // when the navigation state is being reset during transitions.
    this.resetTabNavigationStateToTop = _.debounce(this.resetTabNavigationStateToTop, 300, {
      maxWait: 100,
    });
  }

  componentDidMount() {
    const startingShortcut = this.getStartingShortcut();

    this.openShortcut(startingShortcut);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    return !_.isEqual(nextProps, this.props);
  }

  getStartingShortcut() {
    const { startingScreen, shortcut } = this.props;

    return _.find(shortcut.children, ['id', startingScreen]) || _.head(shortcut.children);
  }

  getTabRouteForShortcut(shortcut) {
    return {
      context: {
        shortcutId: shortcut.id,
      },
      key: getTabNavigationStack(shortcut.id).name,
      screen: ext('Tab'),
      props: {
        shortcut,
      },
    };
  }

  resetTabNavigationStateToTop(tabId) {
    const { tabStates, resetToRoute } = this.props;

    const tabNavigationState = getTabNavigationStateFromTabBarState(tabStates, tabId);
    const tabNavigationStackName = getTabNavigationStack(tabId);
    const firstRoute = _.head(tabNavigationState.routes);

    resetToRoute(firstRoute, tabNavigationStackName);
  }

  openShortcut(shortcut) {
    // eslint-disable-next-line no-shadow
    const {
      executeShortcut,
      navigationState,
      navigateTo,
      jumpToKey,
      setActiveNavigationStack,
    } = this.props;

    const { selectedShortcut } = this.state;

    if (shortcut === selectedShortcut) {
      // Tapping twice on the same tab resets tab screens stack.
      this.resetTabNavigationStateToTop(shortcut.id);
      return;
    }

    const navigationStack = getTabNavigationStack(shortcut.id);
    const stackName = navigationStack.name;

    if (shortcut.action) {
      // This is an external action, we don't want to change anything
      // in the ui, just execute this shortcut
      executeShortcut(shortcut.id, undefined, navigationStack);
      return;
    }

    if (hasRouteWithKey(navigationState, stackName)) {
      // We are returning to an existing tab, it is already
      // rendered, just jump to it
      setActiveNavigationStack(navigationStack);
      jumpToKey(stackName, TAB_BAR_NAVIGATION_STACK);
    } else {
      // We are navigation to a tab for the first time, push the new
      // tab to the navigation stack
      setActiveNavigationStack(navigationStack);
      navigateTo(this.getTabRouteForShortcut(shortcut), TAB_BAR_NAVIGATION_STACK);
      executeShortcut(shortcut.id, undefined, navigationStack);
    }

    // Update the selected shortcut, so that the correct tab is
    // marked as selected in the tab bar ui
    this.setState({
      selectedShortcut: shortcut,
    });
  }

  renderTabBarItems() {
    const { showText, showIcon, shortcut } = this.props;
    const { selectedShortcut } = this.state;

    return _.take(shortcut.children, TABS_LIMIT).map(tabShortcut => (
      <TabBarItem
        key={`tab-bar-item-${tabShortcut.id}`}
        showText={showText}
        showIcon={showIcon}
        shortcut={tabShortcut}
        selected={tabShortcut === selectedShortcut}
        onPress={this.openShortcut}
      />
    ));
  }

  render() {
    const {
      style,
      navigationState,
      navigateBack,
    } = this.props;

    return (
      <Screen style={style.screen}>
        <NavigationBar hidden />
        <ScreenStack
          styleName="without-transitions"
          useNativeAnimations={false}
          gestureResponseDistance={0}
          direction="vertical"
          navigationState={navigationState}
          onNavigateBack={navigateBack}
        />
        <View styleName="horizontal">
          {this.renderTabBarItems()}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { tabStates, navigationState } = state[ext()].tabBar;

  return {
    tabStates,
    navigationState,
  };
};

const mapDispatchToProps = {
  executeShortcut,
  navigateTo,
  jumpToKey,
  navigateBack,
  resetToRoute,
  setActiveNavigationStack,
};

export default shortcutChildrenRequired(
  connect(mapStateToProps, mapDispatchToProps)(connectStyle(ext('TabBar'))(TabBar))
);
