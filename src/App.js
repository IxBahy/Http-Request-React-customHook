import React, { useEffect, useState, useCallback, useMemo } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/useHttp';

function App() {
  const [tasks, setTasks] = useState([]);

  let configurations =
  {
    url: 'https://react-demo-ff703-default-rtdb.firebaseio.com/tasks.json',
    method: 'GET'
  }

  const transformTasks = taskObject => {
    const loadedTasks = [];

    for (const taskKey in taskObject) {
      loadedTasks.push({ id: taskKey, text: taskObject[taskKey].text });
    }
    setTasks(loadedTasks);

  }

  const { error, isLoading, sendRequest: fetchTasks } = useHttp()



  useEffect(() => {
    fetchTasks(configurations, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
