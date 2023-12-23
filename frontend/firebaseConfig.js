import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhKguBtzuBCh3v27c0DI-bkb5aPT4IjBo",
  authDomain: "shopyback.firebaseapp.com",
  projectId: "shopyback",
  storageBucket: "shopyback.appspot.com",
  messagingSenderId: "185766356098",
  appId: "1:185766356098:web:bcc6c4d81dcfc481b0809b",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage();
// export const db = getFirestore();
