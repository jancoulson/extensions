import React from 'react';
import moment from 'moment';
import {
  Caption,
  Card,
  Image,
  Subtitle,
  TouchableOpacity,
  View,
} from '@shoutem/ui';
import { assets } from 'shoutem.layouts';
import { ArticleView } from './ArticleView';

/**
 * A component used to render a single grid article item
 */
export class GridArticleView extends ArticleView {
  render() {
    const { title, imageUrl, date } = this.props;

    const momentDate = moment(date);
    const dateInfo = momentDate.isAfter(0) ? (
      <View styleName="horizontal">
        <Caption>{momentDate.fromNow()}</Caption>
      </View>
    ) : null;

    const articleImage = imageUrl
      ? { uri: imageUrl }
      : assets.noImagePlaceholder;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card styleName="flexible">
          <Image styleName="medium-wide placeholder" source={articleImage} />
          <View styleName="flexible content space-between">
            <Subtitle numberOfLines={3} styleName="lg-gutter-bottom">
              {title}
            </Subtitle>
            {dateInfo}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

GridArticleView.propTypes = ArticleView.propTypes;
GridArticleView.defaultProps = ArticleView.defaultProps;
