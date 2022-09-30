import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDxyRSyUJygvmFOUYe0L6j2hlPoglmobJ8",
    authDomain: "react-crud-4723c.firebaseapp.com",
    projectId: "react-crud-4723c",
    storageBucket: "react-crud-4723c.appspot.com",
    messagingSenderId: "702491791094",
    appId: "1:702491791094:web:a3fe9246f548ed3f3166d7"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();