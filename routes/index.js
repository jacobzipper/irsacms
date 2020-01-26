const  express = require('express');
const router = express.Router();

const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://tqllpteomwboyb:e3c93587ac0d814ce88f7e581805777c62b5cb9ab280ee0e1fe30548481e6c52@ec2-174-129-33-25.compute-1.amazonaws.com:5432/d9bbj8skuurfpq',
  ssl: true,
})
/* GET home page. */
router.get('/', async function(req, res, next) {
  const students = await pool.query('SELECT * FROM STUDENTS');
  res.json(students.rows);
});

/* GET profile page. */
router.get('/profile/:name', async function(req, res, next) {
  const student = await pool.query(
    {
      text: 'SELECT * FROM STUDENTS WHERE name=$1',
      values: [req.params.name]
    });
  res.json(student.rows[0]);
});

module.exports = router;
