import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useContext(GlobalContext);
  const sendVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "http://localhost:5173/profile",
    }).then(() => {
      toast.success("Verification email is sended !");
    });
  };
  return (
    <div className="flex flex-col items-center mt-16 px-4 md:px-0">
  <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl p-6 bg-base-200 rounded-lg shadow-md">
    <img
      src={user.photoURL}
      alt={user.displayName + " avatar"}
      className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-primary shadow-sm object-cover transition-transform duration-300 hover:scale-110"
    />
    <div className="grid gap-4 w-full md:grid-cols-2 text-sm md:text-base">
      <h2 className="flex flex-col">
        <span className="font-medium text-gray-600">Name:</span>
        <span className="text-gray-900">{user.displayName}</span>
      </h2>
      <h2 className="flex flex-col">
        <span className="font-medium text-gray-600">Status user:</span>
        <span className="flex items-center gap-2">
          {user.emailVerified ? (
            <span className="text-green-600 font-medium">Verified ✔</span>
          ) : (
            <>
              <span className="text-red-600 font-medium">Not Verified</span>
              <button
                onClick={sendVerification}
                className="btn btn-primary btn-xs px-3 py-1 text-xs"
              >
                Send
              </button>
            </>
          )}
        </span>
      </h2>
      <h2 className="flex flex-col md:col-span-2">
        <span className="font-medium text-gray-600">Email:</span>
        <span className="text-gray-900">{user.email}</span>
      </h2>
    </div>
  </div>
</div>
  );
}

export default Profile;
