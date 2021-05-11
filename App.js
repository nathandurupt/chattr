import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import firebase from 'firebase/app';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

import Splash from './Splash';
import Tabs from './Tabs';
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";
import Login from './Login';
import Register from './Register';
import AddChat from "./AddChatScreen";

const firebaseConfig = {
    apiKey: "AIzaSyDcxmsSbWOe2xIXq_cRZgad0HF1ApMEi3s",
    authDomain: "chatapp-daf0c.firebaseapp.com",
    projectId: "chatapp-daf0c",
    storageBucket: "chatapp-daf0c.appspot.com",
    messagingSenderId: "447321125524",
    appId: "1:447321125524:web:e19980780b61244692ba81"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const auth = firebase.auth();
const firestore = firebase.firestore();

const Stack = createStackNavigator();

export default function App() {
    const [authUser, setAuthUser] = useState(null);
    const [user] = useAuthState(auth);
    const [splash, toggleSplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            toggleSplash(false)
        }, 3000)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                setAuthUser(user);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }, [])

  if (splash) {
      return(
          <Splash />
      )
  }
  return (
      <NavigationContainer>
              {!user
              ? <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
              : <Stack.Navigator
              screenOptions={{
              headerStyle: {
              backgroundColor: '#0d506a',
          },
              headerTitleStyle: {
              color: 'white',
          },
          }}
              >
              <Stack.Screen name="chatApp" component={Tabs} />
              <Stack.Screen name='addChat' component={AddChat} />
              <Stack.Screen screenOptions={{
              headerShown: false
          }} name='ChatRoom' component={ChatRoom} />
              <Stack.Screen screenOptions={{
              headerShown: false
          }} name="PROFILE" component={Profile} />
              </Stack.Navigator>
          }
      </NavigationContainer>
  );
}

//export default withAuthenticator(App);
