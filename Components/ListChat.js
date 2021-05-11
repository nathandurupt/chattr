import React, {useState, useEffect} from 'react'
import {Alert, Pressable, Text, View, StyleSheet, Image} from "react-native";
import { db } from '../firebaseConfig';

export default function ListChat({ id, chatName, enterChat, photoURL }) {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            )
        return unsubscribe;
    })

    return(
        <Pressable
            onPress={() => enterChat(id, chatName)}
            key={id}
            style={{flexDirection: 'row', height: 75, width: '100%', backgroundColor: 'white', borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1,}}
        >
            <View style={styles.avatarContainer}>
                <Image
                    source={{uri: chatMessages?.[0]?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}}
                    style={styles.avatar} />
            </View>
            <View style={styles.chatInfoTextContainer}>
                <View styles={styles.chatInfo}>
                    <View style={styles.chatInfoText}>
                        <Text
                            numberOfLines={1}
                            style={styles.chatName}
                        >{chatName}</Text>
                    </View>
                    <View style={styles.chatInfoText}>
                        <Text
                            numberOfLines={1}
                            style={styles.chatLastMsg}
                        >{chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.chatNewInfo}>
                {/*props.item.item.newMessages
                    ? <View style={styles.newMsgTime}>
                        <Text style={styles.lastText}>TesdtLastTExt</Text>
                        <View style={styles.newMsgInd}><Text style={styles.newMsgIndText}>0</Text></View>
                    </View>
                    : <Text style={styles.lastMsgText}>TesdtLastTExt</Text>
                */}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        height: 75,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 65,
        width: 65,
        borderRadius: 100,
    },
    chatInfoTextContainer: {
        height: 75,
        width: '55%',
    },
    chatInfoText: {
        width: '100%',
        height: '50%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatLastMsg: {
        fontSize: 12,
        color: 'grey',
    },
    chatNewInfo: {
        height: 75,
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    newMsgTime: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    newMsgInd: {
        height: 25,
        width: 25,
        backgroundColor: 'rgba(0,255,0,0.75)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newMsgIndText: {
        color: 'white',
    },
    lastText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    lastMsgText: {
        color: 'grey',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
