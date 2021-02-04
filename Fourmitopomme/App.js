class App{
  constructor(){

    let dessin = document.getElementById("dessin");

    this.scene = new createjs.Stage(dessin);
    this.scene.largeur = dessin.scrollWidth;
    this.scene.hauteur = dessin.scrollHeight;


    this.arbre = new arbre(this.scene);
    this.fourmi = new fourmi(this.scene);
    this.pomme = new pomme(this.scene);
    this.estCharge = false;

   
    createjs.Ticker.addEventListener("tick", evenementtick => this.boucler(evenementtick));
    createjs.Ticker.setFPS(30);
  }

  boucler(evenementtick){

    if(!this.estCharge && this.arbre.estCharge && this.fourmi.estCharge){
      this.estCharge = true;
      this.arbre.afficher();
      this.fourmi.afficher();
      this.pomme.afficher();
      window.addEventListener("keydown", evenementkeydown => this.gererTouchePressee(evenementkeydown));
      window.addEventListener("keyup", evenementkeyup => this.gererToucheLevee(evenementkeyup));
    }
    if(this.estCharge){
      this.suivreCurseur();

      let secondeEcoulee = evenementtick.delta/1000;
      this.fourmi.animer(secondeEcoulee);
    }
    this.scene.update(evenementtick);
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
        this.fourmi.traiter(fourmil.DEMANDE.ALLER_EN_HAUT);
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