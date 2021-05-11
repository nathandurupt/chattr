import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Image, TextInput, Modal, Pressable, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { auth } from './firebaseConfig';
import Icon from "react-native-vector-icons/EvilIcons";


export default function Profile({navigation}) {
    const [profile, getProfile] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [status, updateStatus] = useState("Feelin' fine.")

    const setStatus = async() => {
         auth.currentUser.updateProfile({
            status: status,
        })
             .then(() => setStatusModal(false));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: null,
            headerLeft: () => (
                <View
                    style={{
                        backgroundColor: 'red',
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
                </View>
            )
        })
    })
    useEffect(() => {
        try {
            const profileRef = firebase.firestore().collection('profiles').doc(firebase.auth().currentUser.uid)
            profileRef.get()
            .then(res => {
            })
        }
        catch(e) {
            console.log(e)
        }
    }, [])

    const signOut = () => {
        firebase.auth().signOut();
    }

    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={statusModal}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'white', height: 100, width: '100%', borderColor: '#333', borderWidth: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                        <TextInput
                            value={status}
                            onChangeText={(text) => updateStatus(text)}
                            placeholder={'Enter new status'}
                            style={{paddingLeft: 20, backgroundColor: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.25)', height: '45%', width: '90%'}}
                        />
                        <Pressable
                            style={{backgroundColor: '#8e0001', height: '45%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => {
                                setStatus
                                setStatusModal(false)
                            }}>
                            <Text style={{color: 'white'}}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                style={styles.scrollContainer}>
                <View style={styles.profileBasicInfo}>
                    <View style={styles.profileAvatarContainer}>
                        <Image
                            style={styles.profileAvatar}
                            source={{
                                uri: auth.currentUser.photoURL,
                            }}
                        />
                    </View>
                    <View style={styles.basicInfoContainer}>
                        <Text style={styles.userText}>{firebase.auth().currentUser.displayName}</Text>
                        <Text style={{color: 'grey', fontWeight: 'bold'}}>Status: <Text style={{color: '#333', fontWeight: 'normal'}}>{status}</Text></Text>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <Pressable
                        onPress={() => setStatusModal(!statusModal)}
                        style={styles.settingsButton}>
                        <Text>Change Status</Text>
                    </Pressable>
                </View>
                <View style={styles.settingsContainer}>
                    <Pressable style={styles.settingsButton} onPress={signOut}>
                        <Text>Log out</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#52554c',
    },
    scrollContainer: {
        flex: 1,
    },
    profileBasicInfo: {
        height: 300,
        width: '95%',
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.27,

        elevation: 10,
        marginBottom: 10,
    },
    profileAvatarContainer: {
      height: 175,
      width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatar: {
      borderRadius: 100,
      height: 150,
      width: 150,
    },
    basicInfoContainer: {
        width: '100%',
        height: 125,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    userText: {
        fontSize: 25,
        fontWeight: '600',
    },
    settingsContainer: {
        width: '95%',
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    settingsButton: {
        borderWidth: 1,
        borderColor: '#333',
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        justifyContent: 'center',


    }
})
