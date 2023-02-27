import { useState } from 'react';
import useHttp from '../../hooks/useHttp';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.data
    const createdTask = { id: generatedId, text: taskText }
    props.onAddTask(createdTask)
  }
  const { error, isLoading, sendRequest } = useHttp()

  const enterTaskHandler = async (taskText) => {
    const configurations = {
      url: 'https://react-demo-ff703-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText },

    }
    sendRequest(configurations, createTask.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
