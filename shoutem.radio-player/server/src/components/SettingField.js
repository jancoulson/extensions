import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { FontIcon, FontIconPopover } from '@shoutem/react-web-ui';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class SettingField extends Component {
  static propTypes = {
    title: PropTypes.string,
    textValue: PropTypes.string,
    onChange: PropTypes.func,
    errorText: PropTypes.string,
    popoverMessage: PropTypes.string,
  };

  render() {
    const {
      title,
      textValue,
      onChange,
      errorText,
      popoverMessage,
    } = this.props;

    return (
      <div>
        <ControlLabel>{title}</ControlLabel>
        {!!popoverMessage && (
          <FontIconPopover message={popoverMessage}>
            <FontIcon className="icon-popover" name="info" size="24px" />
          </FontIconPopover>
        )}
        <FormControl
          className="form-control"
          onChange={onChange}
          type="text"
          value={textValue}
        />
        {errorText && <HelpBlock className="text-error">{errorText}</HelpBlock>}
      </div>
    );
  }
}
