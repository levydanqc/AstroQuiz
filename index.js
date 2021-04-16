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
  /** @type {Object} Saisi du prénom. */
  const fname = document.getElementById('fname');
  /** @type {Object} Saisi du nom de famille. */
  const lname = document.getElementById('lname');
  /** @type {Object} Saisi de la date de naissance. */
  const birth = document.getElementById('birth');
  /** @type {Object} Saisi du status. */
  const status = document.getElementById('status');

  errors.push(CheckText(fname));
  errors.push(CheckText(lname));
  errors.push(CheckDate(birth));
  errors.push(CheckEmpty(birth));

  errors.filter((x) => x != null);
}

function CheckText(champs) {
  const text = document.querySelector(`label[for=${champs.name}]`).textContent;
  if (champs.value === '') {
    return `Le champs ${text} ne peux être vide.`;
  }
  if (!/[^a-zA-Z]/.test(champs.value)) {
    return `Le champs ${text} ne peux contenir des caractères autres que des lettres.`;
  }
  return undefined;
}

function IsNumber(e) {
  if (/Digit|Delete|Backspace|Arrow/.test(e.code)) {
    return true;
  }
  return false;
}

function DateNaissance(input, e) {
  const champs = document.getElementById(input.id);
  const { length } = champs.value;
  const deleting = e.inputType.includes('delete');
  if ((length === 5 || length === 2) && !deleting) {
    champs.value += '/';
  }
}

function CheckDate(champs) {

}

function CheckEmpty(champs) {
  
}