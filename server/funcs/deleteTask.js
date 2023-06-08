const { conMySQL } = require('./conMySQL.js');

function deleteTask(req, res) {
  let actTaskId = req.params.id;
  if (actTaskId === null || actTaskId < 1 || isNaN(actTaskId)) {
    res.status(400).send({ error: 'task id is wrong' });
    return -1;
  }
  let sqlQuery = `DELETE FROM todos WHERE id = ${actTaskId};`;
  conMySQL.query(sqlQuery, (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'error' });
      return -1;
    }

    if (rows.affectedRows !== 1) {
      res.status(500).send({ error: 'error' });
    }
    res.status(200).send({ deletedItems: rows.affectedRows });
    return 1;
  });
}

module.exports = { deleteTask };
