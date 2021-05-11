import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/EvilIcons";
export default function Splash() {
    return(
        <View style={styles.container}>
            <Icon
                name={'comment'}
                size={100}
                color={'white'}
            />
            <Text style={styles.title}>Chattr</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#246672',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 25,
    }
})
