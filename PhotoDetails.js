import React from 'react';
import { Text, ScrollView, Image, StyleSheet } from 'react-native';

const PhotoDetails = ({ user, comments, downloads, tags, favorites, likes, views, webformatURL, imageHeight, imageWidth }) => {
  const tagsWithHash = tags.split(', ').map(tag => `#${tag}`).join(' ');
  return (
    <ScrollView>
      <Image style={styles.imageSize} source={{ uri: webformatURL }} />
      <Text >{likes} likes</Text>
      <Text style={styles.baseText}>Posted by {user}</Text>
      <Text style={styles.baseText}>{tagsWithHash}</Text>
      <Text style={styles.baseText}>{views} views</Text>
      <Text style={styles.baseText}>{downloads} downloads</Text>
      <Text style={styles.baseText}>{favorites} favorites</Text>
      <Text style={styles.baseText}>{comments} comments</Text>
      <Text style={styles.baseText}>Resolution: {`${imageWidth} x ${imageHeight}`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Helvetica Neue',
    paddingLeft: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imageSize: {
    width: 350,
    height: 350,
  },
});


export default PhotoDetails;
