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

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

//ADD COLLECTION DATA
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // collectionKey(categories), objectsToAdd(data object)
  const collectionRef = collection(db, collectionKey); // collection ref points to or collectionKey in our database
  const batch = writeBatch(db); // writeBatch to our db

  objectsToAdd.forEach((object) => {
    // for each data object
    const docRef = doc(collectionRef, object.title.toLowerCase()); // create a doc ref going to our collectionRef, with object title as value
    batch.set(docRef, object); // set to our docRef, with the object as our value
  });

  await batch.commit();
  console.log("done batching");
};

// GET COLLECTION DATA
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => { // we recieve docSnapshot from getDocs()
    const { title, items } = docSnapshot.data(); 
    acc[title.toLowerCase()] = items; // set the key(snapshot.name) = value(snapshot.item)
    return acc;
  }, {}); // all of the data will be store in a new object (default value)

  return categoryMap;
};

//CREATE USER
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
