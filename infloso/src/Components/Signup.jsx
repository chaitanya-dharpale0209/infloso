import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiLock, FiMail, FiCheckSquare } from "react-icons/fi";

const API_URL = "http://localhost:5000/api/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "regular_user",
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Validate email format
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    // Validate form fields
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage("Invalid email format.");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!formData.termsAccepted) {
      setErrorMessage("You must accept the terms and conditions.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setMessage("Registration successful! Welcome email sent.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        {message && (
          <p className="text-green-600 text-sm text-center bg-green-100 p-3 rounded-md mb-4">
            {message}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-600">
              I accept the{" "}
              <Link to="/terms" className="text-purple-600 hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
