(function Menu(){
    var vueAccueil;
    var vueJeu;
    var vueFin;
    var App;
  
    var nomJoueur;
  
    var initialiser = function(){
      vueAccueil = new Accueil(enregistrerJoueur);
      vueJeu = new Game();
      vueFin = new Fin();
  
      nomJoueur = "";
  
      vueAccueil.afficher();
  
      window.addEventListener("hashchange", naviguer);
  
    }
  
    var naviguer = function(){
      var hash = window.location.hash;
      console.log("naviguer", hash);
  
      if(hash.match(/^#accueil/)){
        vueAccueil.afficher();
      }else if(hash.match(/^#jouer/)){
        lancerJeu();
      }else if(hash.match(/^#fin-partie-gagnee/)){
        vueFin.afficher("Partie gagnée!");
      }else if(hash.match(/^#fin-partie-perdue/)){
        vueFin.afficher("Partie perdue!");
      }
    }
  
    var lancerJeu = function(){
      vueJeu.afficher();
      Jeu = new Application();
    }
  
    var enregistrerJoueur = function(nomJoueurEntrer){
      console.log("enregistrerJoueur");
      nomJoueur = nomJoueurEntrer;
    }
  
    document.addEventListener("DOMContentLoaded",initialiser);
  })();
  
  
  
  
  
  
  