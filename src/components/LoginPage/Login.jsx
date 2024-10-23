import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase setup
import "./Login.scss";

import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      navigate("/dashboard"); // Redirect to Dashboard on successful login
    } catch (error) {
      setError(error.message);
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <motion.div className="header" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="text">Login</div>
        <div className="underline"></div>
      </motion.div>

      <motion.form className="inputs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} onSubmit={handleSubmit}>
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Display error messages */}

        <div className="submit-container">
          <motion.button
            type="submit"
            className="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <motion.div
            className="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")} // Navigate to signup page
          >
            Sign Up
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
