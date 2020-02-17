const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://tqllpteomwboyb:e3c93587ac0d814ce88f7e581805777c62b5cb9ab280ee0e1fe30548481e6c52@ec2-174-129-33-25.compute-1.amazonaws.com:5432/d9bbj8skuurfpq',
  ssl: {
    rejectUnauthorized: false,
  },  
});

async function verifyUser(username, password) {
  const admin = await pool.query('SELECT * FROM admins WHERE username=$1', [username]);
  if (!admin.rows.length) return false;
  var hash = crypto.pbkdf2Sync(password, admin.rows[0].salt, admin.rows[0].iterations, 64, 'sha512');
  return hash.toString('hex') == admin.rows[0].password;
}

/* GET home page. */
router.get('/customers', async function(req, res, next) {
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

router.post('/login', async function(req, res, next){
  if (await verifyUser(req.body.username, req.body.password)) {
    res.json({auth: true});
  } else {
    res.json({auth: false});
  }
});

router.post('/edituser', async function(req, res, next){
  await pool.query(
    {
      text: 'UPDATE students SET img=$1, reg=$2, waiver=$3, payment=$4, name=$5 WHERE username=$6',
      values: [req.body.img, req.body.reg, req.body.waiver, req.body.payment, req.body.name, req.body.username]
    });
  res.sendStatus(200);
});

module.exports = router;
