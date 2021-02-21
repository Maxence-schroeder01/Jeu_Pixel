class Application{
  constructor(){
    let dessin = document.getElementById("dessin");
    // HTML Canvas plein écran
    dessin.width = window.innerWidth;
    dessin.height = window.innerHeight;

    this.scene = new createjs.Stage(dessin);
    this.scene.largeur = dessin.scrollWidth;
    this.scene.hauteur = dessin.scrollHeight;

    this.souris = new Souris(this.scene);
    this.ennemie = new Ennemie(this.scene);
    this.rocket = new Rocket(this.scene);
    this.player = new Player(this.scene);
    this.arrierePlan = new ArrierePlan(this.scene);
    this.estCharge = false;
    this.fire;

    createjs.Ticker.addEventListener("tick", evenementtick => this.bouclerGestionTemps(evenementtick));
    createjs.Ticker.setFPS(30);
  }

  bouclerGestionTemps(evenementtick){
    if(!this.estCharge && this.ennemie.estCharge && this.player.estCharge && this.arrierePlan.estCharge){
      this.estCharge = true;
      this.arrierePlan.afficher();
      this.souris.afficher();
      this.ennemie.afficher();
      this.player.afficher();
      console.log("All affiche créée");
      window.addEventListener("keydown", evenementkeydown => this.gererTouchePressee(evenementkeydown));
      window.addEventListener("keyup", evenementkeyup => this.gererToucheLevee(evenementkeyup));

      if (this.fire == true) {
        this.rocket.afficher();
        this.rocket.tirer(secondeEcoulee);
        console.log("please");
      }

    }
    if(this.estCharge){
      this.suivreCurseur();
      let secondeEcoulee = evenementtick.delta/1000;
      this.arrierePlan.animer(secondeEcoulee);
      this.ennemie.animer(secondeEcoulee);
      this.player.animer(secondeEcoulee);


      if(this.testerCollisionRectangle(this.player.determinerRectangleOccupe(), this.ennemie.determinerRectangleOccupe())){
        console.log("Vous êtes mort !");
        this.player.invisible();
      }
    }
    this.scene.update(evenementtick);
  }

  /*
  Pour plus d'algorithmes de détection de collision :
  http://www.jeffreythompson.org/collision-detection/table_of_contents.php
  */

  testerCollisionRectangle(rectangleA, rectangleB){
    if(rectangleA.x >= rectangleB.x + rectangleB.largeur ||rectangleA.x + rectangleA.largeur <= rectangleB.x ||
       rectangleA.y >= rectangleB.y + rectangleB.hauteur ||rectangleA.y + rectangleA.hauteur <= rectangleB.y){
      return false;
    }
    return true;
  }
  limiter(valeur, minimum, maximum){
    return Math.max(minimum, Math.min(valeur, maximum));
  }
  testerCollisionRectangleCercle(rectangle, cercle){
    let xProche = this.limiter(cercle.x, rectangle.x, rectangle.x + rectangle.largeur);
    let yProche = this.limiter(cercle.y, rectangle.y, rectangle.y + rectangle.hauteur);
    let distanceX = cercle.x - xProche;
    let distanceY = cercle.y - yProche;
    let distanceAuCarre = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceAuCarre < (cercle.rayon * cercle.rayon);
  }

  suivreCurseur(){
    this.souris.suivre(this.scene.mouseX, this.scene.mouseY);
  }

  gererTouchePressee(evenementkeydown){
    switch(evenementkeydown.keyCode){
      case Application.TOUCHE.DROITE:
        this.player.traiter(Player.DEMANDE.ALLER_A_DROITE);
        break;
      case Application.TOUCHE.GAUCHE:
        this.player.traiter(Player.DEMANDE.ALLER_A_GAUCHE);
        break;
      case Application.TOUCHE.HAUT:
        this.player.traiter(Player.DEMANDE.ALLER_EN_HAUT);
        break;
      case Application.TOUCHE.BAS:
        this.player.traiter(Player.DEMANDE.ALLER_EN_BAS);
        break;
        case Application.TOUCHE.SPACE:
          this.fire == true;
          console.log("presse");
          break;
    }
  }

  gererToucheLevee(evenementkeyup){
    // console.log("gererToucheLevee : "+evenementkeyup.keyCode);
    switch(evenementkeyup.keyCode){
      case Application.TOUCHE.DROITE:
        this.player.traiter(Player.DEMANDE.ATTENDRE);
        break;
      case Application.TOUCHE.GAUCHE:
        this.player.traiter(Player.DEMANDE.ATTENDRE);
        break;
      case Application.TOUCHE.HAUT:
        this.player.traiter(Player.DEMANDE.ATTENDRE);
        break;
      case Application.TOUCHE.BAS:
        this.player.traiter(Player.DEMANDE.ATTENDRE);
        break;
    }
  }


}

//constante de code de touche de clavier
Application.TOUCHE = {
  DROITE : 39,
  GAUCHE : 37,
  HAUT : 38,
  BAS : 40,
  SPACE : 32
}

new Application();
