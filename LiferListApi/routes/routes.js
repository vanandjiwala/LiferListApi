var express = require('express');
var router = express.Router();

const LiferlistController = require('./../controllers/LiferlistController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json({"name":"Test API"});
});


router.get('/getAllLifers', LiferlistController.getAllLifers);    
router.get('/getAllLifers/:lifer_id', LiferlistController.getLifer);

module.exports = router;
