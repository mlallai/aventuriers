
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateResetPasswordInput = (data) => {
  errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.verifyPassword = !isEmpty(data.verifyPassword) ? data.verifyPassword : '';

  if(!Validator.isLength(data.password, { min: 6, max: undefined })) {
    errors.password = 'Votre mot de passe doit contenir au moins 6 caractères. Merci de réessayer.'
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Un mot de passe est obligatoire.';
  }

  if(!Validator.isLength(data.verifyPassword, { min: 6, max: undefined })) {
    errors.verifyPassword = 'Votre mot de passe doit contenir au moins 6 caractères. Merci de réessayer.'
  }

  if(Validator.isEmpty(data.verifyPassword)) {
    errors.verifyPassword = 'La confirmation du mot de passe est obligatoire.';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
} 