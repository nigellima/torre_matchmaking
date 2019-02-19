const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Job model
const Job = require('../../models/Job');

// Validation
const validateJobInput = require('../../validation/job');

// @route   POST api/jobs
// @desc    Create Job
// @access  Private
router.post('/', (req, res) => {
    const { errors, isValid } = validateJobInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    
    const newJob = new Job({
      description: req.body.description,
      tite: req.body.tite,
      contract_type: req.body.contract_type,
    });

    newJob.save().then(job => res.json(job));
  }
);

module.exports = router;
