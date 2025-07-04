
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup   } from "firebase/auth";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBD7ERIPv_1lTEPDV--9i6IMwlg0k4_5ko",
  authDomain: "realestate-fe569.firebaseapp.com",
  projectId: "realestate-fe569",
  storageBucket: "realestate-fe569.firebasestorage.app",
  messagingSenderId: "1033056640666",
  appId: "1:1033056640666:web:5ca60ad76573eb377ec923",
  measurementId: "G-EL2JW42CS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth setup
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };

