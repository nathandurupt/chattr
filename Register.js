import React, {useState} from 'react';
import { TextInput, Pressable, Alert, ActivityIndicator, StyleSheet, Text, View, Image, Button } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Register({navigation}) {
    const auth = firebase.auth();
    const [email, setEmail] = useState(null);
    const [password, setPass] = useState(null);
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [imgErr, setImgErr] = useState(false);

    const verifyURL = () => {
        avatar.match(/\.(jpeg|jpg|gif|png)$/) != null
            ? true
            : false
    }
    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Icon name={'comment'} size={150} color={'#246672'}/>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={text => setUser(text)} style={styles.input} placeholder='Username' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={text => setEmail(text)} style={styles.input} placeholder='Email address' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput secureTextEntry={true} onChangeText={text => setPass(text)} style={styles.input} placeholder='Password' />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={text => setAvatar(text)} style={styles.input} placeholder='URL for avatar image' />
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={imgErr ? {color: 'red'} : {opacity: 0}}>Username and password do not match</Text>
                    </View>
                    <Pressable
                        style={styles.loginButton}
                        onPress={() => {
                            setImgErr(true);

                            if (password === null || email === null) {
                                Alert.alert('You must fill out the form')
                            }
                            else if (!email.includes('@')) {
                                Alert.alert('Email must be a valid address.')
                            }
                            else if (password.length < 6) {
                                Alert.alert('Password must be 6 or more characters.')
                            }
                            else {
                                setImgErr(false)
                                if (verifyURL == false) {
                                    setImgErr(false);
                                    return;
                                }
                                firebase.auth().createUserWithEmailAndPassword(email, password)
                                .then((authUser) => {
                                    try {
                                        authUser.user.updateProfile({
                                            displayName: user,
                                            photoURL: avatar !== null
                                                ? avatar
                                                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                                            status: "Feelin' fine."
                                        })
                                    }
                                    catch(e) {
                                    }
                                })
                                    .then(() => {
                                        try {
                                            navigation.navigate('Login')
                                        }
                                        catch(e) {
                                            Alert.alert(e)
                                        }
                                    });
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text>Or, log in.</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
    },
    logoContainer: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '80%',
        height: 200,
    },
    inputContainer: {

        height: 100,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: '50%',
        width: '100%',
        borderColor: 'rgba(0,0,0,0.25)',
        borderWidth: 1,
        paddingLeft: '5%'
    },
    loginButton: {
        backgroundColor: '#333',
        width: 200,
        height: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    errorContainer: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
