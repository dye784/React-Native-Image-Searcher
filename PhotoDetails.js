import React from 'react';
import { Text, View, Image } from 'react-native';

const PhotoDetails = ({ user, comments, downloads, tags, favorites, likes, views, webformatURL }) => {
  return (
    <View>
      <Image style={{ width: 200, height: 200 }} source={{ uri: webformatURL }} />
      <Text>user: {user}</Text>
      <Text>comments: {comments}</Text>
      <Text>downloads: {downloads}</Text>
      <Text>tags: {tags}</Text>
      <Text>favorites: {favorites}</Text>
      <Text>likes: {likes}</Text>
      <Text>views: {views}</Text>
    </View>
  );
};

export default PhotoDetails;
