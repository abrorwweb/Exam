import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD59IWqBeVxu_ryBZdS82l4an9WihLlx1I",
  authDomain: "my-splash-60734.firebaseapp.com",
  projectId: "my-splash-60734",
  storageBucket: "my-splash-60734.appspot.com",
  messagingSenderId: "748108951989",
  appId: "1:748108951989:web:b7de8d1d654f8587db29fc",
};

const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();
export const db = getFirestore(app);
