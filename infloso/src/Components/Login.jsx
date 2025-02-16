import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMusic } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "https://infloso-zffl.onrender.com/api/auth";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const InputField = ({ icon: Icon, type, name, value, placeholder, onChange, showPassword, onTogglePassword }) => (
  <motion.div
    variants={itemVariants}
    className="relative group"
  >
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-white transition-colors" />
    <motion.input
      whileFocus={{ scale: 1.02 }}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border border-purple-300/20 focus:border-purple-300/50 text-white placeholder-purple-300 outline-none transition-all duration-300 backdrop-blur-sm"
      required
    />
    {type === "password" && (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </motion.button>
    )}
  </motion.div>
);

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const navigate = useNavigate();

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
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        if (rememberMe) {
          localStorage.setItem("username", credentials.username);
        } else {
          localStorage.removeItem("username");
        }

        navigate("/home");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = credentials.username && credentials.password;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4"
          >
            <FiMusic className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 className="text-4xl font-bold text-white mb-2">MelodyVerse</motion.h1>
          <motion.p className="text-purple-200">Where music connects souls</motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-purple-200">Let's get back to the music</p>
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-red-500/20 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded"
                >
                  <p className="text-red-100">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              variants={containerVariants}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="space-y-4">
                <InputField
                  icon={FiUser}
                  type="text"
                  name="username"
                  value={credentials.username}
                  placeholder="Username"
                  onChange={handleChange}
                />

                <InputField
                  icon={FiLock}
                  type="password"
                  name="password"
                  value={credentials.password}
                  placeholder="Password"
                  onChange={handleChange}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
              </div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <motion.input
                    whileHover={{ scale: 1.1 }}
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-white/10 border-purple-300/50 rounded checked:bg-purple-500 checked:border-purple-500"
                  />
                  <span className="text-sm text-purple-200 group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </motion.label>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-200 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                      <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </motion.svg>
                      <span>Tuning in...</span>
                    </>
                  ) : (
                    'Sign in to MelodyVerse'
                  )}
                </span>
              </motion.button>
            </motion.form>

            <motion.p
              variants={itemVariants}
              className="text-center text-purple-200"
            >
              New to MelodyVerse?{' '}
              <motion.span whileHover={{ scale: 1.05 }}>
                <Link 
                  to="/register" 
                  className="text-white hover:text-pink-300 transition-colors font-medium"
                >
                  Join the symphony
                </Link>
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
