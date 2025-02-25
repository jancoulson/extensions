import React from 'react';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { Checkbox, FontIcon } from '@shoutem/react-web-ui';
import LOCALIZATION from './localization';
import './style.scss';

export default function WebEdit({
  url,
  showNavigationToolbar,
  requireCookiesPermission,
  requireGeolocationPermission,
  hasWebsiteSettings,
  forwardAuthHeader,
  startInLoadingState,
  showScreenTitle,
  onForwardAuthHeaderChange,
  onRemoveClick,
  onRequireGeolocationPermissionChange,
  onRequireCookiesPermissionChange,
  onShowNavigationToolbarChange,
  onStartInLoadingStateChange,
  onShowScreenTitleChange,
}) {
  function handleShowNavigationToolbarChange(event) {
    if (event.target) {
      onShowNavigationToolbarChange(event.target.checked);
    }
  }

  function handleForwardAuthHeaderChange(event) {
    if (event.target) {
      onForwardAuthHeaderChange(event.target.checked);
    }
  }

  function handleStartInLoadingStateChange(event) {
    if (event.target) {
      onStartInLoadingStateChange(event.target.checked);
    }
  }

  function handleShowScreenTitle(event) {
    if (event.target) {
      onShowScreenTitleChange(event.target.checked);
    }
  }

  function handleGeolocationPermissionChange(event) {
    if (event.target) {
      onRequireGeolocationPermissionChange(event.target.checked);
    }
  }

  function handleCookiesPermissionChange(event) {
    if (event.target) {
      onRequireCookiesPermissionChange(event.target.checked);
    }
  }

  return (
    <>
      <FormGroup>
        <ControlLabel>{i18next.t(LOCALIZATION.FORM_WEBSITE_URL)}</ControlLabel>
        <div className="web-edit__url-container">
          <div className="web-edit__web-img" />
          <div className="text-ellipsis">
            <span className="web-edit__url">{url}</span>
          </div>
          <FontIcon
            className="web-edit__remove"
            name="close"
            size="large"
            onClick={onRemoveClick}
          />
        </div>
        {hasWebsiteSettings && (
          <>
            <ControlLabel>
              {i18next.t(LOCALIZATION.FORM_WEBSITE_SETTINGS)}
            </ControlLabel>
            <Checkbox
              checked={requireGeolocationPermission}
              onChange={handleGeolocationPermissionChange}
            >
              {i18next.t(LOCALIZATION.FORM_LOCATION_PERMISSIONS)}
            </Checkbox>
            <Checkbox
              checked={requireCookiesPermission}
              onChange={handleCookiesPermissionChange}
            >
              {i18next.t(LOCALIZATION.FORM_COOKIES_PERMISSIONS)}
            </Checkbox>
            <Checkbox
              checked={showNavigationToolbar}
              onChange={handleShowNavigationToolbarChange}
            >
              {i18next.t(LOCALIZATION.FORM_NAVIGATION_BAR)}
            </Checkbox>
            <Checkbox
              checked={forwardAuthHeader}
              onChange={handleForwardAuthHeaderChange}
            >
              {i18next.t(LOCALIZATION.FORM_FORWARD_AUTH_HEADER)}
            </Checkbox>
            <Checkbox
              checked={startInLoadingState}
              onChange={handleStartInLoadingStateChange}
            >
              {i18next.t(LOCALIZATION.FORM_START_IN_LOADING_STATE)}
            </Checkbox>
            <Checkbox
              checked={showScreenTitle}
              onChange={handleShowScreenTitle}
            >
              {i18next.t(LOCALIZATION.FORM_SHOW_SCREEN_TITLE)}
            </Checkbox>
          </>
        )}
      </FormGroup>
    </>
  );
}

WebEdit.propTypes = {
  onForwardAuthHeaderChange: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onRequireCookiesPermissionChange: PropTypes.func.isRequired,
  onRequireGeolocationPermissionChange: PropTypes.func.isRequired,
  onShowNavigationToolbarChange: PropTypes.func.isRequired,
  onShowScreenTitleChange: PropTypes.func.isRequired,
  onStartInLoadingStateChange: PropTypes.func.isRequired,
  forwardAuthHeader: PropTypes.bool,
  hasWebsiteSettings: PropTypes.bool,
  requireCookiesPermission: PropTypes.bool,
  requireGeolocationPermission: PropTypes.bool,
  showNavigationToolbar: PropTypes.bool,
  showScreenTitle: PropTypes.bool,
  startInLoadingState: PropTypes.bool,
  url: PropTypes.string,
};

WebEdit.defaultProps = {
  hasWebsiteSettings: undefined,
  url: undefined,
  showNavigationToolbar: false,
  requireCookiesPermission: false,
  requireGeolocationPermission: false,
  showScreenTitle: true,
  startInLoadingState: true,
  forwardAuthHeader: false,
};
