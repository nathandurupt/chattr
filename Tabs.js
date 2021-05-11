import React, {useState, useLayoutEffect} from 'react';
import {Image, TouchableOpacity, Pressable, View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { auth } from './firebaseConfig';

import Chats from './Chats';
import Profile from './Profile';
import ChatRoom from './ChatRoom';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chattr',
            headerLeft: () => (
                <View style={{
                height: '100%',
                width: 30,
                marginLeft: 20,
                justifyContent: 'center',
                }
                }>
                    <Image
                        source={{uri: auth.currentUser.photoURL}}
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <View style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 40,
                        marginRight: 20,
                    }
                }>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('addChat')}
                        activeOpacity={0.5}>
                        <Icon
                            size={30}
                            name={'pencil'}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])
    return(
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    color: 'white',
                },
                style: {
                    backgroundColor: '#0d506a',
                    color: 'white'
                }
            }}
            initialRouteName="CHATS"
        >
            <Tab.Screen name="CHATS" component={Chats}/>
            <Tab.Screen name="PROFILE" component={Profile} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})
