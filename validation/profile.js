const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.desc = !isEmpty(data.desc) ? data.desc : '';
    data.sports = !isEmpty(data.sports) ? data.sports : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.age = !isEmpty(data.age) ? data.age : '';

    if (!Validator.isLength (data.desc, { min: 10, max: 300 })) {
        errors.desc = 'Votre description doit faire entre 10 et 300 caractères'
    }

    if (Validator.isEmpty (data.location)) {
        errors.location = 'Lieu d\'habitation requis'
    }

    // if (
    //     // !Validator.isNumeric(data.age) && 
    //      !Validator.isEmpty(data.age)) {
    //     errors.age = 'Saisissez un nombre'
    // }

    // if (Validator.isEmpty (data.sports)) {
    //     errors.sports = 'Saisissez au moins un sport outdoor favori'
    // }

    if(!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}