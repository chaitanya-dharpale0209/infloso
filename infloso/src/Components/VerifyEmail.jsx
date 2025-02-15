import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`https://infloso-zffl.onrender.com/api/auth/verify-email/${token}`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data.message || "Email verification failed");
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Email Verification</h2>
        <p className="text-center mt-4">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
