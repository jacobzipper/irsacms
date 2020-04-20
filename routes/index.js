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

function hashPassword(password) {
  var salt = crypto.randomBytes(128).toString('base64');
  var iterations = 10000;
  var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');

  return {
      salt: salt,
      hash: hash.toString('hex')
  };
}

async function verifyAdmin(username, password) {
  const admin = await pool.query('SELECT * FROM admins WHERE username=$1', [username]);
  if (!admin.rows.length) return false;
  var hash = crypto.pbkdf2Sync(password, admin.rows[0].salt, 10000, 64, 'sha512');
  return hash.toString('hex') == admin.rows[0].password;
}

async function verifyUser(username, password) {
  const student = await pool.query('SELECT * FROM students WHERE username=$1', [username]);
  if (!student.rows.length) return false;
  var hash = crypto.pbkdf2Sync(password, student.rows[0].salt, 10000, 64, 'sha512');
  return hash.toString('hex') == student.rows[0].password;
}

/* GET home page. */
router.get('/customers', async function(req, res, next) {
  const students = await pool.query('SELECT * from students');
  
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

router.post('/deleteuser', async function(req, res, next) {
  const student = await pool.query(
    {
      text: 'DELETE FROM STUDENTS WHERE username=$1',
      values: [req.body.username]
    });
  res.status(200);
});

router.post('/login', async function(req, res, next){
  if (await verifyAdmin(req.body.username, req.body.password)) {
    res.json({auth: true, userType: "admin"});
  } else {
    if(await verifyUser(req.body.username, req.body.password)) {
      res.json({auth: true, userType: "user"});
    } else {
      res.json({auth: false, userType: ""});
    }
    
  }
});

router.post('/edituser', async function(req, res, next) {
  console.log("req.files.waiver:");
  // console.log(req.files.waiver) <- undefined, breaks code
  if (true || req.files.waiver) {
    await pool.query({
      text: 'UPDATE students SET waiverbytes=$1, waiver=$2, payment=$3, name=$4, email=$5 WHERE username=$6',
      values: [req.body.waiverbytes, req.body.waiver, req.body.payment, req.body.name, req.body.email, req.body.username]
    });
  } else {
    await pool.query({
      text: 'UPDATE students SET waiver=$1, payment=$2, name=$3, email=$4 WHERE username=$5',
      values: [req.body.waiver, req.body.payment, req.body.name, req.body.email, req.body.username]
    });
  }
  res.sendStatus(200);
});

router.post('/registration', async (req, res, next) => {
  
  if (!req.body.username) {
    res.status(400).json({error: 1001, msg: 'Username not provided'});
    return;
  }
  if (!req.body.password) {
    res.status(400).json({error: 1002, msg: 'Password not provided'});
    return;
  }

  // Check if Username taken
  var taken = await pool.query('SELECT * FROM students WHERE username = $1 ', [req.body.username]);
  if (taken.rows.length > 0) {
    res.status(400).json({error: 1003, msg: 'Username taken please choose another'});
    return;
  }

  var pass = hashPassword(req.body.password);

  var reg = await pool.query('INSERT INTO students (username, password, salt, email, name)' +
    ' VALUES ($1, $2, $3, $4, $5)',
    [req.body.username, pass.hash, pass.salt, req.body.email,
    req.body.name]);

  res.status(200).json({error: 0, msg: 'We gucci'});
});

router.post('/attendance', async function(req, res, next){
  const date = new Date().toISOString();
  for(var i = 0; i < req.body.students.length; i++) {
    try {
    await pool.query(
      {
        text: 'UPDATE students SET attendance=(SELECT attendance FROM students WHERE username=$1) + 1 WHERE username=$2',
        values: [req.body.students[i], req.body.students[i]]
      });
    } catch (error) {
      // do nothing
    }
  }
  
  res.sendStatus(200);
});

router.post('/studentattendance', async function(req, res, next){
  const code = crypto.createHash('md5').update(new Date().toLocaleString().split(',')[0]).digest("hex").substring(0, 4);
  console.log(code);
  if (req.body.code == code) {
    try {
      await pool.query({
        text: 'UPDATE students SET attendance=(SELECT attendance FROM students WHERE username=$1) + 1 WHERE username=$2',
        values: [req.body.username, req.body.username]
      });
      res.status(200).json({error: 0, msg: 'We gucci'});
    } catch (error) {
      // do nothing
    }
  } else {
    res.status(200).json({error: 1, msg: 'Bad code'});
  }
});

module.exports = router;
