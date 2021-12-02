// Import from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
require("firebase/firestore");
require("firebaseui");

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAV_R2ay9TlRiscIEMaorgQZVxeMo2JqDk",
    authDomain: "vantage-7e009.firebaseapp.com",
    projectId: "vantage-7e009",
    storageBucket: "vantage-7e009.appspot.com",
    messagingSenderId: "684980754327",
    appId: "1:684980754327:web:3387343345e23e877996d2",
    measurementId: "G-3CEDN1FTZ7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const storage = getStorage(app);


