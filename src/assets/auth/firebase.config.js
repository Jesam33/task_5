// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgOpN29wuRKKQgvq4wnq6Vwu6QurWIRW4",
  authDomain: "e-commerce-deb0e.firebaseapp.com",
  projectId: "e-commerce-deb0e",
  storageBucket: "e-commerce-deb0e.appspot.com",
  messagingSenderId: "518875356879",
  appId: "1:518875356879:web:346243951b38c0c0ec21ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;