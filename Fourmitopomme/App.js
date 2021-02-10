class App{
  constructor(){

    let dessin = document.getElementById("dessin");
    dessin.width = window.innerWidth;
    dessin.height = window.innerHeight;

    this.scene = new createjs.Stage(dessin);
    this.scene.largeur = dessin.scrollWidth;
    this.scene.hauteur = dessin.scrollHeight;


    this.arbre = new arbre(this.scene);
    this.fourmi = new fourmi(this.scene);
    this.pomme = new pomme(this.scene);
    this.back = new back(this.scene);
    this.estCharge = false;

   
    createjs.Ticker.addEventListener("tick", evenementtick => this.boucler(evenementtick));
    createjs.Ticker.setFPS(30);
  }

  boucler(evenementtick){

    if(!this.estCharge && this.arbre.estCharge && this.fourmi.estCharge && this.back.estCharge){
      this.estCharge = true;
      this.arbre.afficher();
      this.back.afficher();
      this.fourmi.afficher();
      this.pomme.afficher();
      window.addEventListener("keydown", evenementkeydown => this.gererTouchePressee(evenementkeydown));
      window.addEventListener("keyup", evenementkeyup => this.gererToucheLevee(evenementkeyup));
    }
    if(this.estCharge){
      this.suivreCurseur();

      let secondeEcoulee = evenementtick.delta/1000;
      this.back.animer(secondeEcoulee);
      this.arbre.animer(secondeEcoulee);
      this.fourmi.animer(secondeEcoulee);


      if(this.testerCollisionRectangle(this.fourmi.determinerRectangleOccupe(), this.arbre.determinerRectangleOccupe())){
        console.log("Collision entre la fourmi et l'arbre!");
      }

      if(this.testerCollisionRectangleCercle(this.fourmi.determinerRectangleOccupe(), this.pomme.determinerCercleOccupe())){
        console.log("BOUM!");
      }
    }
    this.scene.update(evenementtick);
  }

  testerCollisionRectangle(rectangleA, rectangleB){
    if(rectangleA.x >= rectangleB.x + rectangleB.largeur ||rectangleA.x + rectangleA.largeur <= rectangleB.x ||
       rectangleA.y >= rectangleB.y + rectangleB.hauteur ||rectangleA.y + rectangleA.hauteur <= rectangleB.y){
      return false;
    }
    return true;
  }

  // valeur limite à la plage minimum..maximum
  limiter(valeur, minimum, maximum){
    return Math.max(minimum, Math.min(valeur, maximum));
  }

  testerCollisionRectangleCercle(rectangle, pomme){

    let xProche = this.limiter(pomme.x, rectangle.x, rectangle.x + rectangle.largeur);
    let yProche = this.limiter(pomme.y, rectangle.y, rectangle.y + rectangle.hauteur);

    let distanceX = pomme.x - xProche;
    let distanceY = pomme.y - yProche;

    let distanceAuCarre = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceAuCarre < (pomme.rayon * pomme.rayon);
  }
  suivreCurseur(){
    this.pomme.suivre(this.scene.mouseX, this.scene.mouseY);
  }

  gererTouchePressee(evenementkeydown){
    console.log("gererTouchePressee : "+evenementkeydown.keyCode);
    switch(evenementkeydown.keyCode){
      case App.TOUCHE.DROITE:
        this.fourmi.traiter(fourmi.DEMANDE.ALLER_A_DROITE);
        break;
      case App.TOUCHE.GAUCHE:
        this.fourmi.traiter(fourmi.DEMANDE.ALLER_A_GAUCHE);
        break;
      case App.TOUCHE.HAUT:
        this.fourmi.traiter(fourmi.DEMANDE.ALLER_EN_HAUT);
        break;
      case App.TOUCHE.BAS:
        this.fourmi.traiter(fourmi.DEMANDE.ALLER_EN_BAS);
        break;
    }
  }

  gererToucheLevee(evenementkeyup){
    console.log("gererToucheLevee : "+evenementkeyup.keyCode);
    switch(evenementkeyup.keyCode){
      case App.TOUCHE.DROITE:
        this.fourmi.traiter(fourmi.DEMANDE.ATTENDRE);
        break;
      case App.TOUCHE.GAUCHE:
        this.fourmi.traiter(fourmi.DEMANDE.ATTENDRE);
        break;
      case App.TOUCHE.HAUT:
        this.fourmi.traiter(fourmi.DEMANDE.ATTENDRE);
        break;
      case App.TOUCHE.BAS:
        this.fourmi.traiter(fourmi.DEMANDE.ATTENDRE);
        break;
    }
  }
}
App.TOUCHE = {
  DROITE : 39,
  GAUCHE : 37,
  HAUT : 38,
  BAS : 40
}

new App();