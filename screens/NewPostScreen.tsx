import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePostContext} from '../context/PostContext';
import {useNavigation} from '@react-navigation/native';

const NewPostScreen = () => {
  const [imageUrl, setImageUrl] = useState('');
  const {dispatch} = usePostContext();
  const [inputCaption, setInputCaption] = useState('');
  const navigation = useNavigation();
  const openImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.assets) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const addImagehandler = () => {
    const selectedImage = {
      id: uuidv4(),
      postImage: imageUrl,
      caption: inputCaption,
      likes: 0,
      comments: [],
    };
    dispatch({type: 'ADD_POST', payload: selectedImage});
    setInputCaption('')
    setImageUrl('');
    navigation.navigate('myProfile');
  };
  return (
    <View style={styles.container}>
      {imageUrl && (
        <>
          <Image source={{uri: imageUrl}} style={styles.previewImage} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Caption"
            value={inputCaption}
            onChangeText={setInputCaption}
          />
        </>
      )}
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnContainer} onPress={openImagePicker}>
          <Text style={styles.btnColor}>
            {!imageUrl ? 'Choose Photo' : 'Change Photo'}
          </Text>
        </TouchableOpacity>
        {imageUrl && (
          <TouchableOpacity
            onPress={addImagehandler}
            style={[
              styles.btnContainer,
              styles.btnSecondaryColor,
              styles.btnSpacing,
            ]}>
            <Text style={styles.btnTextColor}>Upload</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  previewImage: {
    width: 300,
    height: 300,
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  btnSpacing: {
    marginLeft: 25,
  },
  btnContainer: {
    marginTop: 5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#C13584',
  },
  btnColor: {
    color: '#C13584',
  },
  btnSecondaryColor: {
    backgroundColor: '#C13584',
  },
  btnTextColor: {
    color: 'white',
  },
  inputStyle: {
    width: 300,
    color: 'black',
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 0.2,
    paddingHorizontal: 10,
  },
});
