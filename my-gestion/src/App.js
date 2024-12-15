import React, { memo, useCallback, useState } from 'react';
import { Button } from 'antd';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TaskProvider, useTaskContext } from './context/TaskContext';

const AppContent = memo(() => {
  const { setEditingTask } = useTaskContext();
  const [open, setOpen] = useState(false);

  const handleAddTask = useCallback(() => {
    setOpen(!open);
    setEditingTask(
      { 
      id: null,
      name: '',
      description: '',
      completed: false
    },
    open
  );
  }, [setEditingTask, open]);

  console.log(open, "open not open")

  return (
    <div 
      style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '24px',
        color: '#1890ff'
      }}>
        To-Do List
      </h1>
      <Button
        type="primary"
        onClick={handleAddTask}
        block
        size="large"
        style={{ 
          marginBottom: '20px',
          height: '40px'
        }}
      >
        Add Task
      </Button>
      <TaskList />
      <TaskForm />
    </div>
  );
});

// Add display name for debugging purposes
AppContent.displayName = 'AppContent';

const App = memo(() => (
  <TaskProvider>
    <AppContent />
  </TaskProvider>
));

App.displayName = 'App';

export default App;