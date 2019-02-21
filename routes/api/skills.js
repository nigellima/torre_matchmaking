const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Job model
const Skill = require('../../models/Skill');

router.get('/test', (req, res) => res.json({ msg: 'Kills Works' }));

// @route   GET api/skills
// @desc    Get matched skills
// @access  Public
router.get('/:value', (req, res) => {
  
  Skill.find( { 'name' : { '$regex' : req.params.value, '$options' : 'i' } } )
    .then(skills => {
      res.json(skills);
    })
    .catch(err =>
      res.status(404).json({ noskillsfound: 'No skills found' })
    );
});

module.exports = router;
