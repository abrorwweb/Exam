import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
// icon heart
import { FaDownload, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";

// firebase imports
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function themeLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const { likeImageArr, downloadImagesArr, user, dispatch } =
    useContext(GlobalContext);

  const [theme, setTheme] = useState(themeLocalStorage());
  const toogleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient py-3">
  <div className="align-elements navbar flex items-center justify-between">
    <div className="navbar-start">
      <Link>
        <FcStackOfPhotos className="hidden text-6xl md:flex" />
      </Link>
      <div className="dropdown">
          <FcStackOfPhotos className="text-6xl md:hidden" />
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[10] w-52 rounded-xl bg-gray-900/90 text-white backdrop-blur-md p-2 shadow-xl"
        >
          <li><Link to="/" className="hover:bg-gray-700">Home</Link></li>
          <li><Link to="/about" className="hover:bg-gray-700">About</Link></li>
          <li><Link to="/contact" className="hover:bg-gray-700">Contact</Link></li>
        </ul>
      </div>
    </div>
    
    <nav className="navbar-center hidden md:flex">
      <ul className="flex items-center gap-5">
        <li><Link to="/" className="font-medium text-white hover:text-yellow-300">Home</Link></li>
        <li><Link to="/about" className="font-medium text-white hover:text-yellow-300">About</Link></li>
        <li><Link to="/contact" className="font-medium text-white hover:text-yellow-300">Contact</Link></li>
      </ul>
    </nav>

    <div className="navbar-end flex items-center gap-3 md:gap-4">
      <Link to="/download-images">
        <div className="indicator">
          <span className="badge indicator-item badge-secondary">{downloadImagesArr.length}</span>
          <FaDownload className="text-red-70 m-1 text-xl md:text-3xl text-white" />
        </div>
      </Link>
      <Link to="/likes">
        <div className="indicator">
          <span className="badge indicator-item badge-secondary">{likeImageArr.length}</span>
          <FaHeart className="text-red-70 m-1 text-xl md:text-3xl text-white" />
        </div>
      </Link>

      {/* Dark/Light Mode Toggle */}
      <label className="swap swap-rotate">
        <input type="checkbox" onClick={toogleTheme} />
        <FaSun className="swap-on h-5 w-5 fill-current text-white md:h-7 md:w-7" />
        <FaMoon className="swap-off h-5 w-5 fill-current text-white md:h-7 md:w-7" />
      </label>

      {/* Dropdown Avatar */}
      <div className="hidden items-center gap-1 md:flex">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              {user.photoURL && (
                <img alt="User Avatar" src={user.photoURL} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[50] mt-3 w-52 rounded-xl bg-gray-900/90 text-white backdrop-blur-md p-2 shadow-xl"
          >
            <li><Link to="/profile" className="hover:bg-gray-700">Profile <span className="badge">New</span></Link></li>
            <li><Link to="/settings" className="hover:bg-gray-700">Settings</Link></li>
            <li><button onClick={signOutUser} className="hover:bg-gray-700">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</header>

  
  );
}

export default Navbar;
