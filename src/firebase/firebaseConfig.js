import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWg_A-py1n50c4YpceKiXIUqtTLtW8a9w",
  authDomain: "unsplash-by-aao.firebaseapp.com",
  projectId: "unsplash-by-aao",
  storageBucket: "unsplash-by-aao.appspot.com",
  messagingSenderId: "836400092552",
  appId: "1:836400092552:web:ae18894b658ec31afad63d"
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