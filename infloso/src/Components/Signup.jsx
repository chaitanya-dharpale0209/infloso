import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiMail, FiMusic, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Replace with your actual API URL

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrorMessage("");
  };

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    // Validate form fields
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("All fields are required to join the melody.");
      setLoading(false);
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage("Please provide a valid email address.");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Your passwords are out of tune with each other.");
      setLoading(false);
      return;
    }
    if (!formData.termsAccepted) {
      setErrorMessage("Please accept our harmony guidelines to continue.");
      setLoading(false);
      return;
    }

    try {
      // Make API call to register the user
      const response = await axios.post(`${API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setMessage("Welcome to MelodyVerse! Preparing your musical journey...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setErrorMessage("Couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSI1MiIgdmlld0JveD0iMCAwIDUyIDUyIiBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIyNiIgY3k9IjI2IiByPSI0IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />

      <div className="w-full max-w-md relative">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <FiMusic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MelodyVerse</h1>
          <p className="text-purple-200">Join the musical journey</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
              <p className="text-purple-200">Begin your musical adventure</p>
            </div>

            {/* Messages */}
            {message && (
              <div className="animate-pulse bg-green-500/20 backdrop-blur-sm border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-100">{message}</p>
              </div>
            )}
            {errorMessage && (
              <div className="animate-shake bg-red-500/20 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-100">{errorMessage}</p>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div className="relative group">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  name="username"
                  placeholder="Choose your username"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-purple-300/20 focus:border-purple-300/50 text-white placeholder-purple-300 outline-none transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-purple-300/20 focus:border-purple-300/50 text-white placeholder-purple-300 outline-none transition-all duration-300 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create your password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border border-purple-300/20 focus:border-purple-300/50 text-white placeholder-purple-300 outline-none transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border border-purple-300/20 focus:border-purple-300/50 text-white placeholder-purple-300 outline-none transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 bg-white/10 border-purple-300/50 rounded checked:bg-purple-500 checked:border-purple-500"
                />
                <label className="text-sm text-purple-200">
                  I accept the{" "}
                  <Link to="/terms" className="text-white hover:text-pink-300 transition-colors">
                    harmony guidelines
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 
                  ${loading 
                    ? 'bg-purple-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700'
                  } text-white backdrop-blur-sm`}
              >
                <span className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Composing your profile...</span>
                    </>
                  ) : (
                    'Join MelodyVerse'
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-purple-200">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-white hover:text-pink-300 transition-colors font-medium"
              >
                Return to your melody
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
