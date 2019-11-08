var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET profile page. */
router.get('/profile/:name', function(req, res, next) {
  res.render('profile', {name: req.params.name});
});

module.exports = router;
