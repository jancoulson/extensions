import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import ControlButtonsView from './ControlButtonsView';
import ProfileImage from './ProfileImage';
import { ext } from '../const';

function VideoCallStartingView({
  fullName,
  onStartCallPress,
  style,
  image,
  channelLoading,
}) {
  return (
    <View style={style.videoCallStartingView}>
      <ProfileImage image={image} />

      <View style={style.bottomContainer}>
        <Text style={style.peerName}>{fullName}</Text>

        <ControlButtonsView
          connectionSuccess={false}
          disabled
          onStartCallPress={onStartCallPress}
          loading={channelLoading}
        />
      </View>
    </View>
  );
}

VideoCallStartingView.propTypes = {
  fullName: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  onStartCallPress: PropTypes.func,
  style: PropTypes.object,
  channelLoading: PropTypes.bool,
};

export default connectStyle(ext('VideoCallStartingView'))(
  VideoCallStartingView,
);
