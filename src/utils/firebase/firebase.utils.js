// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0PmZL2YA6fhSYGB90hK6-SdeLORNh8Lo",
  authDomain: "threadly-db.firebaseapp.com",
  projectId: "threadly-db",
  storageBucket: "threadly-db.appspot.com",
  messagingSenderId: "1097680503146",
  appId: "1:1097680503146:web:c2112a2c95071c9c076513",
  measurementId: "G-1QQZQVLY88",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);
// const analytics = getAnalytics(app);

// Authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Database
export const db = getFirestore();

// we pass in our uid from our user object from our google auth response (inside of sign-inComponent.jsx)
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // create new user document
  const userDocRef = doc(db, "users", userAuth.uid); // (database, "collection", identifier) new document object
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); // instance snapshot of document object data (user)
  // console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    // if user data does not exist
    const { displayName, email } = userAuth; // set data based off of our user object provided from google auth (destructure from userAuth)
    const createdAt = new Date(); // track time of user login

    // create / set the document with the data from userAuth in my collection (using userSnapshot uid)
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithAuthEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// observer listener (takes a callback as a prop for onAuthStateChanged)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
