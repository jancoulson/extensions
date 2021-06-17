import React from 'react';
import _ from 'lodash';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { FavoritesListScreen } from 'shoutem.favorites';
import { I18n } from 'shoutem.i18n';
import { connectStyle } from '@shoutem/theme';
import { Button, View, Text } from '@shoutem/ui';
import { MapList, PlacePhotoView } from '../components';
import { ext } from '../const';
import { getAllPlaces } from '../redux';

export class FavoritesList extends FavoritesListScreen {
  static propTypes = {
    ...FavoritesListScreen.PropTypes,
  };

  static getDerivedStateFromProps(props, state) {
    const { favorites } = props;

    if (_.isEmpty(favorites)) {
      return { mapView: false };
    }

    return state;
  }

  constructor(props, context) {
    super(props, context);

    this.renderData = this.renderData.bind(this);
    this.getNavBarProps = this.getNavBarProps.bind(this);
    this.toggleMapView = this.toggleMapView.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
    this.shouldRenderMap = this.shouldRenderMap.bind(this);

    this.state = {
      schema: ext('places'),
      mapView: false,
    };
  }

  shouldRenderMap(favorites) {
    const { mapView } = this.state;

    return !_.isEmpty(favorites) && mapView;
  }

  getNavBarProps() {
    const { title } = this.props;

    return {
      title,
      renderRightComponent: () => this.renderRightNavBarComponent(),
    };
  }

  renderFavorite(place) {
    return <PlacePhotoView place={place} />;
  }

  toggleMapView() {
    const { mapView } = this.state;

    LayoutAnimation.easeInEaseOut();
    this.setState({ mapView: !mapView });
  }

  renderRightNavBarComponent() {
    const { mapView } = this.state;
    const { favorites } = this.props;

    const actionText = mapView
      ? I18n.t('shoutem.cms.navBarListViewButton')
      : I18n.t('shoutem.cms.navBarMapViewButton');

    if (_.isEmpty(favorites)) {
      return null;
    }

    return (
      <View virtual styleName="container md-gutter-right">
        <Button styleName="tight" onPress={this.toggleMapView}>
          <Text>{actionText}</Text>
        </Button>
      </View>
    );
  }

  renderData(favorites) {
    if (this.shouldRenderMap(favorites)) {
      return <MapList places={favorites} />;
    }
    return super.renderData(favorites);
  }
}

export const mapStateToProps = FavoritesListScreen.createMapStateToProps(
  ext('places'),
  getAllPlaces,
);

export const mapDispatchToProps = FavoritesListScreen.createMapDispatchToProps();

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectStyle(ext('FavoritesList'), {})(FavoritesList));
