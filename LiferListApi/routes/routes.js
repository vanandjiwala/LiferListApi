var express = require('express');
var router = express.Router();

const LiferlistController = require('./../controllers/LiferlistController');
const CategoryController = require('./../controllers/CategoryController');
const SpeciesController = require('./../controllers/SpeciesController');

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

//Species APIs
router.post('/species', SpeciesController.addSpecies); //C
router.get('/species', SpeciesController.getAllSpecies); //R
router.put('/species/:speciesName', SpeciesController.updateSpecies); //U
router.delete('/species/:speciesName', SpeciesController.deleteSpecies); //D

module.exports = router;
