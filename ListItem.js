import React from 'react';
import { Image, TouchableHighlight } from 'react-native';

const ListItem = ({ rowData, selectItem }) => {
  return (
    <TouchableHighlight onPress={() => selectItem(rowData)}>
      <Image style={{ width: 300, height: 300 }} source={{ uri: rowData.webformatURL }} />
    </TouchableHighlight>
  )
}

export default ListItem;
