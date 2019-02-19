const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  tite: {
    type: String,
    required: true
  },
  contract_type: {
    type: String,
    required: true
  },
  required_skills: [
    {
      skill: {
        type: Schema.Types.ObjectId,
        ref: 'skills'
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Job = mongoose.model('jobs', JobSchema);
