// src/components/ProfileComments.js
import React, { useState } from "react";
import axios from "axios";

const ProfileComments = ({ userId, comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/api/employees/comment/${userId}`, {
        comment: newComment,
      });
      setNewComment("");
      // Refresh comments list after adding
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment.name}: {comment.comment}
          </li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Submit</button>
    </div>
  );
};

export default ProfileComments;
