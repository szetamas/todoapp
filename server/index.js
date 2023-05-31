const cors = require('cors');
const express = require('express');
const { listTasks } = require('./funcs/listTasks.js');
const { getATask } = require('./funcs/getATask.js');

const server = express();
server.use(express.json());
server.use(cors());

server.get('/tasks/', listTasks);
server.get('/task/:id', getATask);

server.listen(process.env.EXPRESSPORT, () => {
  console.log(`Server is running on ${process.env.EXPRESSPORT}`);
});
