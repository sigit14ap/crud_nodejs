var mongoose = require("mongoose");
var Users = require('../models/Users.js');

var UsersController = {};

UsersController.list = function(req, res) {
    Users.find({}).exec(function (err, users) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/users/index", {users: users,title : 'Home'});
      }
    });
  };


  UsersController.create = function(req, res) {
    res.render("../views/users/create");
  };

  UsersController.save = function(req, res) {
    var users = new Users(req.body);
  
    users.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/users/create");
      } else {
        console.log("Successfully created an users.");
        res.redirect("/users/");
      }
    });
  };

  UsersController.edit = function(req, res) {
    Users.findOne({_id: req.params.id}).exec(function (err, users) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/users/edit", {users: users});
      }
    });
  };

  UsersController.update = function(req, res) {
    Users.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, users) {
      if (err) {
        console.log(err);
        res.render("../views/users/edit", {users: req.body});
      }
      res.redirect("/users/");
    });
  };

  UsersController.delete = function(req, res) {
    Users.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Users deleted!");
        res.redirect("/users");
      }
    });
  };

  module.exports = UsersController;