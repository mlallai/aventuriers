const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdventureCommentInput(data) {
    let errors = {};

    // Only Text is mandatory
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, {min: 10, max: 300}))
        errors.text = 'Comment must be between 1 and 300 characters';

    if (Validator.isEmpty(data.text)) {
        errors.text = "Comment field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}