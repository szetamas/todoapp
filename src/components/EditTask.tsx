import React, { useState } from 'react';
import { TasksContext } from './App';
import { TaskInterface } from '../interfaces/TaskInterface';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Alert,
} from 'reactstrap';

type EditTaskType = {
  actTask: TaskInterface;
  isOpen: boolean;
  onClose: any;
};

function EditTask({ actTask, isOpen, onClose }: EditTaskType) {
  const [error, setError] = useState('');
  const [editedTask, setEditedTask] = useState<TaskInterface>({
    id: actTask.id,
    task: actTask.task,
    note: actTask.note,
    important: actTask.important,
    done: actTask.done,
  });

  //eslint-disable-next-line
  const modifyTask = (reloadTasks: any) => {
    if (editedTask.task.length < 1 || editedTask.task.length > 100) {
      setError('Task name length must be between 1 and 100 characters.');
      return -1;
    }
    fetch('http://127.0.0.1:4000/task/' + editedTask.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: editedTask.done,
        task: editedTask.task,
        note: editedTask.note,
        important: editedTask.important,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError('Error: ' + res.error);
        } else {
          setError('');
          onClose();
          reloadTasks();
        }
      })
      .catch((er) => {
        setError('Error: ' + er);
      });
  };

  //eslint-disable-next-line
  const deleteTask = (reloadTasks: any) => {
    fetch('http://127.0.0.1:4000/task/' + editedTask.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError('Error: ' + res.error);
        } else {
          setError('');
          onClose();
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
        <Modal isOpen={isOpen} toggle={onClose}>
          <ModalHeader toggle={onClose}>Edit #{editedTask.id} task</ModalHeader>
          <ModalBody>
            <Form method="post">
              <FormGroup>
                Done:{' '}
                <Input
                  id="done"
                  type="checkbox"
                  checked={editedTask.done}
                  onChange={() => {
                    setEditedTask({
                      ...editedTask,
                      done: !editedTask.done,
                    });
                  }}
                />
                <Input
                  id="task"
                  placeholder="Task..."
                  value={editedTask.task}
                  onChange={(ev) =>
                    setEditedTask({ ...editedTask, task: ev.target.value })
                  }
                />
                Important:{' '}
                <Input
                  id="important"
                  type="checkbox"
                  checked={editedTask.important}
                  onChange={() => {
                    setEditedTask({
                      ...editedTask,
                      important: !editedTask.important,
                    });
                  }}
                />
                <Input
                  id="note"
                  type="textarea"
                  placeholder="Note..."
                  value={editedTask.note}
                  onChange={(ev) =>
                    setEditedTask({ ...editedTask, note: ev.target.value })
                  }
                />
              </FormGroup>
              {error !== '' ? <Alert color="danger">{error}</Alert> : ''}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                modifyTask(reloadTasks);
              }}
            >
              Update
            </Button>
            <Button
              color="danger"
              onClick={() => {
                deleteTask(reloadTasks);
              }}
            >
              Delete
            </Button>
            <Button color="warning" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </TasksContext.Consumer>
  );
}

export default EditTask;
