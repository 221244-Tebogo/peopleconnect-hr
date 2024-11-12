// src/components/TaskItem.js
import React from "react";

function TaskItem({ task, onToggleComplete, onDelete, onAddComment }) {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
      />
      {task.text} - Assigned to: {task.employee}
      <button onClick={onDelete}>Delete</button>
      <input
        type="text"
        placeholder="Add comment"
        onBlur={(e) => onAddComment(e.target.value)}
      />
      <ul>
        {task.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </li>
  );
}

export default TaskItem;
