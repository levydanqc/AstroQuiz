/* eslint-disable strict */

'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable strict */
/* eslint-disable no-console */

document.forms.infos.addEventListener('submit', Validation);

/**
 * Permet la validation du formulaire.
 */
function Validation() {
  /** @type {Array} Enregistre les messages d'erreurs. */
  const errors = [];
  /** @type {Object} Saisie du prénom. */
  const fname = document.getElementById('fname');
  /** @type {Object} Saisie du nom de famille. */
  const lname = document.getElementById('lname');
  /** @type {Object} Saisie de la date de naissance. */
  const birth = document.getElementById('birth');
  /** @type {Object} Saisie du status. */
  const status = document.getElementById('status');

  // Ajoute au vecteur d'erreurs les messages de chaque champs.
  errors.push(CheckText(fname));
  errors.push(CheckText(lname));
  errors.push(CheckDate(birth));
  // errors.push(CheckEmpty(birth));

  // Nettoie le vecteur de toute valeure null ou undefined.
  errors.filter((x) => x != null);
}

/**
 * Valide la saisie de texte.
 *
 * @param {Object} champs Champs de saisie sur lequel on veut appliquer la validation.
 * @return {String} Le message d'erreur correspondant ou dans le cas échant undefined.
 */
function CheckText(champs) {
  const label = document.querySelector(`label[for=${champs.name}]`).textContent;
  if (champs.value === '') {
    return `Le champs ${label} ne peux être vide.`;
  }
  if (!/[^a-zA-Z]/.test(champs.value)) {
    return `Le champs ${label} ne peux contenir des caractères autres que des lettres.`;
  }
  return undefined;
}

/**
 * Valide la saisie d'un chiffre ou d'une touche spéciale
 * en comparant son code avec certains termes.
 *
 * @param {Event} e Évènement lors de la saisie d'un caractère.
 * @return {Boolean} Vrai si le caractère est valide, faux autrement.
 */
function IsNumber(e) {
  if (/Digit|Delete|Backspace|Arrow/.test(e.code)) {
    return true;
  }
  return false;
}

/**
 * Mise en forme de la saisie de la date de naissance en ajoutant
 * des barres obliques.
 *
 * @param {Object} input Champs de la date de naissance.
 * @param {Event} e Évènement lors de la saisie d'un caractère.
 */
function DateNaissance(input, e) {
  const champs = document.getElementById(input.id);
  const { length } = champs.value;
  const deleting = e.inputType.includes('delete');
  if ((length === 5 || length === 2) && !deleting) {
    champs.value += '/';
  }
}

/**
 * Validation de la date.
 * La date doit être inférieur à aujourd'hui, l'année, le mois
 * et le jour doivent être valide et le mois de février doit correspondre
 * aux années bissextiles.
 *
 * @param {Object} champs Champs de la date.
 * @return {String} Message d'erreur correspondant.
 */
function CheckDate(champs) {
  const rawDate = champs.value;
  if (!/^(\d\d)[/](\d\d)[/](\d{4})$/.test(rawDate)) {
    return 'Le format de la date est incorrect.';
  }
  const date = champs.value.split('/');
  for (let i = 0; i < date.length; i += 1) date[i] = +date[i];
  const [jour, mois, annee] = date;
  const ajd = new Date();
  const ajdAnnee = ajd.getFullYear();
  const ajdMois = ajd.getMonth() + 1;
  const ajdJour = ajd.getDate();
  if (annee > ajdAnnee) {
    return 'L\'année de naissance ne peut être dans le futur.';
  }
  if (annee === ajdAnnee && mois > ajdMois) {
    return 'Le mois de naissance ne peut être dans le futur.';
  }
  if (annee === ajdAnnee && mois === ajdMois && jour > ajdJour) {
    return 'Le jour de naissance ne peut être dans le futur.';
  }
  if (mois < 1 || mois > 12) {
    return 'Le mois de naissance doit être comprit entre 1 et 12.';
  }
  if (jour < 1 || jour > 31) {
    return 'Le jour de naissance doit être comprit entre 1 et 31.';
  }
  if (jour === 31 && [4, 6, 9, 11].includes(mois)) {
    return 'Le mois de naissance ne contient pas 31 jours.';
  }
  if (mois === 2) { // Vérification d'une année bissextile
    const estBissextile = annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0);
    if (jour > 29 || (jour === 29 && !estBissextile)) {
      return 'Le jour de naissance est invalide pour le mois de février.';
    }
  }

  return undefined;
}

// function CheckEmpty(champs) {

// }
