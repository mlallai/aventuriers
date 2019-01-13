const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateForgotPasswordInput = (data) => {
  errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'L\'adresse e-mail n\'est pas valide';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Une adresse e-mail est obligatoire.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
} 