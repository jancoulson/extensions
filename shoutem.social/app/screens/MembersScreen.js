import PropTypes from 'prop-types';
import React from 'react';
import { InteractionManager } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBindReact from 'auto-bind/react';
import _ from 'lodash';

import { isBusy, isInitialized, next } from '@shoutem/redux-io';
import {
  setStatus,
  createStatus,
  updateStatus,
  validationStatus,
} from '@shoutem/redux-io/status';
import { connectStyle } from '@shoutem/theme';
import {
  ListView,
  View,
  Button,
  Icon,
} from '@shoutem/ui';

import { RemoteDataListScreen } from 'shoutem.application';
import { navigateTo } from 'shoutem.navigation';

import MemberView from '../components/MemberView';
import { user as userShape } from '../components/shapes';
import { ext } from '../const';
import { loadUsers } from '../redux';
import { openProfileForLegacyUser } from '../services';

export class MembersScreen extends RemoteDataListScreen {
  static propTypes = {
    ...RemoteDataListScreen.propTypes,
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      data: PropTypes.arrayOf(userShape),
    }),
  };

  constructor(props) {
    super(props);

    autoBindReact(this);
  }

  openSearchScreen() {
    const { navigateTo } = this.props;

    const route = {
      screen: ext('SearchScreen'),
    };

    navigateTo(route);
  }

  fetchData() {
    const { loadUsers } = this.props;

    InteractionManager.runAfterInteractions(() => {
      loadUsers();
    });
  }

  getNavigationBarProps() {
    const { title } = this.props;

    return {
      title: title.toUpperCase(),
      renderRightComponent: this.renderRightComponent,
    };
  }

  getListProps() {
    return {
      data: this.props.data.data,
    };
  }

  renderRightComponent() {
    return (
      <Button onPress={() => this.openSearchScreen()}>
        <Icon name="search" />
      </Button>
    );
  }

  renderRow(user) {
    const { openProfile } = this.props;
    return (
      <View>
        <MemberView
          openProfile={openProfile}
          user={user}
        />
      </View>
    );
  }

  renderData(data) {
    const { loadUsers } = this.props;

    if (this.shouldRenderPlaceholderView(data)) {
      return this.renderPlaceholderView(data);
    }

    return (
      <ListView
        {...this.getListProps()}
        getSectionId={this.getSectionId}
        initialListSize={1}
        loading={isBusy(data) || !isInitialized(data)}
        onLoadMore={this.loadMore}
        onRefresh={loadUsers}
        renderRow={this.renderRow}
        style={this.props.style.list}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const users = { data: ownProps.users };

  // update status to valid to initialize data
  const initializedStatus = updateStatus(createStatus(), {
    validationStatus: validationStatus.VALID,
  });
  setStatus(users, initializedStatus);

  return {
    data: _.isEmpty(users.data) ? state[ext()].users : users,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators({
    navigateTo,
    loadUsers: ownProps.users ? undefined : loadUsers,
    next,
  }, dispatch),
  openProfile: openProfileForLegacyUser(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('MembersScreen'))(MembersScreen),
);
