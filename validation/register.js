const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = 'Prénom entre 2 et 30 caractères';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Prénom requis"
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = 'Nom entre 2 et 30 caractères';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Nom requis"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email requis"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalide"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Mot de passe requis"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Le mot de passe doit comporter au moins 6 caractères"
    }

    // if (Validator.isEmpty(data.password2)) {
    //     errors.password2 = "Confirmation du mot de passe requise"
    // }

    // if (!Validator.equals(data.password,data.password2)) {
    //     errors.password2 = "Les mots de passe ne correspondent pas"
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}