import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {PostData} from '../DB/MockPostData';
import PostSlider from './PostSlider';
import {useNavigation} from '@react-navigation/native';
import PostHeader from './PostHeader';
import CustomBottomModal from './CustomBottomModal';

const FeedPost = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [postUser, setPostUser] = useState();
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const postOptionHandler = (postUser: any) => {
    setPostUser(postUser);
    toggleModal();
  };

  const postProfileHandler = (profile: any) => {
    setModalVisible(false);
    navigation.navigate('Profile', {profile: postUser});
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {PostData.map((post, index) => {
          return (
            <View style={styles.postContainer} key={index}>
              <PostHeader
                postOptionHandler={postOptionHandler}
                postAvatar={post.userAvatar}
                postUser={post}
              />
              <PostSlider images={post.postImages} />
            </View>
          );
        })}
      </ScrollView>
      <CustomBottomModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}>
        <TouchableOpacity
          style={styles.postOptions}
          onPress={postProfileHandler}>
          <Text style={{fontSize: 18}}>About This Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptions}>
          <Text style={{fontSize: 18}}>Unfollow</Text>
          <Text style={{color: 'red', fontSize: 14}}>{postUser?.userName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postOptions}>
          <Text style={{fontSize: 18}}>Remove this Post</Text>
        </TouchableOpacity>
      </CustomBottomModal>
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 10,
  },
  postImage: {
    width: '100%',
    height: 350,
  },
  postOptions: {
    flex: 1,
    borderRadius: 10,
    margin: 2,
    borderColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
});
