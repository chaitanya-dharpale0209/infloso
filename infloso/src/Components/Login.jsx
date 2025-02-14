import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMusic } from "react-icons/fi";
import axios from "axios"; // Import axios for making API requests

const API_URL = "http://localhost:5000/api/auth"; // Make sure to replace this with your actual API URL

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const navigate = useNavigate();

  // Check if the username is saved in localStorage when the component loads
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setCredentials(prev => ({ ...prev, username: savedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormTouched(true);
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (message) setMessage(""); // Reset the error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      // Make the API call to authenticate the user
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        
        // If "Remember Me" is checked, store the username in localStorage
        if (rememberMe) {
          localStorage.setItem("username", credentials.username);
        } else {
          localStorage.removeItem("username");
        }

        navigate("/home"); // Navigate to home on successful login
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = credentials.username && credentials.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,...')] opacity-10" />
      
      <div className="w-full max-w-md relative">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <FiMusic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MelodyVerse</h1>
          <p className="text-purple-200">Where music connects souls</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-purple-200">Let's get back to the music</p>
            </div>

            {/* Error Message */}
            {message && (
              <div className="animate-shake bg-red-500/20 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-100">{message}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {/* Username Field */}
                <div className="relative group">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
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
                    onChange={handleChange}
                    placeholder="Password"
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-white/10 border-purple-300/50 rounded checked:bg-purple-500 checked:border-purple-500"
                  />
                  <span className="text-sm text-purple-200 group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-200 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (!isFormValid && formTouched)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 
                  ${loading || (!isFormValid && formTouched)
                    ? 'bg-purple-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700'
                  } text-white backdrop-blur-sm`}
              >
                <span className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Tuning in...</span>
                    </>
                  ) : (
                    'Sign in to MelodyVerse'
                  )}
                </span>
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-purple-200">
              New to MelodyVerse?{' '}
              <Link 
                to="/register" 
                className="text-white hover:text-pink-300 transition-colors font-medium"
              >
                Join the symphony
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
