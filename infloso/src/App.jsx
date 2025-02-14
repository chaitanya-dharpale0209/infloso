import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react'

import './App.css'
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import VerifyEmail from "./Components/VerifyEmail";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Signup/>}/>
        <Route path="/register" element={<Signup/>} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/verify-email/:token" element = {<VerifyEmail/>}/>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App
