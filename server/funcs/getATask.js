const { conMySQL } = require('./conMySQL.js');

function getATask(req, res) {
  let { id } = req.params;
  if (id === null || isNaN(id)) {
    res.status(400).send({ error: 'format of id is wrong' });
    return -1;
  }

  let sqlQuery = `SELECT * FROM todos
                  WHERE id = ?;`;
  conMySQL.query(sqlQuery, id, (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'error' });
      return -1;
    }

    if (rows.length < 1) {
      res.status(400).send({ error: 'wrong id' });
    }
    res.status(200).send(rows);
    return 1;
  });
}

module.exports = { getATask };
