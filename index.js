/* eslint-disable strict */

'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable strict */
/* eslint-disable no-console */

// Renvoie la fonction Validation() lorsque le bouton est submit est utilisé.
document.formulaire.addEventListener('submit', Validation);

/** @type {Object} Donnée de l'utilisateur. */
const utilisateur = {};
utilisateur.points = 0;

/** @type {JSONString} Données du quiz. */
const rawData = `
[
  {
      "titre": "Quel est le nom de l'alignement de trois objets célestes ?",
      "choix": [
          "Suzuki",
          "Syzygie",
          "Jésus-Christ"
      ],
      "explication": "L'alignement entre 3 objets célestes tel que la Terre, la Lune et le Soleil ou tout autre planète est appelé une syzygie.",
      "reponse": 1,
      "image": "./assets/syzygie.jpg"
  },
  {
      "titre": "Où est allé David Saint-Jacques, un astronaute québécois, en 2018 ?",
      "choix": [
          "Dans un trou noir",
          "Au centre de la Terre",
          "Sur la Station Spatiale Internationale"
      ],
      "explication": "David Saint-Jacques, astronaute, astrophysicien, médecin et ingénieur québecois, a été sélectionné en 2009 (à 39 ans) pour une mission vers la Station Spatiale Internationale.",
      "reponse": 2,
      "image": "./assets/davidSaintJacques.jpg"
  },
  {
      "titre": "Qu'est ce que la planète neuf ?",
      "choix": [
          "Une planète située dans la ceinture de Kuiper",
          "Une planète hypotétique du Système Solaire",
          "La 9ème planète à être apparue"
      ],
      "explication": "La planète neuf est une planète hypotétique inventée pour expliquer certaines pertubations de l'orbite d'objets célestes situés au delà de Neptune.",
      "reponse": 1,
      "image": "./assets/planete9.jpg"
  },
  {
      "titre": "En combien de temps recevons-nous les images de Perseverance, le robot envoyé sur Mars le 30 juillet 2020 ?",
      "choix": [
          "Presque instantanément",
          "Plusieurs dizaines de minutes",
          "Environ 3 minutes"
      ],
      "explication": "Les échanges de données entre la Terre et Mars se font par les satellites orbitant autour de notre planète. Bien que l'information voyage à la vitesse de la lumière et en raison de la distance avec Mars, il faut 3 minutes et 22 secondes à la communication entre ces 2 planètes.",
      "reponse": 2,
      "image": "./assets/perseverance.jpg"
  },
  {
      "titre": "Qu'est-ce que la Voie Lactée ?",
      "choix": [
          "La plus proche galaxie",
          "Notre galaxie",
          "Une marque de crème glacée"
      ],
      "explication": "La Voie Lactée est la galaxie dans laquelle se trouve notre système solaire. La galaxie la plus proche est Andromède.",
      "reponse": 1,
      "image": "./assets/milkyWay.jpg"
  },
  {
      "titre": "Quelles sont les propriétés de Sagittarius B2 (un nuage de gaz) ?",
      "choix": [
          "Goûte la framboise et sent le rhum",
          "Extrêment dense et en forme du drapeau américain",
          "Multicolore et brillant"
      ],
      "explication": "Des astronomes cherchant une trace de vie dans notre galaxie ont découvert, en analysant un nuage de gaz au milieu de celle-ci, du Formiate d'Éthyle; une substance connue entre autre pour sa participation au goût de la framboise et à l'odeur du rhum.",
      "reponse": 0,
      "image": "./assets/sagittarius.png"
  },
  {
      "titre": "Pour être aussi dense qu'une étoile à neutron, l'humanité entière devrait être compressée dans le volume d'un cube de sucre !",
      "choix": [
          "Vrai",
          "Faux"
      ],
      "explication": "Les étoiles à neutron sont des objets célestes formées suite à l'éffondrement d'une étoile massive. La masse est comprise entre 10 fois et 50 fois celle du Soleil et leur taille est comparable à la longueur de Manhattan (environ 20km).",
      "reponse": 0,
      "image": "./assets/neutronStar.jpg"
  },
  {
      "titre": "À quoi sert cette équation ?",
      "choix": [
          "À calculer la population restante si on ne trouve pas de vaccin à la COVID-19",
          "À déterminer la quantité de Kérosène nécessaire au décollage d'une fusée Space X",
          "À estimer le nombre potentiel de civilsations dans notre galaxie"
      ],
      "explication": "L'équation de Drake, suggérée par l'astronome américain Frank Drake en 1961, tente de calculer le nombre de civilisations extraterrestres dans notre galaxie avec qui nous pourrions entrer en contact. Avec l'estimation actuelle des nombres, il y aurait 10 civilisations en mesure de communiquer avec nous.",
      "reponse": 2,
      "image": "./assets/drake.jpg"
  },
  {
      "titre": "Peu à peu la Lune se rapproche de nous !",
      "choix": [
          "Vrai",
          "Faux"
      ],
      "explication": "Faux. En réalité, la Lune s'éloigne doucement de la terre. À la vitesse de 3.78cm chaque année. Environ la même vitesse à laquelle nos ongles poussent.",
      "reponse": 1,
      "image": "./assets/moon.jpg"
  },
  {
      "titre": "Si une forme de vie habitant sur M58 (une galaxie spirale, située à 70 millions d'années-lumière de nous) nous regardait en ce moment, que verait-elle ?",
      "choix": [
          "Des dinosaures",
          "Notre confinement",
          "Des voitures volantes"
      ],
      "explication": "En effet, cette galaxie étant située à 70 millions d'années-lumière de la Voie Lactée, il faut donc 70 millions d'années à la lumière pour s'y rendre. Donc, une forme de vie nous observant depuis cet endroit verrait la terre telle qu'elle était il y a 70 millions d'années.",
      "reponse": 0,
      "image": "./assets/m58.jpg"
  }
]
`;

