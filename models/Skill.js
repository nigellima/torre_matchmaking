const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = Skill = mongoose.model('skills', SkillSchema);
