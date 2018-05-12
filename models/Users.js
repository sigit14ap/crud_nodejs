var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
  name: String,
  position: String,
  updated_at: { type: Date, default: Date.now },
});
var User = mongoose.model('User', UsersSchema);
module.exports = User;