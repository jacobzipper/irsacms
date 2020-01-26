const  express = require('express');
const router = express.Router();

const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})
/* GET home page. */
router.get('/', async function(req, res, next) {
  const students = await pool.query('SELECT * FROM STUDENTS');
  console.log(students.rows);
  res.json(students.rows);
});

/* GET profile page. */
router.get('/profile/:name', function(req, res, next) {
  res.render('profile', {name: req.params.name});
});

module.exports = router;
