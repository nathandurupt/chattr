import React from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

export default function ReceivedMsg(props) {
    console.log(props.msg)
    return(
        <View style={styles.receivedMessageContainer}>
            <View style={styles.receivedMessage}>
                <Image
                    style={styles.avatarImg}
                    source={{uri: props.photoURL}}
                />
                <Text style={{fontWeight: 'bold'}}>{props.displayName}</Text>
                <Text style={styles.msg}>{props.msg}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    receivedMessageContainer: {
        height: 'auto',
        minHeight: 30,
        width: '100%',
        marginVertical: 15,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    receivedMessage: {
        height: 'auto',
        minHeight: 20,
        maxWidth: '90%',
        padding: 10,
        backgroundColor: '#F8FDDD',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.27,
        elevation: 10,
    },
    msg: {
        fontSize: 15,
    },
    avatarImg: {
      height: 30,
      width: 30,
        borderRadius: 100,
        position: 'absolute',
        bottom: -15,
        left: -15,
    },
})
