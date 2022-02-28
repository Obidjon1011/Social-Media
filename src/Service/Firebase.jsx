import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCEbwbQ-8LsJkqUuh8712ZS103TaiX8yPE",
    authDomain: "social-media-app-958c2.firebaseapp.com",
    projectId: "social-media-app-958c2",
    storageBucket: "social-media-app-958c2.appspot.com",
    messagingSenderId: "185373780105",
    appId: "1:185373780105:web:040d1e12d5b9996accbe58",
    measurementId: "G-96PHZC3KPR"
});

const db = firebaseConfig.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }