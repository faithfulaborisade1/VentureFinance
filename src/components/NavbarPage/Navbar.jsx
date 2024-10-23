import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.scss";

import logo from '../Assets/nl.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="navbar-logo">
        <h2>VentureFinace</h2>
        {/* <img src={logo} alt="" /> */}
      </div>
      <div className="navbar-links">
        <motion.div
          className="settings-icon"
          onClick={toggleDropdown}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faCog} size="2x" />
        </motion.div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="dropdown-menu"
              ref={dropdownRef} // Attach reference to dropdown
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/profile" className="dropdown-item">
                Manage Profile
              </Link>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
