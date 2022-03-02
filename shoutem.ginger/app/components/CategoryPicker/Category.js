import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connectStyle } from '@shoutem/theme';
import { Text, TouchableOpacity } from '@shoutem/ui';
import { ext } from '../../const';

function Category({ category, style, isSelected, onPress }) {
  const textStyle = useMemo(
    () => [style.category, !isSelected && style.selectedCategory],
    [isSelected, style.category, style.selectedCategory],
  );

  function handlePress() {
    if (isSelected) {
      return;
    }

    if (onPress) {
      onPress(category);
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={style.container}>
      <Text style={textStyle}>{category.name}</Text>
    </TouchableOpacity>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

Category.defaultProps = {
  style: {},
  isSelected: false,
  onPress: undefined,
};

export default React.memo(connectStyle(ext('Category'))(Category));
