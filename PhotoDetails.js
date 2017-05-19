import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const PhotoDetails = ({ user, comments, downloads, tags, favorites, likes, views, webformatURL, imageHeight, imageWidth }) => {
  const tagsWithHash = tags.split(', ').map(tag => `#${tag}`).join(' ');
  return (
    <View>
      <Image style={{ width: 400, height: 400 }} source={{ uri: webformatURL }} />
      <Text style={styles.baseText}>{likes} likes</Text>
      <Text style={styles.baseText}>Posted by {user}</Text>
      <Text style={styles.baseText}>{tagsWithHash}</Text>
      <Text style={styles.baseText}>{views} views</Text>
      <Text style={styles.baseText}>{downloads} downloads</Text>
      <Text style={styles.baseText}>{favorites} favorites</Text>
      <Text style={styles.baseText}>{comments} comments</Text>
      <Text style={styles.baseText}>Resolution: {`${imageWidth} x ${imageHeight}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica Neue',
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
});


export default PhotoDetails;
