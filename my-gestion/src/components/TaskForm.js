import React, { useEffect, useCallback, useState } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [method, setMethod] = useState('');
  const { addTask, editTask, editingTask, setEditingTask } = useTaskContext();


  console.log('editing out of useEffect', editingTask?.name);

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        name: editingTask.name ?? '',
        description: editingTask.description ?? '',
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleFinish = useCallback(async (values) => {
    if (!values.name?.trim() || !values.description?.trim()) {
      message.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const taskData = {
        name: values.name.trim(),
        description: values.description.trim(),
      };

      if (editingTask?.name !== '') {
        editTask({ ...editingTask, ...taskData });
        message.success('Task updated successfully');
      } else {
        addTask(taskData);
        message.success('Task added successfully');
      }
      form.resetFields();
      setEditingTask(null);
    } catch (error) {
      message.error(`Failed to ${editingTask ? 'update' : 'add'} task: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [editingTask, editTask, addTask, form, setEditingTask]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setEditingTask(null);
  }, [form, setEditingTask]);
  
  return (
    <Modal
      title={
        editingTask?.name !== '' ? 
        'Edit Task' 
        :
        'Add Task'
      }
      open={editingTask}
      onOk={editingTask} 
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
      maskClosable={true}
      centered
    >
      <Form 
        form={form} 
        onFinish={handleFinish} 
        layout="vertical"
        preserve={false}
      >
        <Form.Item
          name="name"
          label="Task Name"
          rules={[
            { required: true, message: 'Task name is required!' },
            { max: 100, message: 'Task name cannot exceed 100 characters!' }
          ]}
        >
          <Input 
            placeholder="Enter task name"
            maxLength={100}
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Task Description"
          rules={[
            { required: true, message: 'Task description is required!' },
            { max: 500, message: 'Description cannot exceed 500 characters!' }
          ]}
        >
          <Input.TextArea 
            placeholder="Enter task description" 
            maxLength={500}
            showCount
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
            disabled={loading}
          >
            {editingTask?.name !== '' ? 'Save Changes' : 'Add Task'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(TaskForm);
