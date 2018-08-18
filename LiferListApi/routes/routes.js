var express = require('express');
var router = express.Router();

const LiferlistController = require('./../controllers/LiferlistController');
const CategoryController = require('./../controllers/CategoryController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json({"name":"Test API"});
});

//Lifer APIs
router.get('/getAllLifers', LiferlistController.getAllLifers);


//Category APIs
router.post('/category', CategoryController.addCategory); //C
router.get('/categories', CategoryController.getAllCategories); //R
router.put('/category/:categoryName', CategoryController.updateCategory); //U
router.delete('/category/:categoryName', CategoryController.deleteCategory); //D


module.exports = router;
