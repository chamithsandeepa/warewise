import axios from "axios";
import React, { useState } from "react";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-[#fdfcf8]">
      <div className="bg-white shadow-soft rounded-xl px-8 py-10 max-w-md w-full glass">
        <h1 className="text-3xl font-prata font-bold mb-8 text-primary text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 font-outfit">
              Email Address
            </p>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all duration-300 font-outfit bg-gray-50/50"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 font-outfit">Password</p>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all duration-300 font-outfit bg-gray-50/50"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="mt-4 w-full py-3 px-4 rounded-md text-white bg-primary hover:bg-black transition-all duration-300 font-medium font-outfit shadow-md hover:shadow-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
