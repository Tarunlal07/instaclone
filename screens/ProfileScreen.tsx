import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
    const {profile} = route.params;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profile.userAvatar,
            }}
          />
          <View style={styles.profileHeaderRight}>
            <View style={styles.postHeaderContent}>
              <Text>{profile.postImages.length}</Text>
              <Text>Posts</Text>
            </View>
            <View style={styles.postHeaderContent}>
              <Text>{profile.followers}</Text>
              <Text>Followers</Text>
            </View>
            <View style={styles.postHeaderContent}>
              <Text>{profile.following}</Text>
              <Text>Following</Text>
            </View>
          </View>
        </View>
        <Text style={{paddingTop: 10}}>{profile.userName}</Text>
        <Text style={{paddingTop: 5}}>{profile.shortBio}</Text>
      </View>
        <ImageGrid images={profile.postImages}/>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const ImageGrid = ({images}) => {

  const renderItem = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  profileHeaderContainer: {
    padding: 8,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  postHeaderContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
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
    margin: 4,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});
