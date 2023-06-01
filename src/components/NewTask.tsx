import React, { useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        setError('');
        setTask({
          id: 0,
          task: '',
          note: '',
          important: false,
          done: false,
        });
      })
      .catch((er) => {
        setError('Error: ' + er);
      });
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      {/*form submit is handled by a function,
      but if somewhy react doesnt work properly,
      i dont want send form with 'get' method*/}
      <FormGroup row>
        <InputGroup>
          <Input
            id="task"
            placeholder="Task..."
            value={task.task}
            onChange={(e) => setTask({ ...task, task: e.target.value })}
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
            onChange={(e) => setTask({ ...task, note: e.target.value })}
          />
          <Button type="submit" color="primary">
            ADD
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}

export default NewTask;
