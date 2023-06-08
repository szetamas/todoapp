import React, { useState } from 'react';
import { TasksContext } from './App';
import { TaskInterface } from '../interfaces/TaskInterface';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

function NewTask() {
  const [error, setError] = useState('');
  const [task, setTask] = useState<TaskInterface>({
    id: 0,
    task: '',
    note: '',
    important: false,
    done: false,
  });

  //eslint-disable-next-line
  const handleSubmit = (ev: any, reloadTasks: any) => {
    ev.preventDefault();
    if (task.task.length < 1 || task.task.length > 100) {
      setError('Task name length must be between 1 and 100 characters.');
      return -1;
    }
    //TODO: URL IS A CONST
    fetch('http://127.0.0.1:4000/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: task.task,
        note: task.note,
        important: task.important,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError('Error: ' + res.error);
        } else {
          setError('');
          setTask({
            id: 0,
            task: '',
            note: '',
            important: false,
            done: false,
          });
          reloadTasks();
        }
      })
      .catch((er) => {
        setError('Error: ' + er);
      });
  };

  return (
    <TasksContext.Consumer>
      {({ reloadTasks }) => (
        <Form
          method="post"
          onSubmit={(ev) => {
            handleSubmit(ev, reloadTasks);
          }}
        >
          {/*form submit is handled by a function,
          but if somewhy react doesnt work properly,
          i dont want send form with 'get' method*/}
          <FormGroup row>
            <InputGroup>
              <Input
                id="task"
                placeholder="Task..."
                value={task.task}
                onChange={(ev) => {
                  setTask({ ...task, task: ev.target.value });
                }}
              />
              <InputGroupText>
                Important:
                <Input
                  id="important"
                  type="checkbox"
                  checked={task.important}
                  onChange={() => {
                    setTask({
                      ...task,
                      important: !task.important,
                    });
                  }}
                />
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          <FormGroup row>
            <InputGroup>
              <Input
                id="note"
                type="textarea"
                placeholder="Note..."
                value={task.note}
                onChange={(ev) => {
                  setTask({ ...task, note: ev.target.value });
                }}
              />
              <Button type="submit" color="primary">
                ADD
              </Button>
            </InputGroup>
          </FormGroup>
          {error !== '' ? <Alert color="warning">{error}</Alert> : ''}
        </Form>
      )}
    </TasksContext.Consumer>
  );
}

export default NewTask;
