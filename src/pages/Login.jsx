import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import DarkMode from "../components/DarkMode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="flex min-h-screen w-screen">
      <div className="w-full px-5 flex items-center justify-center relative">
        <div className="absolute top-5 right-10">
          <DarkMode />
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 py-5 max-w-96 flex flex-col gap-y-3 w-full bg-white dark:bg-[#0F172A] shadow-lg rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-3">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
          />
          <button
            type="submit"
            className=" btn px-6 py-2 w-full text-black font-semibold rounded-lg"
          >
            Login
          </button>
          <button onClick={loginWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <NavLink className="btn" to={"/register"}>
            Register
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
