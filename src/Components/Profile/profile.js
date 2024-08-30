import React, { useState } from 'react';
import './profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phone: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="profile-photo">
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" />
          ) : (
            <div className="photo-placeholder">No photo uploaded</div>
          )}
          <label className="btn-upload">
            Upload Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="profile-field">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleInputChange}
              placeholder="Enter your department"
            />
          </div>
          <div className="profile-field">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={handleInputChange}
              placeholder="Enter your position"
            />
          </div>
          <div className="profile-field">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
