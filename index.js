/* eslint-disable strict */

'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable strict */
/* eslint-disable no-console */

document.formulaire.addEventListener('submit', Validation);
const choix = document.getElementsByName('choix');
choix.forEach((radio) => {
  radio.addEventListener('change', SelectionnerChoix);
});

const utilisateur = {};

/**
 * Permet la validation du formulaire.
 */
function Validation(e) {
  const form = document.getElementById('form');
  const estDisplay = !form.className.includes('d-none');

  // Vrai si le formulaire est à valider
  if (estDisplay) {
    /** @type {Array} Enregistre les messages d'erreurs, les labels et les saisis. */
    const errors = [];
    const inputs = document.formulaire.getElementsByClassName('form-control');

    // Ajouter les messages d'erreurs au vecteur après validation.
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      if (input.name === 'naissance') {
        const validation = CheckDate(input);
        if (validation) {
          errors.push(validation);
        }
      } else {
        const validation = CheckText(input);
        if (validation) {
          errors.push(validation);
        }
      }
    }

    // Retire les anciens messages d'erreurs.
    const lastList = document.getElementById('erreurs');
    const lastLabels = document.getElementsByClassName('erreur');
    if (lastList) {
      lastList.remove();
    }
    if (lastLabels.length) {
      while (lastLabels.length) {
        lastLabels[0].remove();
      }
    }

    // Vrai, si le vecteur contient des messages d'erreurs.
    if (errors.length) {
      const liste = document.createElement('ol');
      liste.id = 'erreurs';
      for (let i = 0; i < errors.length; i += 1) {
        const [error, label] = errors[i];
        // On ajoute le message d'erreurs à la liste récapitulative
        const li = document.createElement('li');
        const message = document.createTextNode(error);
        li.appendChild(message);
        liste.appendChild(li);

        // On ajout le message à chaque saisie après le label
        const errorLabel = document.createElement('label');
        errorLabel.setAttribute('for', `${label.attributes.for}`);
        errorLabel.classList.add('erreur');
        errorLabel.textContent = error;
        const icon = document.createElement('img');
        icon.src = './assets/warning.svg';
        const errorInfo = document.createElement('div');
        errorInfo.classList.add('d-flex', 'align-items-center');
        errorInfo.appendChild(icon);
        errorInfo.appendChild(errorLabel);
        label.parentElement.insertBefore(errorInfo, label.nextSibling);
      }
      document.getElementById('liste-erreurs').append(liste);
    } else {
      for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        const { name } = input;
        utilisateur.name = input.value;
      }
      CreerQuiz();
    }
  } else {
    // Faux si le quiz est à valider
  }

  e.preventDefault();
}

/**
 * Valide la saisie de texte.
 *
 * @param {Object} champs Champs de saisie sur lequel on veut appliquer la validation.
 * @return {String} Le message d'erreur correspondant ou dans le cas échant undefined.
 */
function CheckText(input) {
  if (input.value === '') {
    const label = GetLabel(input);
    return [`Le champs ${label.textContent} ne peux être vide.`, label];
  }
  if (/[^a-zA-Z]/.test(input.value)) {
    const label = GetLabel(input);
    return [`Le champs ${label.textContent} ne peux contenir des caractères autres que des lettres.`, label];
  }
}

/**
 * Validation de la date.
 * La date doit être inférieur à aujourd'hui, l'année, le mois
 * et le jour doivent être valide et le mois de février doit correspondre
 * aux années bissextiles.
 *
 * @param {Object} input Champs de la date.
 * @return {String} Message d'erreur correspondant.
 */
function CheckDate(input) {
  const rawDate = input.value;
  if (rawDate === '') {
    const label = GetLabel(input);
    return [`Le champs ${label.textContent} ne peut être vide.`, label];
  }
  if (!/^(\d\d)[/](\d\d)[/](\d{4})$/.test(rawDate)) {
    const label = GetLabel(input);
    return [`Le format de ${label.textContent} est incorrect.`, label];
  }
  const date = input.value.split('/');
  for (let i = 0; i < date.length; i += 1) date[i] = +date[i];
  const [jour, mois, annee] = date;
  const ajd = new Date();
  const ajdAnnee = ajd.getFullYear();
  const ajdMois = ajd.getMonth() + 1;
  const ajdJour = ajd.getDate();
  if (annee < 1900) {
    const label = GetLabel(input);
    return ['L\'année de naissance est trop lointaine.', label];
  }
  if (annee > ajdAnnee) {
    const label = GetLabel(input);
    return ['L\'année de naissance ne peut être dans le futur.', label];
  }
  if (annee === ajdAnnee && mois > ajdMois) {
    const label = GetLabel(input);
    return ['Le mois de naissance ne peut être dans le futur.', label];
  }
  if (annee === ajdAnnee && mois === ajdMois && jour > ajdJour) {
    const label = GetLabel(input);
    return ['Le jour de naissance ne peut être dans le futur.', label];
  }
  if (mois < 1 || mois > 12) {
    const label = GetLabel(input);
    return ['Le mois de naissance doit être comprit entre 1 et 12.', label];
  }
  if (jour < 1 || jour > 31) {
    const label = GetLabel(input);
    return ['Le jour de naissance doit être comprit entre 1 et 31.', label];
  }
  if (jour === 31 && [4, 6, 9, 11].includes(mois)) {
    const label = GetLabel(input);
    return ['Le mois de naissance ne contient pas 31 jours.', label];
  }
  if (mois === 2) { // Vérification d'une année bissextile
    const estBissextile = annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0);
    if (jour > 29 || (jour === 29 && !estBissextile)) {
      const label = GetLabel(input);
      return ['Le jour de naissance est invalide pour le mois de février.', label];
    }
  }

  return undefined;
}

function GetLabel(input) {
  return document.querySelector(`label[for=${input.id}]`);
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
 * Permet de creer la mise en forme du quiz.
 *
 */
function CreerQuiz() {
  // Retirer le formulaire.
  document.formulaire.firstElementChild.classList.add('d-none');
  // Afficher le template du quiz.
  document.formulaire.lastElementChild.classList.remove('d-none');
  // Déplacer le bouton submit.
  const submit = document.getElementById('submit');
  submit.innerHTML = 'Suivant';
  submit.classList.add('mx-5');
  const wrapper = document.getElementById('choix');
  wrapper.appendChild(submit);
}

/**
 * Permet de modifier la couleur d'arrière-plan lorsqu'un
 * choix du quiz est sélectionné.
 *
 * @param {*} e Évênement relié au clique du bouton.
 */
function SelectionnerChoix(e) {
  const { target } = e;
  const radios = document.getElementsByClassName('radio');
  for (let i = 0; i < radios.length; i += 1) {
    radios[i].style.backgroundColor = '';
    radios[i].style.color = 'black';
  }
  target.parentElement.style.backgroundColor = '#5d56fa';
  target.parentElement.style.color = 'white';
}
