import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CmsListScreen } from 'shoutem.cms';
import { navigateTo as navigateToAction } from 'shoutem.navigation';
import { openURL as openURLAction } from 'shoutem.web-view';
import { connectStyle } from '@shoutem/theme';
import ListProductView from '../components/ListProductView';
import { ext } from '../const';

export class ProductsList extends CmsListScreen {
  static propTypes = {
    ...CmsListScreen.propTypes,
    navigateTo: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.renderRow = this.renderRow.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);

    this.state = {
      ...this.state,
      schema: ext('Products'),
    };
  }

  openDetailsScreen(product) {
    const { navigateTo } = this.props;

    navigateTo({
      screen: ext('ProductDetails'),
      props: { product },
    });
  }

  renderRow(product) {
    return (
      <ListProductView product={product} onPress={this.openDetailsScreen} />
    );
  }
}

export const mapStateToProps = CmsListScreen.createMapStateToProps(
  state => state[ext()].latestProducts,
);

export const mapDispatchToProps = CmsListScreen.createMapDispatchToProps({
  navigateTo: navigateToAction,
  openURL: openURLAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectStyle(ext('ProductsList'), {})(ProductsList));
