var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Add a new route to /hello
router.get('/hello', function(req, res, next) {
  res.render('hello');
});

module.exports = router;

