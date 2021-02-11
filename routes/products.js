// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/edit', productsController.edit); 

router.get('/:id', productsController.detail); 

//create one product
router.get("/create",productsController.create);
router.post('/', productsController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id?_method=PUT', productsController.update); 


  





/*** EDIT ONE PRODUCT ***/ 
//router.get('/:id/edit', productsController.edit); 
//router.put('/:id', productsController.update); 

//*
/*** DELETE ONE PRODUCT***/ 
// router.???('/:id', productsController.destroy); 


module.exports = router;
