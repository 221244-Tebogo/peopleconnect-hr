// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileComments from "./ProfileComments";

const Profile = ({ match }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = match.params.userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/employees/user/${userId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>{profile.user.name}'s Profile</h1>
      <p>Department: {profile.department}</p>
      <p>Role: {profile.role}</p>
      <p>Contact Number: {profile.contactNumber}</p>
      <p>Bio: {profile.bio}</p>
      <ProfileComments userId={userId} comments={profile.comments} />
    </div>
  );
};

export default Profile;
