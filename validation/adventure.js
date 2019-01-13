const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdventureInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.mainActivity = !isEmpty(data.mainActivity) ? data.mainActivity : '';
    data.summary = !isEmpty(data.summary) ? data.summary : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    // data.duration = !isEmpty(data.duration) ? data.duration : '';

    
    if (!Validator.isLength (data.summary, { max: 1000 })) {
        errors.summary = 'La description de l\'activité doit faire au maximum 1000 caractères'
    }
    if (!Validator.isLength (data.title, { min: 10, max: 50 })) {
        errors.title = 'Le titre de l\'activité doit faire entre 10 et 50 caractères'
    }
    // if (Validator.isEmpty (data.title)) {
    //     errors.title = 'Titre requis'
    // }
    if (Validator.isEmpty (data.mainActivity)) {
        errors.mainActivity = 'Activité requise'
    }
    if (Validator.isEmpty (data.level)) {
        errors.level = 'Niveau requis'
    }
    // if (Validator.isEmpty (data.location)) {
    //     errors.location = 'Saisissez le lieu de l\'activité'
    // }
    if (isEmpty(data.location)) {
        errors.location = 'Saisissez le lieu de l\'activité';
    }

    if (!Validator.isNumeric(data.duration) && !Validator.isEmpty(data.duration)) {
        errors.duration = 'Saisissez la durée en nombre de jours'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}