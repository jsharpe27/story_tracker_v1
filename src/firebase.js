import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHkxLmUdvlVGNDEbonHcSeA1vfDY4iRtA",
  authDomain: "story-traker-v1.firebaseapp.com",
  projectId: "story-traker-v1",
  storageBucket: "story-traker-v1.appspot.com",
  messagingSenderId: "365070139701",
  appId: "1:365070139701:web:1b356a67b820e6155fcc7c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storiesCollection = collection(db, "stories")
export const notesCollection = collection(db, "notes")
export const auth = getAuth(app);