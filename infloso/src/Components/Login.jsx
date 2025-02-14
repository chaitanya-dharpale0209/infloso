import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiLock } from "react-icons/fi";

const API_URL = "http://localhost:5000/api/auth";
const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Check if the username is saved in localStorage when the component loads
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setCredentials((prevState) => ({ ...prevState, username: savedUsername }));
      setRememberMe(true); // If username is found, set rememberMe to true
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      localStorage.setItem("token", res.data.token);

      // If "Remember Me" is checked, store the username in localStorage
      if (rememberMe) {
        localStorage.setItem("username", credentials.username);
      } else {
        localStorage.removeItem("username");
      }

      navigate("/home");
    } catch (error) {
      setMessage(error.response?.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        {message && (
          <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md mb-4">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-2">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
