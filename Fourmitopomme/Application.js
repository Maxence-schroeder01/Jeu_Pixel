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
    this.fire = 0; 

    createjs.Ticker.addEventListener("tick", evenementtick => this.bouclerGestionTemps(evenementtick));
    createjs.Ticker.setFPS(30);
  }

  bouclerGestionTemps(evenementtick){
    let secondeEcoulee = evenementtick.delta/1000;
    if(!this.estCharge && this.ennemie.estCharge && this.player.estCharge && this.arrierePlan.estCharge){
      this.estCharge = true;
      this.arrierePlan.afficher();
      this.souris.afficher();
      this.ennemie.afficher();
      this.player.afficher();
      console.log("All affiche créée");
      window.addEventListener("keydown", evenementkeydown => this.gererTouchePressee(evenementkeydown));
      window.addEventListener("keydown", evenementkeydown => this.gererTouchePresseefire(evenementkeydown));
      window.addEventListener("keyup", evenementkeyup => this.gererToucheLevee(evenementkeyup));
    }
    if(this.estCharge){
      this.suivreCurseur();
      this.arrierePlan.animer(secondeEcoulee);
      this.ennemie.animer(secondeEcoulee);
      this.player.animer(secondeEcoulee);
      if (this.fire == 1) {
        this.rocket.tirer(secondeEcoulee);
      }


      if(this.testerCollisionRectangle(this.player.determinerRectangleOccupe(), this.ennemie.determinerRectangleOccupe())){
        console.log("Vous êtes mort !");
        this.player.invisible();
        this.looser = setInterval(this.lose, 20);
      }
      if(this.testerCollisionRectangle(this.rocket.determinerRectangleOccupe(), this.ennemie.determinerRectangleOccupe())){
        console.log("Vous avez Gagnée");
        this.ennemie.invisible();
        this.winer = setInterval(this.win, 20);
      }
    }
    this.scene.update(evenementtick);
  }

win(){
  if ( confirm("VOUS AVEZ WIN")) {}
  else window.location.reload();
  clearInterval(winer);
}
lose(){
  if ( confirm("VOUS ETES MORT")) {}
  else window.location.reload();
  clearInterval(looser);
}

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
    }
  }

  gererTouchePresseefire(evenementkeydown){
    if (evenementkeydown.keyCode === 32) {
      this.rocket.afficher(this.player.determinerRectangleOccupe());
      this.fire = 1;
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
}

new Application();
