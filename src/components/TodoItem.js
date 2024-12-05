import React, { useState } from 'react';
import '../styles/TodoItem.css';

function TodoItem({ task, index, toggleTaskCompletion, deleteTask, toggleEditMode, saveEditedTask }) {
  const [editContent, setEditContent] = useState(task.content);

  const handleSaveEdit = () => {
    saveEditedTask(index, editContent);
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      {task.isEditing ? (
        <div className="edit-mode">
          <input 
            type="text" 
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
            autoFocus
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div className="view-mode">
          <span 
            className={task.completed ? 'completed-task' : ''} 
            onClick={() => toggleTaskCompletion(index)}
          >
            {task.content}
          </span>
          <button onClick={() => toggleEditMode(index)}>Edit</button>
          <button onClick={() => deleteTask(index)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
