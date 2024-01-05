/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useToast } from "../hooks/useToaster";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", token);
      localStorage.setItem("username", formData.username);
      navigate("/");
      toast.success("login successful");
    } catch (error) {
      toast.error("login failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-24 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="name"
          id="username"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <Link to="/" className="py-2 px-4 text-gray-400 underline">
          home
        </Link>
      </div>
    </div>
  );
};

export default Login;
