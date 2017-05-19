import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const PhotoDetails = ({ user, comments, downloads, tags, favorites, likes, views, webformatURL, imageHeight, imageWidth }) => {
  return (
    <View>
      <Image style={{ width: 200, height: 200 }} source={{ uri: webformatURL }} />
      <Text style={styles.baseText}>tags: {tags}</Text>
      <Text style={styles.baseText}>user: {user}</Text>
      <Text style={styles.baseText}>comments: {comments}</Text>
      <Text style={styles.baseText}>downloads: {downloads}</Text>
      <Text style={styles.baseText}>favorites: {favorites}</Text>
      <Text style={styles.baseText}>likes: {likes}</Text>
      <Text style={styles.baseText}>views: {views}</Text>
      <Text style={styles.baseText}>resolution: {`${imageWidth} x ${imageHeight}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica Neue',
  },
});


export default PhotoDetails;
