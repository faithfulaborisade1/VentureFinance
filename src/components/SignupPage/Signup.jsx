import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // Firebase setup
import "./Signup.scss";

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the display name with the user-provided name
      await updateProfile(user, {
        displayName: name,
      });

      console.log("User created:", user);
      setSuccessMessage("Account created successfully!");
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container">
      <motion.div className="header" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </motion.div>

      <motion.form className="inputs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} onSubmit={handleSubmit}>
        <div className="input">
          <img src={user_icon} alt="user icon" />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Success message */}

        <div className="submit-container">
          <motion.button type="submit" className="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Sign Up
          </motion.button>
          <motion.button type="button" className="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/login")}>
            Login
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;
