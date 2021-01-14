import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectStyle } from '@shoutem/theme';
import { dimensionRelativeToIphone, Device } from '@shoutem/ui';
import {
  LIST,
  ext,
  IPHONE_X_NOTCH_PADDING,
  IPHONE_XR_NOTCH_PADDING,
  IPHONE_X_HOME_INDICATOR_PADDING,
  NAVIGATION_HEADER_HEIGHT,
} from '../const';
import { isTabBarNavigation, resolveScrollViewProps } from '../helpers';
import ListItem from './ListItem';
import FolderBase from './FolderBase';

class List extends FolderBase {
  static propTypes = {
    ...FolderBase.propTypes,
    listAlignment: PropTypes.string,
    topOffset: PropTypes.number,
    showText: PropTypes.bool,
    backgroundImage: PropTypes.string,
    textSize: PropTypes.string,
  };

  resolveScrollViewProps() {
    return resolveScrollViewProps(this.props);
  }

  resolvePageProps() {
    const { topOffset, listAlignment } = this.getLayoutSettings();
    const { dimensions: { height } } = this.state;
    const { style, isTabBar } = this.props;

    const homeBarHeight = Device.select({
      iPhoneX: IPHONE_X_HOME_INDICATOR_PADDING,
      iPhoneXR: IPHONE_X_HOME_INDICATOR_PADDING,
      default: 0,
    });

    return {
      style: {
        paddingTop: dimensionRelativeToIphone(topOffset),
        minHeight: isTabBar ? height : height - homeBarHeight,
        ...style.page,
      },
      styleName: listAlignment,
    };
  }

  renderRow(shortcut, index) {
    const { showText, showIcon, inItemAlignment, textSize } = this.getLayoutSettings();
    const { style } = this.props;

    const listItemStyle = { ...style, text: { ...style.text, ...style[`${textSize}-text`] } };

    return (
      <ListItem
        key={`item_${index}`}
        showText={showText}
        showIcon={showIcon}
        shortcut={shortcut}
        inItemAlignment={inItemAlignment}
        onPress={this.itemPressed}
        style={listItemStyle}
      />
    );
  }
}

const mapPropsToStyleNames = (styleNames, props) => {
  const { inItemAlignment } = props;

  // Add inItemAlignment as style name to align content
  styleNames.push(`in-item-alignment-${inItemAlignment}`);

  return FolderBase.mapPropsToStyleNames(styleNames, props);
};

const mapStateToProps = (state) => ({
  isTabBar: isTabBarNavigation(state),
});

export default connect(mapStateToProps, undefined)(
  connectStyle(LIST, undefined, mapPropsToStyleNames)(List)
);
