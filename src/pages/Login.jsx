import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
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
          
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 py-5 max-w-96 flex flex-col gap-y-3 w-full bg-white dark:bg-[#0F172A] shadow-lg rounded-lg"
        >
          <DarkMode />
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
            className="px-6 py-2 w-full  font-semibold btn btn-primary"
          >
            Login
          </button>
          <button
            type="button"
            onClick={loginWithGoogle}
            className="px-6 py-2 w-full flex items-center justify-center gap-x-2 btn btn-square"
          >
            Login with <FcGoogle />
          </button>
          <NavLink className="btn btn-secondary" to={"/register"}>Register</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
