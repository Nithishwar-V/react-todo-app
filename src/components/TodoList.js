import React, { useState } from 'react';
import '../styles/TodoList.css';

function TodoList({ tasks, toggleTaskCompletion, deleteTask, toggleEditMode, saveEditedTask, addTask }) {
  const [taskContent, setTaskContent] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');

  const handleAddTask = () => {
    if (taskContent) {
      addTask(taskContent, taskPriority);
      setTaskContent('');
      setTaskPriority('low');
    }
  };

  return (
    <div className="todo-list">
      {/* Add Task Form */}
      <form onSubmit={(e) => e.preventDefault()} className="task-form">
        <input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Enter task..."
        />
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="button" onClick={handleAddTask}>Add Task</button>
      </form>

      {/* Task List */}
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`todo-item ${task.completed ? 'completed' : ''} ${task.priority}-priority`}
        >
          {task.isEditing ? (
            <div>
              <input
                type="text"
                value={task.content}
                onChange={(e) => saveEditedTask(index, e.target.value)}
              />
              <button onClick={() => toggleEditMode(index)}>Save</button>
            </div>
          ) : (
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span>{task.content}</span>
              <div className="todo-actions">
                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => toggleEditMode(index)}>Edit</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
