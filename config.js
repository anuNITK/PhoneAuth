import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig={
    apiKey: "AIzaSyAy3TDHRl3FZJvUFCkUxWEVkOkfyEMM_34",
  authDomain: "test-e85f7.firebaseapp.com",
  projectId: "test-e85f7",
  storageBucket: "test-e85f7.appspot.com",
  messagingSenderId: "63811949865",
  appId: "1:63811949865:web:e6663538bf1d2ad85e5338",
  measurementId: "G-LL33GF101M"
};
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}