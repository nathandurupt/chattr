import React, {useState} from 'react';
import { TextInput, Pressable, Alert, ActivityIndicator, StyleSheet, Text, View, Image, Button } from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Login({navigation}) {
    const auth = firebase.auth();
    const [email, setEmail] = useState(null);
    const [password, setPass] = useState(null);
    const [signInError, setSignInError] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Icon name={'comment'} size={150} color={'#246672'}/>
            </View>
            <View style={styles.loginContainer}>
                <View style={styles.inputContainer}>
                    <TextInput onChangeText={text => setEmail(text)} style={styles.input} placeholder='Email address' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput secureTextEntry={true} onChangeText={text => setPass(text)} style={styles.input} placeholder='Password' />
                </View>
                <View style={styles.errorContainer}>
                    <Text style={signInError ? {color: 'red'} : {opacity: 0}}>Username and password do not match</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Pressable
                        style={styles.loginButton}
                        onPress={() => {
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
                                setSignInError(false)
                                firebase.auth().signInWithEmailAndPassword(email, password)
                                    .catch((e) => setSignInError(true))
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text>Or, create an account.</Text>
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
        height: 300,
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
