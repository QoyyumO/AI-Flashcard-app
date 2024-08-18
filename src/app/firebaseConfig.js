// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNJ8XI6z6Eks9g94SWIEeJs-k1wJcsIOw",
  authDomain: "ai-flashcard-4cd71.firebaseapp.com",
  projectId: "ai-flashcard-4cd71",
  storageBucket: "ai-flashcard-4cd71.appspot.com",
  messagingSenderId: "1064583453437",
  appId: "1:1064583453437:web:3693f367636689e11dfc94",
  measurementId: "G-98HR7NBD1V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
