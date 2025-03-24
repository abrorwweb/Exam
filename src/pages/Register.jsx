import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import DarkMode from "../components/DarkMode";

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await register(formData.displayName, formData.email, formData.password);
  };

  return (
    <div className="flex min-h-screen w-screen">
      <div className="lg:w-2/5 w-full lg:bg-[url('https://picsum.photos/900/1200')] bg-center bg-cover hidden lg:block"></div>
      <div className="w-full px-5 lg:w-3/5  flex items-center justify-center relative">
        <div className="absolute top-5 right-10">
         
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 py-5 max-w-96 w-full bg-white dark:bg-[#0F172A] shadow-lg rounded-lg"
        >
           <DarkMode />
          <h2 className="text-3xl font-bold mb-3">Register</h2>
          <div className="flex flex-col gap-y-3">
            <h5>Full name</h5>
            <input
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={formData.displayName}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
            />
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
            />
            <h5>Password</h5>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
            />
            <h5>Confirm</h5>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border px-3 py-2 w-full rounded-lg focus:outline-none bg-[#E7E7E7] focus:bg-white"
            />
            <button
              type="submit"
              className=" mt-4 px-6 py-2 w-full font-semibold btn btn-secondary"
            >
              Register
            </button>
            <button
              type="button"
              onClick={loginWithGoogle}
              className="px-6 py-2 w-full flex items-center justify-center gap-x-2  font-semibold btn btn-accent"
            >
              Register with <FcGoogle />
            </button>
            <NavLink className="btn btn-ghost" to={"/login"}>Login</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
