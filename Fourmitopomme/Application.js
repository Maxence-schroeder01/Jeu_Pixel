var Application = function(){

  var TOUCHE_DROITE = 39; 
  var TOUCHE_GAUCHE = 37;
  var TOUCHE_HAUT = 38;
  var TOUCHE_BAS = 40;

  var scene;
  var arbre;
  var fourmi;
  var arrierePlan;
  var testChargement;
  var initialiser = function(){
    var dessin = document.getElementById("dessin");
    scene = new createjs.Stage(dessin);
    console.log("Scène créée");
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", rafraichir);

    window.addEventListener("keydown", gererTouche);

    arbre = new Arbre(scene, {x:400, y:100});
    fourmi = new Fourmi(scene);
    arrierePlan = new Back(scene);

    testChargement = setInterval(testerChargement, 100);

  }

  var rafraichir = function (evenementTick){

    if(testerCollision(fourmi.getRectangle(), arbre.getRectangle())){
      console.log("collision!");
      fourmi.disparaitre();
      createjs.Ticker.removeEventListener("tick", rafraichir);
      window.location = "#fin-partie-perdue";
    }

    arrierePlan.animer();
    scene.update(evenementTick);
    console.log("Mise à jour scène");
  }

  var testerChargement = function(){
    if(arbre.estCharge() &&
      fourmi.estCharge() &&
      arrierePlan.estCharge()){
      afficherObjet();
      clearInterval(testChargement);
    }
  }

  var afficherObjet = function(){
    arrierePlan.afficher();
    fourmi.afficher();
    arbre.afficher();
  }

  var gererTouche = function(evenement){
    console.log("gererTouche : "+evenement.keyCode);
    switch(evenement.keyCode){
      case TOUCHE_DROITE:
        fourmi.avancer();
        break;
        case TOUCHE_GAUCHE:
        fourmi.reculer();
        break;
        case TOUCHE_BAS:
        fourmi.descendre();
        break;
        case TOUCHE_HAUT:
        fourmi.monter();
        break;
    }
  }

  var testerCollision = function(rectangleOiseau, rectanglePoteau){
    if(rectangleOiseau.x >= rectanglePoteau.x + rectanglePoteau.width ||
      rectangleOiseau.x + rectangleOiseau.width <= rectanglePoteau.x ||
      rectangleOiseau.y >= rectanglePoteau.y + rectanglePoteau.height ||
      rectangleOiseau.y + rectangleOiseau.height <= rectanglePoteau.y){
        return false;
    }
    return true;
  }

  initialiser();

}

















