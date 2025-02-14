import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/request-password-reset`, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        {message && <p className="text-center text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
