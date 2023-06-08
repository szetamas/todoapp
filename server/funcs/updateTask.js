const { conMySQL } = require('./conMySQL.js');

function updateTask(req, res) {
  let actTask = req.body;
  if (
    actTask.task === null ||
    actTask.task.length < 1 ||
    actTask.task.length > 100 ||
    (actTask.note !== null && actTask.note.length > 300)
  ) {
    res.status(400).send({ error: 'task is wrong' });
    return -1;
  }
  let sqlQuery = `UPDATE todos SET ? WHERE id = ${req.params.id};`;
  conMySQL.query(sqlQuery, actTask, (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'error' });
      return -1;
    }

    if (rows.length < 1) {
      res.status(500).send({ error: 'error' });
    }
    res.status(200).send({ id: rows.insertId });
    return 1;
  });
}

module.exports = { updateTask };
