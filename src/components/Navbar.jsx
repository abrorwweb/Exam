import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import { FaDownload, FaHeart, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { FcStackOfPhotos } from "react-icons/fc";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
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
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-500 to-slate-400 py-3 shadow-lg">
        <div className="align-elements flex items-center justify-between px-4 md:px-8">
        
          <Link to="/" className="flex items-center gap-2">
            <FcStackOfPhotos className="text-4xl md:text-6xl" />
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            <Link to="/about" className="text-white hover:text-yellow-300">About</Link>
            <Link to="/contact" className="text-white hover:text-yellow-300">Contact</Link>
          </nav>

          <button className="md:hidden text-white text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars />
          </button>

          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-gray-900/90 text-white p-5 md:hidden">
              <Link to="/" className="block py-2 hover:bg-gray-700">Home</Link>
              <Link to="/about" className="block py-2 hover:bg-gray-700">About</Link>
              <Link to="/contact" className="block py-2 hover:bg-gray-700">Contact</Link>
            </div>
          )}

          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/download-images">
              <div className="indicator">
                <span className="badge indicator-item badge-secondary">{downloadImagesArr.length}</span>
                <FaDownload className="text-xl md:text-3xl text-white" />
              </div>
            </Link>
            <Link to="/likes">
              <div className="indicator">
                <span className="badge indicator-item badge-secondary">{likeImageArr.length}</span>
                <FaHeart className="text-xl md:text-3xl text-white" />
              </div>
            </Link>

            <label className="swap swap-rotate">
              <input type="checkbox" onClick={toggleTheme} />
              <FaSun className="swap-on h-5 w-5 text-white md:h-7 md:w-7" />
              <FaMoon className="swap-off h-5 w-5 text-white md:h-7 md:w-7" />
            </label>

            {user && (
              <div className="dropdown dropdown-end hidden md:flex">
                <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                  <div className="w-10 rounded-full">
                    {user.photoURL && <img alt="User Avatar" src={user.photoURL} />}
                  </div>
                </div>
                <ul className="menu dropdown-content z-50 mt-3 w-52 rounded-xl bg-gray-900/90 text-white p-2 shadow-xl">
                  <li>
                    <Link to="/profile" className="hover:bg-gray-700">Profile <span className="badge">New</span></Link>
                  </li>
                  <li>
                    <Link to="/settings" className="hover:bg-gray-700">Settings</Link>
                  </li>
                  <li>
                    <button onClick={signOutUser} className="hover:bg-gray-700">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      
      <div className="mt-[100px]"></div>
    </>
  );
}

export default Navbar;
