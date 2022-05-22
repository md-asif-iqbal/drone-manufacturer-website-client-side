// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB92nHd9dR-ZVoXuoILECpIE8Jb5y9aoJE",
  authDomain: "drone-kits.firebaseapp.com",
  projectId: "drone-kits",
  storageBucket: "drone-kits.appspot.com",
  messagingSenderId: "985607684449",
  appId: "1:985607684449:web:133bf51fa82c56c1a30520",
  measurementId: "G-TR93EXEE6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth