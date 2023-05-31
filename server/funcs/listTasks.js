const { conMySQL } = require('./conMySQL.js');

function listTasks(req, res) {
  let sqlQuery = `SELECT * FROM todos`;
  conMySQL.query(sqlQuery, (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'error' });
      return -1;
    }
    res.status(200).send(rows);
    return 1;
  });
}

module.exports = { listTasks };
