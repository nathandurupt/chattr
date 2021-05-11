import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Image, Clipboard, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, FlatList, Pressable, Dimensions, TextInput, ScrollView, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import firebase from 'firebase';
import { db, auth } from './firebaseConfig';

import SentMsg from "./Components/SentMessage";
import ReceivedMsg from "./Components/ReceivedMessage";
import {useCollectionData} from "react-firebase-hooks/firestore";

export default function ChatRoom({route, navigation}) {
    const dummy = useRef();
    const [messages, setMessages] = useState([]);
    const [msg2Send, updateMsg] = useState('');

    const copyCode = () => {
        Alert.alert(
            "Copy chat code?",
            "Send the code to someone so they can join!",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => Clipboard.setString(route.params.id)
                }
            ]
        )
    }
    const sendMsg = async(e) => {
        Keyboard.dismiss();
        await db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: msg2Send,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL:   auth.currentUser.photoURL,

            })
            .catch(e => Alert.alert(e))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: null,
            headerLeft: () => (
                <View
                    style={{
                        height: '100%',
                        width: 300,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        height: '100%',
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        size={30}
                        name={'chevron-left'}
                        style={{
                            color: 'white',
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    height: '100%',
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                        }}
                        source={{
                            uri: messages[0]?.data.photoURL ||
                                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        width: 250,
                    }
                    }
                >
                    <Text
                        numberOfLines={1}
                        style={{fontSize: 20, color: 'white'}}>{route.params.chatName}</Text>
                </View>
            </View>
                    ),
            headerRight: () => (
                <Pressable
                    onPress={copyCode}
                    style={
                        {
                            height: '100%',
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }
                >
                    <Icon
                        name={'plus'}
                        size={30}
                        color={'white'}
                    />
                </Pressable>
            )
        })
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                )
            })
        return unsubscribe;
    }, [route])

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={80}
        >
                <ScrollView
                    style={styles.scrollMsgs}
                    ref={dummy}
                    onContentSizeChange={() => dummy.current.scrollToEnd({animated: true})}
                >
                    {
                        messages.length > 1
                            ? messages.map(({ id, data }) => {
                                if (data.email === auth.currentUser.email) {
                                    return(
                                        <SentMsg
                                            displayName={auth.currentUser.displayName}
                                            email={'Me'}
                                            msg={data.message}
                                            photoURL={data.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                                        />
                                    )
                                } else {
                                    return(
                                        <ReceivedMsg
                                            displayName={data.displayName}
                                            msg={data.message}
                                            photoURL={data.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                                        />
                                    )
                                }
                            }) : null
                    }
                </ScrollView>
            <View style={styles.msgInput}>
                <TextInput
                    value={msg2Send}
                    onChangeText={(e) => updateMsg(e)}
                    style={styles.input} />
                <Pressable
                    disabled={msg2Send === '' ? true : false}
                    onPress={() => {
                        sendMsg()
                        updateMsg('')
                    }}
                    style={[styles.sendMsg, msg2Send === '' ? {opacity: 0.5} : {opacity: 1}]}>
                    <Icon
                        color={'white'}
                        size={40}
                        name={'chevron-right'} />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingTop: 20,
    },
    scrollMsgs: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    msgInput: {
        padding: 15,
      width: '100%',
      height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
      width: '80%',
      height: 40,
        backgroundColor: 'white',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
    },
    sendMsg: {
        height: 40,
        width: '15%',
        backgroundColor: '#246672',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
