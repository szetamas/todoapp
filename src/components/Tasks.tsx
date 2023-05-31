import React, { useEffect, useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import {
  Badge,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

function Tasks() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/tasks/')
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  return (
    <ListGroup>
      {tasks.map((actTask) => (
        <ListGroupItem
          key={actTask.id}
          color={
            actTask.done ? 'succes' : actTask.important ? 'danger' : 'info'
          }
        >
          <ListGroupItemHeading>
            <Input type="checkbox" checked={actTask.done} /> #{actTask.id}{' '}
            {actTask.task}{' '}
            {actTask.important ? (
              <Badge color="danger" pill>
                IMPORTANT
              </Badge>
            ) : (
              ''
            )}{' '}
          </ListGroupItemHeading>
          <ListGroupItemText>{actTask.note}</ListGroupItemText>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default Tasks;
