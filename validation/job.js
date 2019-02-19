const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateJobInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : '';
  data.tite = !isEmpty(data.tite) ? data.tite : '';

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (Validator.isEmpty(data.tite)) {
    errors.tite = 'Title field is required';
  }

  if (Validator.isEmpty(data.required_skills)) {
    errors.required_skills = 'Skills list is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
