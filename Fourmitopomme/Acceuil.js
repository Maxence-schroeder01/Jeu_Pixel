var Accueil = function(enregistrerJoueur){

    var htmlVue;
    var formulaireJoueur;
    var nomJoueur;
  
    var initialiser = function(){
      htmlVue = document.querySelector("#page-accueil").innerHTML;
    }
  
    this.afficher = function(){
        document.querySelector("body").innerHTML = htmlVue;
        formulaireJoueur = document.querySelector("#formulaire-joueur");
        nomJoueur = document.querySelector("#nom-joueur");
  
        document.addEventListener("submit", enregistrerJoueurEntrer);
  
    }
  
    var enregistrerJoueurEntrer = function(evenement){
      console.log("enregistrerJoueurEntrer");
      evenement.preventDefault();
      enregistrerJoueur(nomJoueur.value);
  
    }
  
    initialiser();
  }