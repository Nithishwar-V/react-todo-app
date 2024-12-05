import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

  const toggleEditMode = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, isEditing: !task.isEditing } : task
    ));
  };

  const saveEditedTask = (index, newContent) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, content: newContent, isEditing: false } : task
    ));
  };

  const addTask = (taskContent, priority) => {
    const newTask = {
      content: taskContent,
      completed: false,
      isEditing: false,
      priority: priority || 'low',
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Todo List</h1>
      <div className="filters">
        <button className="filter-button" onClick={() => handleFilterChange('all')}>All</button>
        <button className="filter-button" onClick={() => handleFilterChange('active')}>Active</button>
        <button className="filter-button" onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
      {/* Task Form */}
      <TodoList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
        toggleEditMode={toggleEditMode}
        saveEditedTask={saveEditedTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
