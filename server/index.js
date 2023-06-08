const cors = require('cors');
const express = require('express');
const { listTasks } = require('./funcs/listTasks.js');
const { getTask } = require('./funcs/getTask.js');
const { addTask } = require('./funcs/addTask.js');
const { updateTask } = require('./funcs/updateTask.js');
const { deleteTask } = require('./funcs/deleteTask.js');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/tasks/', listTasks);
server.get('/task/:id', getTask);
server.post('/task/', addTask);
server.patch('/task/:id', updateTask);
server.delete('/task/:id', deleteTask);

server.listen(process.env.EXPRESSPORT, () => {
  console.log(`Server is running on ${process.env.EXPRESSPORT}`);
});
