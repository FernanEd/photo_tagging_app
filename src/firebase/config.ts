import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCWDz_aQovKQfdAOB9Smo8HJfXKzdc0CE",
  authDomain: "photo-tagging-app-e4b42.firebaseapp.com",
  projectId: "photo-tagging-app-e4b42",
  storageBucket: "photo-tagging-app-e4b42.appspot.com",
  messagingSenderId: "670967565961",
  appId: "1:670967565961:web:47c056fbc39db52481c058",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firebase, firestore };
