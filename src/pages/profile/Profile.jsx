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
    <div className="align-elements">
      <div className="flex gap-5">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName + " avatar"}
            className="h-40 w-40 rounded-full"
          />
        </div>
        <div className="grid grow gap-4 rounded-lg bg-base-200 p-5 md:grid-cols-2">
          <h2>
            <span className="block font-medium">Display name:</span>
            <span>{user.displayName}</span>
          </h2>

          <h2>
            <span className="block font-medium">Status user:</span>
            <span>
              {user.emailVerified ? (
                "Verifed ✔"
              ) : (
                <span className="flex items-center gap-2">
                  <span>Not Verified</span>
                  <button
                    onClick={sendVerification}
                    className="btn btn-primary btn-xs"
                  >
                    Send
                  </button>
                </span>
              )}
            </span>
          </h2>

          <h2>
            <span className="block font-medium">Email:</span>
            <span>{user.email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
