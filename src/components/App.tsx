import React, { createContext, useEffect, useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import NewTask from './NewTask';
import Tasks from './Tasks';
import { Alert } from 'reactstrap';

//eslint-disable-next-line
export const TasksContext = createContext<any>({});

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [error, setError] = useState('');

  const reloadTasks = () => {
    fetch('http://127.0.0.1:4000/tasks/')
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks))
      .catch((error) => setError('Error: ' + error));
  };

  useEffect(() => {
    fetch('http://127.0.0.1:4000/tasks/')
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks))
      .catch((error) => setError('Error: ' + error));
  }, []);

  return (
    <TasksContext.Provider value={{ reloadTasks, tasks }}>
      {error && (
        <>
          <h1>Sorry :(</h1>
          <Alert color="danger">{error}</Alert>
        </>
      )}
      {tasks.length > 0 && <NewTask />}
      {tasks.length > 0 && <Tasks />}
    </TasksContext.Provider>
  );
}

export default App;
