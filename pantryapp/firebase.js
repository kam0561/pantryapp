// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzJ1XK69_zGUXRlJlMKCBZtFKqKIfj-WA",
  authDomain: "pantry-app-3ba78.firebaseapp.com",
  projectId: "pantry-app-3ba78",
  storageBucket: "pantry-app-3ba78.appspot.com",
  messagingSenderId: "377204379304",
  appId: "1:377204379304:web:577e56fefa2bfd152a7c9d",
  measurementId: "G-G9Y73TBDJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);