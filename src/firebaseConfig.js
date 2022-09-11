// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import "@firebase/firestore";
import { getAuth } from "@firebase/auth";  // <- NEW

const firebaseConfig = {
    apiKey: "AIzaSyDWc9zUpEo1GuYWMenT9VnQJoShYTuO81E",
    authDomain: "prosegur-916be.firebaseapp.com",
    databaseURL: "https://prosegur-916be.firebaseio.com",
    projectId: "prosegur-916be",
    storageBucket: "prosegur-916be.appspot.com",
    messagingSenderId: "420520468743",
    appId: "1:420520468743:web:a69f6d7fc6c294f47965a2",
    measurementId: "G-M65TYFVE6M"
};

// Initialize Firebase
const _firebaseApp = initializeApp(firebaseConfig);

// export const db = _firebaseApp.firestore();
export const auth = getAuth();  // <- NEW
export const firebaseApp = _firebaseApp;