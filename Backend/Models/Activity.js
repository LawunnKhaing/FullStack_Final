const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
});

module.exports = mongoose.model('Activity', activitySchema);