// Fonction de détection d’erreur (inutile ici à cause de la détection de champ plus bas)
function detectError(event) {
  event.preventDefault();

  let prenom = document.getElementById("PrenomSend").value;
  let nom = document.getElementById("NomSend").value;
  const dateNaissance = document.querySelector('input[name="datenaissance"]');

  if (prenom == "") {
    console.log("Le champ Prénom n'est pas renseigné.");
    window.alert("Le champ Prénom n'est pas renseigné.");
  }

  if (nom == "") {
    console.log("Le champ Nom n'est pas renseigné.");
    window.alert("Le champ Nom n'est pas renseigné.");
  }

  if (!dateNaissance.value) {
    console.log("Le champ Date de naissance n'est pas renseigné.");
    window.alert("Le champ Date de naissance n'est pas renseigné.");
  }
}

//Fonction pour Lancer le jeu de pierre-feuille-ciseaux
function lancerJeu() {
  //on initialise les variables de base, constantes car on ne vetu pas qu'elles soient modifiées
  const choix = ["pierre", "feuille", "ciseaux"];
  const utilisateur = prompt("Choisis : pierre, feuille ou ciseaux").toLowerCase(); 
  const ordinateur = choix[Math.floor(Math.random() * 3)];

  if (!choix.includes(utilisateur)) {
    alert("Choix invalide.");
    return;
  }
//on compare le choix de l'utlisateur et de l'ordi
  if (utilisateur === ordinateur) {
    alert("Égalité. Rejoue !");
    lancerJeu();
    return;
  } else if (
    (utilisateur === "pierre" && ordinateur === "ciseaux") ||
    (utilisateur === "feuille" && ordinateur === "pierre") ||
    (utilisateur === "ciseaux" && ordinateur === "feuille")
  ) {
    alert("Tu as gagné ! C'est ça l'esprit du Jus suprême ! Message envoyé.");
  } else {
    alert("Tu as perdu petit Noob. Le formulaire va être réinitialisé.");
    document.querySelector("form").reset();
    document.getElementById("submitBtn").disabled = true;
  }
}

//On execute le code suivant quand la page est entièrement chargée
document.addEventListener("DOMContentLoaded", () => {
// Gestion du loader et navigation
  const links = document.querySelectorAll('.nav-link');
  const loaderContainer = document.getElementById('loaderContainer');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Bloquer la redirection immédiate
      
      const href = this.href; // URL absolue

      // Affiche le loader
      loaderContainer.style.display = 'flex'; 

      setTimeout(() => {
        window.location.href = href;
      }, 2000);
    });
  });

// Animation zoom img.Initiale
  const image = document.querySelector(".Initiale");
  if(image) {
    image.addEventListener("click", () => {
      image.classList.toggle("zoom");
    });
  }

// Animation du slogan
  const slogans = document.querySelectorAll(".slogan");

  slogans.forEach((sloganEl) => {
    const text = sloganEl.textContent;
    const words = text.split(" ");
    sloganEl.textContent = "";

    // Crée un span pour chaque mot
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.opacity = 0;
      span.style.transition = "opacity 0.5s ease";
      sloganEl.appendChild(span);
    });

    const spans = sloganEl.querySelectorAll("span");

    let index = 0;
//affiche les mots un par un toutes les secondes, puis lance une animation une fois tous les mots visibles.
    function showWords() {
      if (index < spans.length) {
        spans[index].style.opacity = 1;
        index++;
        setTimeout(showWords, 1000); // 1s entre chaque mot
      } else {
        animateSlogan();
      }
    }
//Animation faisant bouger de droite à gauche puis au centre un texte
    function animateSlogan() {
      // Translation droite
      sloganEl.style.transform = "translateX(50px)";
      setTimeout(() => {
        // Translation gauche
        sloganEl.style.transform = "translateX(-50px)";
        setTimeout(() => {
          // Retour au centre
          sloganEl.style.transform = "translateX(0)";
          setTimeout(resetSlogan, 1000);
        }, 500);
      }, 500);
    }
//Efface l'animation puis la redémarre
    function resetSlogan() {
      spans.forEach((span) => (span.style.opacity = 0));
      index = 0;
      setTimeout(showWords, 500);
    }

    // Démarre l'animation
    showWords();
  });

// Tickets à gratter
  const scratchContainers = document.querySelectorAll(".Ticket");

  scratchContainers.forEach(container => {
    const img = container.querySelector("img");
    const canvas = container.querySelector(".A_gratter");

    const width = img.offsetWidth;
    const height = img.offsetHeight;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");

    // Dessine le masque opaque
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    canvas.style.pointerEvents = "auto";
    //Efface un cercle de 20 pixels autour des coordonnées (x, y)
    function scratch(x, y) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    //Appelle la fonction scratch à la position exacte de la souris
    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      scratch(x, y);
    });
  });

//Horloge
const clockElement = document.getElementById("horloge");

  function updateClock() {
    const now = new Date();

    let heures = now.getHours();
    let minutes = now.getMinutes();
    let secondes = now.getSeconds();

    // Format 2 chiffres pour chaque unité
    heures = heures < 10 ? "0" + heures : heures;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    const timeString = `${heures}:${minutes}:${secondes}`;

    clockElement.textContent = timeString;
  }

  updateClock(); // affichage immédiat au chargement
  setInterval(updateClock, 1000); // mise à jour chaque seconde

//Détecter les erreurs de formulaire
  const prenom = document.getElementById("PrenomSend");
  const nom = document.getElementById("NomSend");
  const message = document.getElementById("MessageSend");
  const submitBtn = document.getElementById("submitBtn");

  const prenomError = document.getElementById("prenom-error");
  const nomError = document.getElementById("nom-error");
  const messageError = document.getElementById("message-error");

  function validateForm() {
    let isValid = true;

    if (prenom.value.trim() === "") {
      prenomError.textContent = "Prénom obligatoire";
      isValid = false;
    } else {
      prenomError.textContent = "";
    }

    if (nom.value.trim() === "") {
      nomError.textContent = "Nom obligatoire";
      isValid = false;
    } else {
      nomError.textContent = "";
    }

    const msg = message.value.trim();
    if (msg.length < 20 || msg.length > 1000) {
      messageError.textContent = "Message entre 20 et 1000 caractères";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    BoutonEnvoyer.disabled = !isValid;
  }

  [prenom, nom, message].forEach(input => {
    input.addEventListener("input", validateForm);
  });

  // Remplace l’envoi par le jeu
  BoutonEnvoyer.addEventListener("click", (e) => {
    e.preventDefault();
    lancerJeu();
  });
});
