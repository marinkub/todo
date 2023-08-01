import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBvvRYVmRqPdlarJAgzp4T-ZZ_M-aST6Ws",
  authDomain: "todo-7228e.firebaseapp.com",
  projectId: "todo-7228e",
  storageBucket: "todo-7228e.appspot.com",
  messagingSenderId: "925021751663",
  appId: "1:925021751663:web:61d4ac1e0a038ea771009a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);