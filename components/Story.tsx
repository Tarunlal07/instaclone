import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StoryData} from '../DB/MockStoryData';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';

const Story = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState('');

  const showUserStoryhandler = (stories: String[]) => {
    setCurrentStory(stories);
    setModalVisible(true);
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <View style={styles.storyContainer}>
        <Image
          source={require('../assests/instahead.png')}
          style={styles.imagelogo}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {StoryData.map((story, index) => {
            return (
              <TouchableOpacity
                style={{alignItems: 'center', marginLeft: 4}}
                key={index}
                onPress={() => showUserStoryhandler(story.stories)}>
                <View>
                  <Image
                    source={{uri: story.photo}}
                    style={styles.storyCoverImg}
                  />
                  <Text style={{fontSize: 12}}>
                    {story.userName.length < 11
                      ? story.userName.toLowerCase()
                      : story.userName.slice(0, 10).toLowerCase() + '...'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Modal visible={modalVisible} animationType="slide">
          <StoryScreen
            stories={currentStory}
            onClose={() => {
              setModalVisible(false), setCurrentStory('');
            }}
          />
        </Modal>
      </View>
    </>
  );
};

const StoryScreen = ({stories, onClose}) => {
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prevProgress => Math.min(prevProgress + 100 / 30, 100));

      if (progress >= 100) {
        setStoryIndex(prevIndex => (prevIndex + 1) % stories.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [progress, stories]);

  const getLeftStory = () => {
    setStoryIndex(storyIndex => {
      if (storyIndex > 0) return storyIndex - 1;
      else storyIndex;
      return storyIndex;
    });
  };
  const getRightStory = () => {
    setStoryIndex(storyIndex => {
      if (storyIndex < stories.length - 1) return storyIndex + 1;
      else storyIndex;
      return storyIndex;
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <TouchableOpacity style={styles.storyClose} onPress={onClose}>
        <FontAwesomeIcon icon={faXmark} style={styles.closeText} size={35} />
      </TouchableOpacity>
      <View style={styles.progressBarContainer}>
        {stories?.map((story, index) => {
          return (
            <View
              key={index}
              style={[
                styles.progressBar,
                {
                  width: `${Math.floor(96 / stories.length)}%`,
                },
              ]}>
              <View
                style={{
                  backgroundColor:
                    index === storyIndex ? '#d371a8' : 'ghostwhite',
                  flex: 1,
                  width: `${progress}%`,
                }}></View>
            </View>
          );
        })}
      </View>
      <Pressable
        style={styles.navPressable}
        onPress={() => getLeftStory()}></Pressable>
      <Pressable
        style={[styles.navPressable, {right: 0}]}
        onPress={() => getRightStory()}></Pressable>
      <Image source={{uri: stories[storyIndex]}} style={styles.storyImage} />
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 999,
    position: 'absolute',
    top: 45,
    width: '100%',
    paddingHorizontal: 15,
  },
  progressBar: {
    height: 4,
    color: 'white',
    borderRadius: 2,
    backgroundColor: 'white',
  },
  storyContainer: {
    padding: 4,
    marginBottom: 6,
  },
  imagelogo: {
    height: 50,
    width: 100,
    resizeMode: 'contain',
  },
  storyCoverImg: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginLeft: 4,
    borderWidth: 2,
    borderColor: '#d371a8',
  },
  storyClose: {
    position: 'absolute',
    top: '7%',
    right: 8,
    zIndex: 999,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 35,
    color: 'white',
    fontWeight: '500',
  },
  storyImage: {
    flex: 1,
  },
  navPressable: {
    position: 'absolute',
    width: '20%',
    height: '100%',
    marginTop: '25%',
    // backgroundColor: 'red',
    zIndex: 999,
  },
});
