// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="navbar shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Unsplash Clone
        </Link>
      </div>
      <div className="flex-none flex items-center gap-2">
        <ThemeToggle />
        <Link to="/likes" className="btn btn-ghost">
          Likes
        </Link>
        {user ? (
          <Link to="/profile" className="btn btn-ghost">
            Profile
          </Link>
        ) : (
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;