/** @type {JSON} Données du quiz */
const data = JSON.parse(rawData);

/** @type {Int} Numéro actuel de la question du quiz. */
let questionNumber = 1;

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
        if (validation) errors.push(validation);
      } else {
        const validation = CheckText(input);
        if (validation) errors.push(validation);
      }
    }

    // Retire les anciens messages d'erreurs.
    const lastList = document.getElementById('erreurs');
    const lastLabels = document.getElementsByClassName('erreurInfo');
    if (lastList) lastList.remove();
    while (lastLabels.length) lastLabels[0].remove();

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
        errorInfo.classList.add('d-flex', 'align-items-center', 'erreurInfo');
        errorInfo.appendChild(icon);
        errorInfo.appendChild(errorLabel);
        label.parentElement.insertBefore(errorInfo, label.nextSibling);
      }
      document.getElementById('liste-erreurs').append(liste);
    } else {
      for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        utilisateur[input.name] = input.value;
      }
      CreerQuiz();
      AfficherQuestion();
    }
    // Si la réponse est à valider
  } else if (utilisateur.aValider) {
    const answer = GetSelection(); // Récupérer le choix
    if (answer) { // S'il y a une sélection
      const estValide = ReponseValide(answer); // Valider le choix
      if (estValide) BonneReponse(answer);
      else MauvaiseReponse(answer);
    } else NoInput();// S'il n'y a pas de sélection
  } else if (utilisateur.aExpliquer) AfficheExplication(); // On affiche les détails
  else if (questionNumber <= 10) AfficherQuestion(); // On passe à la prochaine question
  else if (!utilisateur.recommencer) AfficherResultat(); // On affiche le résultat
  else window.location.reload(); // Sinon on recommence le quiz

  e.preventDefault();
}

/**
 * Valide la saisie de texte.
 *
 * @param {Object} champ Champ de saisie sur lequel on veut appliquer la validation.
 * @return {String} Le message d'erreur correspondant ou dans le cas échant undefined.
 */
