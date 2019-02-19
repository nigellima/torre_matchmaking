const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SkillSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = Skill = mongoose.model('skills', SkillSchema);
