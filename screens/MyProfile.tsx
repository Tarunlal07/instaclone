import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {userLoggedData} from '../DB/MockUserLoggedData';
import {useNavigation} from '@react-navigation/native';
import {usePostContext} from '../context/PostContext';

const MyProfile = () => {
  const navigation = useNavigation();
  const {
    state: {post: postData},
  } = usePostContext();

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: userLoggedData.userAvatar,
            }}
          />
          <View style={styles.profileHeaderRight}>
            <View style={styles.postHeaderContent}>
              <Text>{postData.length}</Text>
              <Text>Posts</Text>
            </View>
            <View style={styles.postHeaderContent}>
              <Text>{userLoggedData.followers}</Text>
              <Text>Followers</Text>
            </View>
            <View style={styles.postHeaderContent}>
              <Text>{userLoggedData.following}</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
        <Text style={{paddingTop: 10}}>{userLoggedData.userName}</Text>
        <Text style={{paddingTop: 5}}>{userLoggedData.shortBio}</Text>
      </View>
      <ImageGrid
        images={postData}
        navigation={navigation}
        author={userLoggedData}
      />
    </SafeAreaView>
  );
};

export default MyProfile;

const ImageGrid = ({images, navigation, author}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() =>
        navigation.navigate('post', {
          postId: item.id,
          user: userLoggedData,
        })
      }>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.postImage}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={item => item}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  profileHeaderContainer: {
    padding: 8,
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  postHeaderContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  profileHeaderRight: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileBio: {},
  container: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    // margin: 4,
  },
  image: {
    flex: 1,
    borderWidth: 0.5,
    // borderRadius: 6,
  },
});
