import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useContext(GlobalContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      await updateDoc(doc(db, "users", user.uid), {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      toast.success("Profile updated successfully! Redirecting...");
      setEditing(false);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        {editing ? (
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="input input-bordered w-32 md:w-40 text-center border-gray-400 dark:border-gray-600"
          />
        ) : (
          <img
            src={user.photoURL}
            alt={user.displayName + " avatar"}
            className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-primary shadow-md transition-transform duration-300 hover:scale-110"
          />
        )}

        <div className="grid gap-4 w-full md:grid-cols-2 text-sm md:text-base">
          {editing ? (
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="input input-bordered w-full p-2 border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
            />
          ) : (
            <h2 className="font-medium text-gray-600 dark:text-gray-300">
              Name:
              <span className="block text-gray-900 dark:text-white font-semibold">{user.displayName}</span>
            </h2>
          )}

          <h2 className="font-medium text-gray-600 dark:text-gray-300">
            Status user:
            <span className="flex items-center gap-2 font-semibold">
              {user.emailVerified ? (
                <span className="text-green-600">Verified ✔</span>
              ) : (
                <span className="text-red-600">Not Verified</span>
              )}
            </span>
          </h2>

          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="input input-bordered w-full p-2 border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md cursor-not-allowed"
            />
          ) : (
            <h2 className="font-medium text-gray-600 dark:text-gray-300">
              Email:
              <span className="block text-gray-900 dark:text-white font-semibold">{user.email}</span>
            </h2>
          )}
        </div>
      </div>
      <button
        onClick={() => (editing ? handleSave() : setEditing(true))}
        className="mt-6 px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 
          bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {editing ? "Save & Go to Profile" : "Edit Profile"}
      </button>
    </div>
  );
}

export default Profile;
