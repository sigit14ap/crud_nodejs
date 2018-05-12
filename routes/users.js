var express = require('express');
var router = express.Router();
var users = require("../controller/UsersController.js");

// Get all userss
router.get('/', users.list);

// Create users
router.get('/create', users.create);

// Save users
router.post('/save', users.save);

// Edit users
router.get('/edit/:id', users.edit);

// Edit update
router.post('/update/:id', users.update);

// Edit update
router.post('/delete/:id', users.delete);

module.exports = router;