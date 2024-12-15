import React, { useCallback, memo } from 'react';
import { List, Button, Typography } from 'antd';
import { useTaskContext } from '../context/TaskContext';

const { Text } = Typography;

const TaskItem = memo(({ task }) => {
  const { toggleComplete, setEditingTask, deleteTask } = useTaskContext();

  // Memoize handlers to prevent unnecessary re-renders
  const handleToggle = useCallback(() => {
    toggleComplete(task.id);
  }, [toggleComplete, task.id]);

  const handleEdit = useCallback(() => {
    setEditingTask(task);
  }, [setEditingTask, task]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  return (
    <List.Item
      actions={[
        <Button 
          onClick={handleToggle}
          type={task.completed ? 'default' : 'primary'}
          size="middle"
        >
          {task.completed ? 'Activate' : 'Complete'}
        </Button>,
        <Button 
          onClick={handleEdit}
          type="default"
          size="middle"
        >
          Edit
        </Button>,
        <Button 
          danger 
          onClick={handleDelete}
          size="middle"
        >
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <Text 
            delete={task.completed}
            style={{ 
              fontSize: '16px',
              color: task.completed ? '#999' : '#000'
            }}
          >
            {task.name}
          </Text>
        }
        description={
          <Text 
            style={{ 
              color: task.completed ? '#999' : '#666',
              fontSize: '14px'
            }}
          >
            {task.description}
          </Text>
        }
      />
    </List.Item>
  );
});

// Add display name for debugging
TaskItem.displayName = 'TaskItem';

export default TaskItem;
