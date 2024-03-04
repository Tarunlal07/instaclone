import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Homescreen from './screens/Homescreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import MyProfile from './screens/MyProfile';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import Post from './screens/Post';
import {PostsProvider} from './context/PostContext';
import NewPostScreen from './screens/NewPostScreen';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Homescreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHouse}
              size={20}
              style={{color: focused ? '#C13584' : 'black', marginBottom: -15}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={NewPostScreen}
        options={{
          headerShown: true,
          headerTitle:'New Post',
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faSquarePlus}
              size={24}
              style={{
                color: focused ? '#C13584' : 'black',
                marginBottom: -15,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myProfile"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              style={{color: focused ? '#C13584' : 'black', marginBottom: -15}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <PostsProvider>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="post"
              component={Post}
              options={{
                headerShown: true,
                title: 'My Posts',
                headerBackTitleVisible: false,
                headerBackTitleStyle: {
                  fontSize: 12,
                },
                headerTintColor: '#C13584',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PostsProvider>
  );
}

export default App;
