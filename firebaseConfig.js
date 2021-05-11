import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    /*
    Get your own firebaseConfig
    */
}

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
