import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import { TbPhotoScan } from "react-icons/tb";
import DarkMode from "../components/DarkMode";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const handleShow = () => {
    setShowMenu(!showMenu);
  };
  
  const { logoutUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  
  const likedImagesCount = useSelector(
    (state) => state.likes.likedImages.length
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.15
      }
    }
  };

  const likeBadgeVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: 1
      }
    }
  };

  const categories = [
    "Photos",
    "Illustrations",
    "Ungular++",
    "Wallpapers",
    "Nature",
    "3D Renders",
    "Textures",
    "Architecture & Interiors",
    "Travel",
    "Film",
    "Street Photography",
    "People",
    "Animals",
    "Experimental",
    "Fashion & Beau"
  ];

  return (
    <>
      <motion.header 
        className={`bg-white dark:bg-[#0F172A] sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md dark:shadow-gray-800" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Top Navigation Bar */}
        <nav className="w-full px-5 py-[11px] flex items-center justify-between gap-x-5 border-b dark:border-gray-700">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-block"
          >
            <NavLink to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="E18si dark:bg-white dark:outline"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                version="1.1"
                aria-labelledby="unsplash-home"
                aria-hidden="false"
                style={{ flexShrink: 0 }}
              >
                <desc lang="en-US">Unsplash logo</desc>
                <title id="unsplash-home">Unsplash Home</title>
                <path
                  d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
                  className="st-current dark:bg-white"
                  data-label="path"
                />
              </svg>
            </NavLink>
          </motion.div>
          
          <div className="relative w-full">
            <motion.button 
              className="absolute top-2 left-5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CgSearch className="w-6 h-6" />
            </motion.button>
            <motion.input
              type="search"
              name="Search"
              placeholder="Search photos and illustrations"
              className={`border rounded-full px-16 py-2 w-full focus:outline-none dark:bg-[#0F172A] bg-[#E7E7E7] focus:bg-white dark:border-gray-700 transition-all duration-200 ${searchFocused ? "ring-2 ring-blue-400 dark:ring-blue-600" : ""}`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TbPhotoScan className="absolute w-6 h-6 top-2 right-5" />
            </motion.button>
          </div>
          
          <motion.div
            variants={likeBadgeVariants}
            initial="initial"
            animate={likedImagesCount > 0 ? "pulse" : "initial"}
            key={likedImagesCount}
          >
            <NavLink 
              to={"/likes"} 
              className={"flex items-center gap-x-2"}
              whileHover={{ scale: 1.05 }}
            >
              <AiOutlineLike className="w-6 h-6 text-red-500" />
              <span className="font-medium">{likedImagesCount}</span>
            </NavLink>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <NavLink 
              to="/login" 
              className="text-sm btn pt-3 hidden md:inline-block dark:text-white"
            >
              Login
            </NavLink>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <NavLink 
              to="/register" 
              className="btn pt-3 text-sm hidden md:inline-block dark:text-white"
            >
              Register
            </NavLink>
          </motion.div>
          
          <DarkMode />
          
          <motion.button 
            onClick={handleShow} 
            className="relative p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black dark:text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 16h18v2H3v-2ZM3 6v2h18V6H3Zm0 7h18v-2H3v2Z" />
            </svg>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div 
                  className="absolute -right-1 min-w-40 min-h-60 md:right-1 top-12 bg-white shadow-lg shadow-gray-400 dark:shadow-gray-800 dark:bg-[#0F172A] rounded-lg p-5"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex flex-col gap-4 text-sm dark:text-white">
                    <div>
                      <ul className="space-y-1 flex flex-col gap-y-2">
                        <motion.li whileHover={{ x: 5 }}>
                          <NavLink to={"/"} className="hover:text-blue-500 dark:hover:text-blue-400">Home</NavLink>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                          <NavLink to={"/about"} className="hover:text-blue-500 dark:hover:text-blue-400">About</NavLink>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                          <NavLink to={"/profile"} className="hover:text-blue-500 dark:hover:text-blue-400">Profile</NavLink>
                        </motion.li>
                      </ul>
                    </div>
                    {user && (
                      <motion.button
                        onClick={logoutUser}
                        className="bg-red-500 px-4 py-2 rounded text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Logout
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Categories Navigation Bar */}
        <div className="bg-white dark:bg-[#0F172A] border-b dark:border-gray-700 overflow-x-auto">
          <div className="flex items-center space-x-6 px-5 py-3 whitespace-nowrap">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={({ isActive }) => 
                    `text-sm font-medium ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`
                  }
                >
                  {category}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;