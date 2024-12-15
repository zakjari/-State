import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tasks';

// Create the Context with a default value
const TaskContext = createContext({
  tasks: [],
  editingTask: null,
  setEditingTask: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {}, 
  toggleComplete: () => {},
  openModal: false,
});

// Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  });
  
  const [editingTask, setEditingTask] = useState(null);

  // Persist tasks to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  // Memoized task operations
  const addTask = useCallback((task) => {
    setTasks(currentTasks => [
      ...currentTasks,
      {
        ...task,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
  }, []);

  const editTask = useCallback((updatedTask) => {
    setTasks(currentTasks =>
      currentTasks.map(task => 
        task.id === updatedTask.id 
          ? { ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(currentTasks => 
      currentTasks.filter(task => task.id !== taskId)
    );
  }, []);

  const toggleComplete = useCallback((taskId) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  const contextValue = {
    tasks,
    editingTask,
    setEditingTask,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook to use TaskContext with error handling
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};