import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connectStyle } from '@shoutem/theme';
import { isAndroid, isIos } from 'shoutem-core';
import { ext } from '../const';

const KEYBOARD_AVOIDING_BEHAVIOUR = isAndroid ? null : 'padding';
const KEYBOARD_DISMISS_MODE = isIos ? 'interactive' : 'on-drag';

function KeyboardAwareScreen(props) {
  const { children, containerStyle, renderFooter, style } = props;

  const hasFooter = useMemo(() => _.isFunction(renderFooter), [renderFooter]);

  const resolvedContainerStyle = useMemo(
    () => [style.container, containerStyle],
    [containerStyle, style.container],
  );

  const headerHeight = useHeaderHeight();

  if (isIos) {
    return (
      <SafeAreaView edges={['left']} style={style.mainContainer}>
        <KeyboardAvoidingView
          behavior={KEYBOARD_AVOIDING_BEHAVIOUR}
          keyboardVerticalOffset={headerHeight}
          style={resolvedContainerStyle}
        >
          <ScrollView
            keyboardDismissMode={KEYBOARD_DISMISS_MODE}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          <View style={style.footer}>{hasFooter && renderFooter()}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={resolvedContainerStyle}
    >
      <ScrollView
        keyboardDismissMode={KEYBOARD_DISMISS_MODE}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <View style={style.footer}>{hasFooter && renderFooter()}</View>
    </KeyboardAvoidingView>
  );
}

KeyboardAwareScreen.propTypes = {
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
  renderFooter: PropTypes.func,
  style: PropTypes.object,
};

KeyboardAwareScreen.defaultProps = {
  containerStyle: {},
  style: {},
  renderFooter: null,
};

export default connectStyle(ext('KeyboardAwareScreen'))(KeyboardAwareScreen);
