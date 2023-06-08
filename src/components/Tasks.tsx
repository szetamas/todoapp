import React, { useState } from 'react';
import { TasksContext } from './App';
import { TaskInterface } from '../interfaces/TaskInterface';
import EditTask from './EditTask';
import {
  Alert,
  Badge,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

function Tasks() {
  const [error, setError] = useState('');
  //eslint-disable-next-line
  const [editedTaskIdIsOpen, setEditedTaskIdIsOpen]: any = useState(null);

  //eslint-disable-next-line
  const openEditTask = (ev: any, editedTaskId: number) => {
    if (ev.target.type === 'checkbox') {
      return -1;
    } else {
      setEditedTaskIdIsOpen(editedTaskId);
    }
  };

  const closeEditTask = () => {
    setEditedTaskIdIsOpen(null);
  };

  //eslint-disable-next-line
  const changeDone = (task: TaskInterface, reloadTasks: any) => {
    fetch('http://127.0.0.1:4000/task/' + task.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: task.task,
        note: task.note,
        important: task.important,
        done: !task.done,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError('Error: ' + res.error);
        } else {
          reloadTasks();
        }
      })
      .catch((er) => {
        setError('Error: ' + er);
      });
  };

  return (
    <TasksContext.Consumer>
      {({ reloadTasks, tasks }) => (
        <>
          {error && <Alert color="danger">{error}</Alert>}
          {tasks.map((actTask: TaskInterface) => (
            <ListGroup
              key={actTask.id}
              title="double click on task to edit"
              onDoubleClick={(ev) => {
                openEditTask(ev, actTask.id);
              }}
            >
              {' '}
              <EditTask
                actTask={actTask}
                isOpen={editedTaskIdIsOpen === actTask.id}
                onClose={closeEditTask}
              />
              <ListGroupItem
                color={
                  actTask.done
                    ? 'succes'
                    : actTask.important
                    ? 'danger'
                    : 'info'
                }
              >
                <ListGroupItemHeading>
                  <Input
                    type="checkbox"
                    checked={actTask.done}
                    onClick={() => {
                      changeDone(actTask, reloadTasks);
                    }}
                  />{' '}
                  #{actTask.id} {actTask.task}{' '}
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
            </ListGroup>
          ))}
        </>
      )}
    </TasksContext.Consumer>
  );
}

export default Tasks;
