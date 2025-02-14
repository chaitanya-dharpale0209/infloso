import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {message && <p className="text-center text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