function CheckText(input) {
  if (input.value === '') {
    const label = GetLabel(input);
    return [`Le champ ${label.textContent} ne peut être vide.`, label];
  }

  const pattern = /^[a-z ,.'-âûèéç]+$/i;
  if (!pattern.test(input.value)) {
    const label = GetLabel(input);
    return [`Le champ ${label.textContent} ne peut contenir des caractères autres que des lettres.`, label];
  }
}

/**
 * Validation de la date.
 * La date doit être inférieur à aujourd'hui, l'année, le mois
 * et le jour doivent être valide et le mois de février doit correspondre
 * aux années bissextiles.
 *
 * @param {Object} input Champ de la date.
 * @return {String} Message d'erreur correspondant.
 */
function CheckDate(input) {
  const rawDate = input.value;
  if (rawDate === '') {
    const label = GetLabel(input);
    return [`Le champ ${label.textContent} ne peut être vide.`, label];
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
    return ['L\'année de naissance est trop lointaine.', GetLabel(input)];
  }
  if (annee > ajdAnnee) {
    return ['L\'année de naissance ne peut être dans le futur.', GetLabel(input)];
  }
  if (annee === ajdAnnee && mois > ajdMois) {
    return ['Le mois de naissance ne peut être dans le futur.', GetLabel(input)];
  }
  if (annee === ajdAnnee && mois === ajdMois && jour > ajdJour) {
    return ['Le jour de naissance ne peut être dans le futur.', GetLabel(input)];
  }
  if (mois < 1 || mois > 12) {
    return ['Le mois de naissance doit être comprit entre 1 et 12.', GetLabel(input)];
  }
  if (jour < 1 || jour > 31) {
    return ['Le jour de naissance doit être comprit entre 1 et 31.', GetLabel(input)];
  }
  if (jour === 31 && [4, 6, 9, 11].includes(mois)) {
    return ['Le mois de naissance ne contient pas 31 jours.', GetLabel(input)];
  }
  if (mois === 2) { // Vérification d'une année bissextile
    const estBissextile = annee % 4 === 0 && (annee % 100 !== 0 || annee % 400 === 0);
    if (jour > 29 || (jour === 29 && !estBissextile)) {
      return ['Le jour de naissance est invalide pour le mois de février.', GetLabel(input)];
    }
  }

  return undefined;
}

/**
 * Obtenir le label correspondant au input donné.
 *
 * @param {*} input Le champ de saisi dont on veut le label.
 * @return {*} Le label correspondant
 */
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
  if (/Digit|Delete|Backspace|Arrow/.test(e.code)) return true;
  return false;
}

/**
 * Mise en forme de la saisie de la date de naissance en ajoutant
 * des barres obliques.
 *
 * @param {Object} input Champ de la date de naissance.
 * @param {Event} e Évènement lors de la saisie d'un caractère.
 */
function DateNaissance(input, e) {
  const champ = document.getElementById(input.id);
  const { length } = champ.value;
  const deleting = e.inputType;
  if ((length === 5 || length === 2) && deleting && !deleting.includes('delete')) {
    champ.value += '/';
  }
}

/**
 * Permet de modifier la couleur d'arrière-plan lorsqu'un
 * choix du quiz est sélectionné.
 *
 * @param {*} e Évênement relié au clique du bouton.
 */
function SelectionnerChoix(e) {
  const lastError = document.getElementById('noInputErreur');
  if (lastError) lastError.remove();
  const { target } = e;
  const radios = document.getElementsByClassName('radio');
  for (let i = 0; i < radios.length; i += 1) {
    radios[i].style.backgroundColor = '';
    radios[i].style.color = 'black';
  }
  target.parentElement.style.backgroundColor = '#5d56fa';
  target.parentElement.style.color = 'white';
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
  submit.classList.add('mx-5');
  const wrapper = document.getElementById('choix');
  wrapper.appendChild(submit);
}

/**
 * Permet d'afficher la prochaine question du quiz,
 * en se basant sur le numéro de la question actuelle.
 *
 */
