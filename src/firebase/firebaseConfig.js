import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARzTyw3BeKKcWOk5pL0txfeNrjIeKx3jM",
  authDomain: "my-unsplash-8c128.firebaseapp.com",
  projectId: "my-unsplash-8c128",
  storageBucket: "my-unsplash-8c128.firebasestorage.app",
  messagingSenderId: "1075685464201",
  appId: "1:1075685464201:web:3f72765002ccbb0cd3ce58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);


