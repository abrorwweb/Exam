import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Profile</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p>Verified: {user?.emailVerified ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;