const mongoose = require('mongoose');

module.exports = mongoose.model('Doctor', new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
}
}));
