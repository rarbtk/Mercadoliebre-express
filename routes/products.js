// ************ Require's ************
const express = require('express');
const router = express.Router();
let multer = require("multer");
let path = require("path");



//multer ************************
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 
router.get('/edit', productsController.edit); 


//create one product
router.get("/create",productsController.create);
router.post('/', upload.any() , productsController.store);

router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.update); 
/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id?_method=DELETE', productsController.destroy); 
  





/*** EDIT ONE PRODUCT ***/ 
//router.get('/:id/edit', productsController.edit); 
//router.put('/:id', productsController.update); 

//*
/*** DELETE ONE PRODUCT***/ 
// router.???('/:id', productsController.destroy); 


module.exports = router;