function AfficherQuestion() {
  // Récupérer les éléments de la question
  const title = document.getElementById('question');
  const img = document.getElementById('questionImg');
  const wrapper = document.getElementById('choix');
  const button = document.getElementById('submit');
  const numero = document.getElementById('questionNumber');
  button.innerHTML = 'Valider';

  // Suppression des explications
  const explication = document.getElementById('textExplication');
  if (explication) explication.remove();

  // Définir leur valeur en fonction du numéro de la question
  const question = data[questionNumber - 1];
  title.textContent = question.titre;
  numero.textContent = `${questionNumber} / 10`;
  const { choix } = question;

  for (let i = 0; i < choix.length; i += 1) {
    // Création des choix de la question
    const label = document.createElement('label');
    label.setAttribute('for', i.toString());
    label.classList.add('radio');
    label.textContent = choix[i];
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'choix');
    input.setAttribute('value', i.toString());
    input.id = i.toString();
    input.addEventListener('change', SelectionnerChoix);
    label.appendChild(input);
    wrapper.insertBefore(label, button);
  }
  img.style.backgroundImage = `url('${question.image}')`;
  utilisateur.aValider = true;
}

/**
 * Obtenir la valeur du choix de l'utilisateur à la question.
 *
 * @return {Int} Valeur du choix de l'utilisateur.
 */
function GetSelection() {
  const choix = document.getElementsByName('choix');
  for (let i = 0; i < choix.length; i += 1) {
    const input = choix[i];
    if (input.checked) return input.value;
  }
  return undefined;
}

/**
 * Affiche un message d'erreur lorsque l'utilisateur tente de
 * valider une question où il n'a pas choisi de réponse.
 *
 * @return {*} ;
 */
function NoInput() {
  const lastError = document.getElementById('noInputErreur');
  if (lastError) return;
  const errorLabel = document.createElement('label');
  errorLabel.classList.add('erreur');
  errorLabel.textContent = 'Vous devez sélectionner une réponse.';
  const icon = document.createElement('img');
  icon.src = './assets/warning.svg';
  const errorInfo = document.createElement('div');
  errorInfo.id = 'noInputErreur';
  errorInfo.appendChild(icon);
  errorInfo.appendChild(errorLabel);
  const wrapper = document.getElementById('choix');
  const fChoix = document.getElementsByClassName('radio')[0];
  wrapper.insertBefore(errorInfo, fChoix);
}

/**
 * Valider le choix de l'utilisateur à la question du quiz.
 *
 * @param {Int} answer Valeur de la réponse de l'utilisateur.
 * @return {Boolean} true si la réponse est bonne, faux autrement.
 */
function ReponseValide(answer) {
  if (answer === data[questionNumber - 1].reponse.toString()) return true;
  return false;
}

/**
 * Gère le cas d'une bonne réponse.
 * Change la couleur d'arrière-plan, donne 1 point à l'utilisateur
 * et prépare les explications.
 *
 * @param {Int} answer Valeur de la réponse de l'utilisateur.
 */
function BonneReponse(answer) {
  utilisateur.points += 1;
  utilisateur.aValider = false;
  utilisateur.aExpliquer = true;
  // Changer la couleur de fond de la réponse de l'utilisateur
  const input = document.querySelector(`label[for="${answer}"]`);
  input.style.backgroundColor = 'rgb(40, 167, 69)';
  const submit = document.getElementById('submit');
  submit.innerHTML = 'Suivant';
  const inputs = document.getElementsByName('choix');
  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].removeEventListener('change', SelectionnerChoix);
  }
  // Afficher un message "Bonne réponse !"
  const goodAnswer = document.createElement('label');
  goodAnswer.style.color = 'rgb(40, 167, 69)';
  goodAnswer.textContent = 'Bonne réponse !';
  goodAnswer.id = 'messageReponse';

  const wrapper = document.getElementById('choix');
  const fChoix = document.getElementsByClassName('radio')[0];
  wrapper.insertBefore(goodAnswer, fChoix);
}

