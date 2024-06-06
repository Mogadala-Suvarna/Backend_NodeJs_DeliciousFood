//to save details of vendor in databse we use vendororutes

const vendorController = require('../controllers/vendorController');
const express = require('express');
const router = express.Router(); //to create route we want router
router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);

router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:id',vendorController.getVendorById);

module.exports= router;