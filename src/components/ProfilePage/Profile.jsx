import React, { useEffect, useState } from "react";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import "./Profile.scss"

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the current user and set initial values
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
    }
  }, [auth]);

  // Handle name update
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      if (name) {
        await updateProfile(user, { displayName: name });
        setSuccessMessage("Name updated successfully!");
        setErrorMessage(""); // Clear any error messages
      }
    } catch (error) {
      setErrorMessage("Failed to update name. Please try again.");
      console.error(error);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (password) {
        await updatePassword(user, password);
        setSuccessMessage("Password updated successfully!");
        setErrorMessage(""); // Clear any error messages
      }
    } catch (error) {
      setErrorMessage("Failed to update password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Management</h1>
      {user ? (
        <div>
          <form onSubmit={handleNameUpdate}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button type="submit">Update Name</button>
          </form>

          <form onSubmit={handlePasswordUpdate}>
            <label>
              New Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">Update Password</button>
          </form>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;
