import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

const ListItem = (props) => {
  return (
    <TouchableHighlight onPress={() => props.selectItem(props.rowData)}>
      <Image style={{ width: 200, height: 200 }} source={{ uri: props.rowData.webformatURL }} />
    </TouchableHighlight>
  )
}

export default ListItem;
