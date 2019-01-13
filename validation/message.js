const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
    let errors = {};

    // Only Text is mandatory
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, {min: 10, max: 300}))
        errors.text = 'Votre message doit contenir entre 10 et 300 caractères';

    if (Validator.isEmpty(data.text)) {
        errors.text = "Vous n'avez pas saisi de message !"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}