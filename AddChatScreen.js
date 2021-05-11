import React, {useState, useLayoutEffect} from "react";
import {Alert, View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
import { auth, db } from './firebaseConfig';
import firebase from 'firebase';

export default function AddChat({navigation}) {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');

    const createChat = async() => {
        await db.collection('chats')
            .add({
                chatName: input,
                users: [auth.currentUser.email],
                photoURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
            })
            .then(() => navigation.navigate('CHATS'))
            .catch((error) => Alert.alert(error));
    }

    const findChat = async() => {
        await db.collection('chats')
            .doc(input2)
            .update({
                users: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
            })
            .then(a => Alert.alert(a))
            //.then(() => navigation.navigate('CHATS'))
            .catch((e) => Alert.alert(e))

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat'
        })
    }, [navigation])

    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Icon
                    name={`plus`}
                    size={30}
                    style={{
                        marginHorizontal: 20,
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter a chat name'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
            </View>
            <Pressable
                style={styles.createChatButton}
                onPress={createChat}>
                <Text style={{color: 'white'}}>CREATE CHAT</Text>
            </Pressable>

            <View style={styles.orDivider}>
                <Text style={styles.or}>OR</Text>
            </View>

            <View style={styles.inputContainer}>
                <Icon
                    name={`plus`}
                    size={30}
                    style={{
                        marginHorizontal: 20,
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter a chat code'
                    value={input2}
                    onChangeText={(text) => setInput2(text)}
                />
            </View>
            <Pressable
                style={styles.createChatButton}
                onPress={findChat}>
                <Text style={{color: 'white'}}>FIND CHAT</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
      flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        height: 50,
        marginBottom: 20,
    },
    input: {
        width: '75%',
        height: '100%',
    },
    createChatButton: {
        backgroundColor: '#333',
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orDivider: {
      height: 125,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    or: {
      fontWeight: 'bold',
        fontSize: 20,
    },
})
