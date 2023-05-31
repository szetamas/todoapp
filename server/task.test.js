const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const request = require('supertest');

const LOCALHOST = 'http://127.0.0.1';
const PORT = process.env.EXPRESSPORT;
const TASKS = '/tasks/';
const TASK = '/task/';
const TASKID = '1';

describe(`GET ${TASKS}`, () => {
  it('get all tasks', () => {
    request(`${LOCALHOST}:${PORT}`)
      .get(TASKS)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].id).toBeGreaterThan(0);
        expect(res.body[0].task.length).toBeGreaterThan(0);
      });
  });
});
describe(`GET ${TASK}${TASKID}`, () => {
  it('get the first task', () => {
    request(`${LOCALHOST}:${PORT}`)
      .get(`${TASK}${TASKID}`)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].id).toBeGreaterThan(0);
        expect(res.body[0].task.length).toBeGreaterThan(0);
      });
  });
});
describe(`GET ${TASK}${TASKID}`, () => {
  it('get the "a" task', () => {
    request(`${LOCALHOST}:${PORT}`)
      .get(`${TASK}a`)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res.status).toBe(400);
      });
  });
});
