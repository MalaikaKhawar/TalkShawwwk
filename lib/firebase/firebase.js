import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBN0pSTNyTZTXIYPRdx2_2ry9ldiXyd5sY",
  authDomain: "chat-app-1db4d.firebaseapp.com",
  projectId: "chat-app-1db4d",
  storageBucket: "chat-app-1db4d.appspot.com",
  messagingSenderId: "690505459898",
  appId: "1:690505459898:web:02b9a2340526ae7b07fa83",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage };
