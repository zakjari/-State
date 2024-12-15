import React, { memo } from 'react';
import { List, Empty } from 'antd';
import TaskItem from './TaskItem';
import { useTaskContext } from '../context/TaskContext';

const TaskList = memo(() => {
  const { tasks } = useTaskContext();

  if (!tasks.length) {
    return (
      <Empty
        description="No tasks found"
        style={{ margin: '20px 0' }}
      />
    );
  }

  console.log(tasks, "tasks")

  return (
    <List
      dataSource={tasks}
      renderItem={(task) => <TaskItem key={task.id} task={task} />}
      style={{ 
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '8px'
      }}
    />
  );
});

// Add display name for debugging
TaskList.displayName = 'TaskList';

export default TaskList;