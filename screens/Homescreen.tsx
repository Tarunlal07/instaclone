import {View} from 'react-native';
import React from 'react';
import Story from '../components/Story';
import FeedPost from '../components/FeedPost';

const Homescreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Story />
      <FeedPost />
    </View>
  );
};

export default Homescreen;
