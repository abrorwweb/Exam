import { deleteDoc, doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

export const useFirestore = () => {
  const addDocument = (collectionName, data) => {
    addDoc(collection(db, collectionName), data)
      .then(() => {
        toast.success("You add this image ❤");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const deleteDocument = (collectionName, id) => {
    deleteDoc(doc(db, collectionName, id))
      .then(() => {
        toast.success("You deleted this image 🗑");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return { addDocument, deleteDocument };
};
