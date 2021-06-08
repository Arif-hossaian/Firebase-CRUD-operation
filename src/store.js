import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
//import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import { composeWithDevTools } from "redux-devtools-extension";

const fbConfig = {
  apiKey: "AIzaSyAspj8pvJpZR5F-oqiegEOmeTbs8XHy8J4",
  authDomain: "student-base-4026c.firebaseapp.com",
  projectId: "student-base-4026c",
  storageBucket: "student-base-4026c.appspot.com",
  messagingSenderId: "581684971968",
  appId: "1:581684971968:web:70ea7442dabc94ea276025",
  measurementId: "G-KM06XRC718",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools());

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;
