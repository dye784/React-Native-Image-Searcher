import React from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';

const ListItem = ({ rowData, selectItem }) => (
  <TouchableHighlight onPress={() => selectItem(rowData)}>
    <Image style={styles.imageSize} source={{ uri: rowData.webformatURL }} />
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  imageSize: {
    width: 300,
    height: 300,
  },
});

export default ListItem;