/**
 * Gère le cas d'une mauvaise réponse.
 * Change la couleur d'arrière-plan et prépare les explications.
 *
 * @param {Int} answer Valeur de la réponse de l'utilisateur.
 */
function MauvaiseReponse(answer) {
  utilisateur.aValider = false;
  utilisateur.aExpliquer = true;
  const submit = document.getElementById('submit');
  submit.innerHTML = 'Suivant';
  // Changer la couleur de fond de la réponse de l'utilisateur
  const label = document.querySelector(`label[for="${answer}"]`);
  label.style.backgroundColor = '#dc3545';
  // Afficher la bonne réponse
  const inputs = document.getElementsByName('choix');
  for (let i = 0; i < inputs.length; i += 1) {
    const { value } = inputs[i];
    if (ReponseValide(value)) {
      const bonneReponse = document.querySelector(`label[for="${value}"]`);
      bonneReponse.style.backgroundColor = 'rgb(40, 167, 69)';
    }
    inputs[i].removeEventListener('change', SelectionnerChoix);
  }
  // Afficher un message "Mauvaise réponse..."
  const badAnswer = document.createElement('label');
  badAnswer.style.color = '#dc3545';
  badAnswer.textContent = 'Mauvaise réponse...';
  badAnswer.id = 'messageReponse';
  const wrapper = document.getElementById('choix');
  const fChoix = document.getElementsByClassName('radio')[0];
  wrapper.insertBefore(badAnswer, fChoix);
}

/**
 * Affiche les explications lié à la question actuelle.
 *
 */
function AfficheExplication() {
  // Suppression des labels/inputs
  const lastInputs = document.getElementsByClassName('radio');
  while (lastInputs.length) lastInputs[0].remove();
  const messageReponse = document.getElementById('messageReponse');
  if (messageReponse) messageReponse.remove();

  // Creation d'un paragraphe contenant les détails
  const text = document.createElement('p');
  text.id = 'textExplication';
  text.textContent = data[questionNumber - 1].explication;

  // Positionner le texte dans le HTML
  const wrapper = document.getElementById('choix');
  const button = document.getElementById('submit');
  wrapper.insertBefore(text, button);
  utilisateur.aExpliquer = false;
  questionNumber += 1;
}

/**
 * Affiche les résultats du quiz et les informations
 * de l'utilisateur.
 *
 */
function AfficherResultat() {
  // Suppression des explications et autres élements
  const explication = document.getElementById('textExplication');
  if (explication) explication.remove();
  const titre = document.getElementById('question');
  titre.remove();
  const number = document.getElementById('questionNumber');
  number.remove();

  const infos = [
    `Nom : ${utilisateur.nom}`,
    `Prénom : ${utilisateur.prenom}`,
    `Âge : ${GetAge(utilisateur.naissance)}`,
    `Status : ${utilisateur.statut}`,
    `Score : ${utilisateur.points * 10} %`,
  ];

  const liste = document.createElement('ul');
  liste.id = 'infosUtilisateur';
  for (let i = 0; i < infos.length; i += 1) {
    const info = document.createElement('li');
    info.textContent = infos[i];
    liste.append(info);
  }

  const img = document.getElementById('questionImg');
  img.style.backgroundImage = 'url(\'./assets/completed.png\')';
  const wrapper = document.getElementById('choix');
  const button = document.getElementById('submit');
  button.innerHTML = 'Recommencer';
  button.style.fontSize = '2rem';
  utilisateur.recommencer = true;
  wrapper.insertBefore(liste, button);
}

/**
 * Permet de calculer l'âge d'une personne
 * depuis sa date de naissance.
 *
 * Basé sur https://stackoverflow.com/a/7091965.
 * @param {String} date Date de naissance.
 * @return {Int} Âge de la personne.
 */
function GetAge(date) {
  const [jour, mois, annee] = date.split('/');
  const today = new Date();
  const naissance = new Date(annee, mois, jour);
  let age = today.getFullYear() - naissance.getFullYear();
  const m = today.getMonth() - naissance.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < naissance.getDate())) age -= 1;
  return age;
}
