const mongoose = require('mongoose');
const fetch = require('node-fetch')

// Skill model
const Skill = require('../models/Skill');

const initSkillsFromProfiles = async () => {

  // Connect to MongoDB
  mongoose
  .connect(require('../config/keys').mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  let allSkills = [];
  let people = null;
  try {
    people = await fetch('https://torre.bio/api/people')
                        .then(response => response.json()) 
  } catch (error) {
    console.log(error);
  }
  
  if(people){
    await people.map(async p => {
      try {
        const profile = await fetch('https://torre.bio/api/bios/'+p.publicId).then(response => response.json());
        if(profile){
          profile.strengths.map(async skill => {
            Skill.findOne({code: skill.code})
              .then(s => {
                if(s === undefined || s === null){
                  const newSkill = new Skill({
                    code: skill.code,
                    name: skill.name
                  });
                  newSkill.save().then(res => console.log(res));
                }
              });
          });
        }
      } catch (error) {
        console.log(error)
      }
    });
  }
}

initSkillsFromProfiles();