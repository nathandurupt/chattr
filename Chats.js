import React, {useState, useEffect, useLayoutEffect} from 'react';
import {ScrollView, StyleSheet, Pressable, View, Text, FlatList} from 'react-native';
import firebase from 'firebase';
import { auth, db } from './firebaseConfig';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ListChat from "./Components/ListChat";

export default function Chats({navigation}) {
    const [chats, setChats] = useState([]);

    const enterChat = (id, chatName) => {
        navigation.navigate('ChatRoom', {
            id,
            chatName,
        })
    }
    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .where("users", "array-contains", auth.currentUser.email)
            .onSnapshot(snapshot =>
                setChats(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                 })
                )
             )
            )
        return unsubscribe;
    }, [chats])
    return(
        <View style={styles.container}>
            <ScrollView>
                {chats.map(({id, data: { chatName, photoURL } }) => {
                    return (
                        <ListChat
                            id={id}
                            chatName={chatName}
                            enterChat={enterChat}
                        />)
                })}
            </ScrollView>
        </View>
       )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    p: {
        height: 75,
        width: 'auto'
    }
});

const chatsList = [
    {
        name: 'Walt Whitman',
        avatar: 'red',
        lastText: '11:30am',
        newMessages: '1',
        lastMessage: 'Hi there, how about this weather? Supposed to suck.'
    },
    {
        name: 'WaltA Whitman',
        avatar: '#246672',
        lastText: '11:30am',
        newMessages: '2',
        lastMessage: 'Hi there, how about this weather? Supposed to suck.'
    },
    {
        name: 'Walt Whitman',
        avatar: '#b6ae6d',
        lastText: '11:30am',
        lastMessage: 'Hi there, how about this weather? Supposed to suck.'
    },
    {
        name: 'Waldt Whitman',
        avatar: '#8e0001',
        lastText: '11:30am',
        lastMessage: 'Hi there, how about this weather? Supposed to suck.'
    },
    {
        name: 'Walt Whditman',
        avatar: 'red',
        lastText: '11:30am',
        lastMessage: 'Hi there, how about this weather? Supposed to suck.'
    },
];

/*
<FlatList style={{width: '100%'}} data={chatsList} renderItem={(item, index) => {
                return <ListChat item={item} onPress={() => navigation.navigate('CHAT')}/>
            }
            } />
 */
