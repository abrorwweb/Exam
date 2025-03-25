import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA94G9XZSc2F-1LkdKnn48xD7RlIEeVx04",
  authDomain: "unsplash-2e150.firebaseapp.com",
  projectId: "unsplash-2e150",
  storageBucket: "unsplash-2e150.appspot.com",
  messagingSenderId: "745257135693",
  appId: "1:745257135693:web:30518186af12f5d5023604",
  measurementId: "G-J9B87RTB12"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Google orqali kirishda xato:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Chiqishda xato:", error);
    throw error;
  }
};