import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

const LoginScreen = ({navigation}) => {
  const [text, setText] = useState('');

  const handleInputChange = inputText => {
    setText(inputText);
  };

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.formContainer}>
        <Image
          style={styles.instaImage}
          source={require('../assests/instahead.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Username..."
          value={text}
          onChangeText={handleInputChange}
        />
        <Pressable
          style={({pressed}) => [
            styles.buttonContainer,
            pressed && styles.pressedButton,
          ]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    marginTop: '40%',
    padding: 60,
    alignItems:'center'
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instaImage: {
    width: 180,
    height: 60,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#C13584',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
    width: 250
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: '#d371a8',
  },
});
