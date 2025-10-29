import React, { useState } from "react";
import "./App.css";

function App() {
  // user info
  const [user, setUser] = useState({
    name: "Rithin Shaju",
    bio: "Software Developer | Tech Enthusiast | Coffee Lover ☕",
    profilePic: "https://via.placeholder.com/120",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ ...tempUser, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // save and cancel functions
  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <div className="page">
      <div className="card">
        {isEditing ? (
          <>
            <div className="profile-pic-container">
              <img src={tempUser.profilePic} alt="Profile" className="profile-pic" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-btn"
              />
            </div>

            <input
              type="text"
              name="name"
              value={tempUser.name}
              onChange={handleChange}
              className="inputBox"
              placeholder="Enter name"
            />

            <textarea
              name="bio"
              value={tempUser.bio}
              onChange={handleChange}
              className="inputBox"
              placeholder="Enter bio"
            />

            <div className="buttons">
              <button className="save" onClick={handleSave}>Save</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
            <h2>{user.name}</h2>
            <p className="bio">{user.bio}</p>
            <button className="edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
