import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const PostHeader = ({
  postAvatar,
  postUser,
  postOptionHandler,
}: {
  postAvatar: string;
  postUser: any;
  postOptionHandler?: (username: string) => void;
}) => {
  return (
    <View style={styles.postHeaderContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: postAvatar}} style={styles.postHeaderImg} />
        <Text style={styles.postheaderName}>{postUser.userName}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={
            postOptionHandler ? () => postOptionHandler(postUser) : undefined
          }>
          <FontAwesomeIcon icon={faEllipsis} size={12}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  postHeaderContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'white'
  },
  postheaderName: {
    marginLeft: 4,
  },
  postHeaderImg: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
});
