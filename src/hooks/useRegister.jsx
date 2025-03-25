// firebase imports
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

export const useRegister = () => {
  const { dispatch } = useContext(GlobalContext);
  // google rqali ro'yxatdan o'tish
  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome, ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  // email va password orqali ro'yxatdan o'tish
  const registerWithEmail = (displayname, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayname,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayname}`,
        });
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome, ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return { registerWithEmail, registerWithGoogle };
};
