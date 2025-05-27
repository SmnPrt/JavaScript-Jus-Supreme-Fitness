document.addEventListener('copy', function(event) { //fonction qui permet de savoir si il y a une tentative de copie sur la page
alert('La copie de contenu est protégée sur cette page. Pour l\'utiliser, vous pouvez nous verser la somme de 1M d\'euro ou bien, nous mettre un 20/20 comme note de projet en javascript. (ce message est aussi dans la console ;) )',console.log('La copie de contenu est protégée sur cette page. Pour l\'utiliser, vous pouvez nous verser la somme de 1M d\'euro ou bien, nous mettre un 20/20 comme note de projet en javascript.'));

});



//permet de détecter si un champ n'est pas correctement rempli
function detectError(event) {
    // Empêche l'envoi du formulaire pour pouvoir faire les vérifications
    event.preventDefault();

    // Récupération des champs
    let prenom = document.getElementById("PrenomSend").value;
    let nom = document.getElementById("NomSend").value;
    const dateNaissance = document.querySelector('input[name="datenaissance"]');

    // Vérifications
    if (prenom=="") {
        console.log("Le champ Prénom n'est pas renseigné.");
        window.alert("Le champ Prénom n'est pas renseigné.")
    }

    if (prenom=="") {
        console.log("Le champ Nom n'est pas renseigné.")
        window.alert("Le champ Nom n'est pas renseigné.");
    }

    if (!dateNaissance.value) {
        console.log("Le champ Date de naissance n'est pas renseigné.");
        window.alert("Le champ Date de naissance n'est pas renseigné.")
    }
}

function loadAccueil(event) {
    event.preventDefault();
    window.location.replace("../index.html");
}

function confirmerNavigation() {
    let confirmation = confirm("Voulez-vous vraiment naviguer vers la PRÉSENTATION DE L'ÉQUIPE ?");
    return confirmation// true => navigation continue, false => annule
}

function changeItemColor(element) {
  //on defini une couleur aléatoire et on l'applique
    element.style.backgroundColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
//on dit sur quoi effectuer la fonction du dessus(presque tout car on doit le faire sur tout items)
let tab = document.querySelectorAll("a,button,input,p,h1,h2,h3,h4,h5"); //selectionne tous les types de clickable

tab.forEach(function(element) { //comme les elements sont mit dans un tableau, on parcours le tableau pour tous les traiter
    
    element.addEventListener("click", function() { //on appelle la fonction quand on click
        changeItemColor(element);                   //on l'effectue
        console.log("Button clicked: ", element);
    });
});


let secondesPassees = 0;

function mettreAJourChrono() {
    secondesPassees++;
    document.getElementById("chrono").innerHTML = `&nbsp; ${secondesPassees} sec`;
}

setInterval(mettreAJourChrono, 1000);

//détecte un click sur le logo
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo-link");
    if (logo) {
      logo.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        location.replace("index.html"); // Redirige ensuite proprement
      });
    }
  });

//la fonction pour appeler l'isen
function Sonnerie(phoneNumber) {
  // on copie le numéro 
  navigator.clipboard.writeText(phoneNumber).then(() => {
    // on affiche l'alerte pour que la personne confirme le numéro
    const userInput = prompt(
      `Si vous voulez appeler ce numéro: ${phoneNumber}, entrez le de nouveau dans le champ ci-dessous puis validez`
    );
    
    //si la personne a bien recopié le numéro
    if (userInput === phoneNumber) {
      //on affiche dan sl a console le message suivant:
      console.log(`vous appelez ce numéro: ${phoneNumber}`);

      //on joue la sonnerie (crée par Antonin probablement ca meilleure productionn sonore)
      const audio = new Audio("../logobiParalysieDuSommeil.mp3");
      audio.play();
    }
  });
}

//Fonction pour afficher le modal
function showModal(title, imageUrl, description) {
document.getElementById('modalTitle').textContent = title;
document.getElementById('modalImage').src = imageUrl;
document.getElementById('modalDescription').textContent = description.substring(0, 150) + '...';

document.getElementById('missionModal').style.display = 'flex';
}

function closeModal() {
document.getElementById('missionModal').style.display = 'none';
}

//fonction fleche pour remonter
function remonterflèche(scrollTopBtn ){
  //la fonction scrollTo no permet d'aller a un endroit que l'on définit sur la page
  window.scrollTo({
      top: 0,  //ici on va tout en haut de la page
      behavior: 'smooth' //on définit l'animation que l'on veut
    });
  }

//fonction changement d'image
function changementDimage() {
  // On sélectionne toutes les balises img ayant la classe imgs
    const images = document.querySelectorAll('.imgs');

     // On parcours toutes les images
    images.forEach(img => {
       //on effectue l'action qui suit au clic
      img.addEventListener("click", () => {
         // On récupère l'image actuelle
        const srcactuel = img.getAttribute("src");
        // On récupère les deux images qui doivent alterner
        const img1 = img.getAttribute("data-image1");
        const img2 = img.getAttribute("data-image2");
        // Si l'image affichée est img1, on la remplace par img2, sinon on remet img1
        img.setAttribute("src", srcactuel === img1 ? img2 : img1);
      });
    });
  }
  //fait effectuer la fonction quand la pag est chargée
  window.addEventListener('DOMContentLoaded', changementDimage);
  
