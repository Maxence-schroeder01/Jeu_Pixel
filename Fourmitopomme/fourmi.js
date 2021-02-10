class fourmi{
  constructor(scene){
    this.etat = fourmi.ETAT.ATTENTE;

    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/Lightning.png";
  }

  creerSprite(evenementload){
    console.log("Image fourmi1.png chargée");

    let spriteSheetfourmi = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 32,
        height: 32.4
      },

      animations:{
        marcher: [0,1,2]
      }
    });
    console.log("SpriteSheetfourmi créée");

    this.spritefourmi = new createjs.Sprite(spriteSheetfourmi,"marcher");
    this.spritefourmi.framerate = 7;

    this.spritefourmi.scaleX = this.spritefourmi.scaleY = 2;

    this.spritefourmi.setBounds(
      this.spritefourmi.x,
      this.spritefourmi.y,
      200 * 2,
      200 * 2);

    this.estCharge = true;
    console.log("Spritefourmi créée");

  }

  afficher(){
    this.spritefourmi.x = 200;
    this.spritefourmi.y = 250;
    this.scene.addChild(this.spritefourmi);
    console.log("Spritefourmi ajoutée à la scène");

  }
  avancer(secondeEcoulee){
    this.spritefourmi.x = this.limiterMouvement(this.spritefourmi.x + fourmi.VITESSE_PIXEL_SECONDE * secondeEcoulee, this.spritefourmi.y).x;
  }

  reculer(secondeEcoulee){
    this.spritefourmi.x = this.limiterMouvement(this.spritefourmi.x - fourmi.VITESSE_PIXEL_SECONDE * secondeEcoulee, this.spritefourmi.y).x;
  }

  monter(secondeEcoulee){
    this.spritefourmi.y = this.limiterMouvement(this.spritefourmi.x, this.spritefourmi.y - fourmi.VITESSE_PIXEL_SECONDE * secondeEcoulee).y;
  }

  descendre(secondeEcoulee){
    this.spritefourmi.y = this.limiterMouvement(this.spritefourmi.x, this.spritefourmi.y + fourmi.VITESSE_PIXEL_SECONDE * secondeEcoulee).y;
  }

  limiterMouvement(testX, testY){
    let nouveauX = testX;
    let nouveauY = testY;

    if(testX + this.spritefourmi.getBounds().width > this.scene.largeur){
      nouveauX  = this.scene.largeur - this.spritefourmi.getBounds().width;
    }else if(testX < 0){
      nouveauX = 0;
    }

    if(testY + this.spritefourmi.getBounds().height > this.scene.hauteur){
      nouveauY  = this.scene.hauteur - this.spritefourmi.getBounds().height;
    }else if(testY < 0){
      nouveauY = 0;
    }

    return {x: nouveauX, y: nouveauY};

  }

  traiter(demande){
    switch(demande){
      case fourmi.DEMANDE.ATTENDRE:
        this.etat = fourmi.ETAT.ATTENTE;
        break;
      case fourmi.DEMANDE.ALLER_A_DROITE:
        this.etat = fourmi.ETAT.MOUVEMENT_A_DROITE;
        break;
      case fourmi.DEMANDE.ALLER_A_GAUCHE:
        this.etat = fourmi.ETAT.MOUVEMENT_A_GAUCHE;
        break;
      case fourmi.DEMANDE.ALLER_EN_HAUT:
        this.etat = fourmi.ETAT.MOUVEMENT_EN_HAUT;
        break;
      case fourmi.DEMANDE.ALLER_EN_BAS:
        this.etat = fourmi.ETAT.MOUVEMENT_EN_BAS;
        break;
    }

  }

  animer(secondeEcoulee){
    switch(this.etat){
      case fourmi.ETAT.ATTENTE:
        //rien faire
        break;
      case fourmi.ETAT.MOUVEMENT_A_DROITE:
        this.avancer(secondeEcoulee);
        break;
      case fourmi.ETAT.MOUVEMENT_A_GAUCHE:
        this.reculer(secondeEcoulee);
        break;
      case fourmi.ETAT.MOUVEMENT_EN_HAUT:
        this.monter(secondeEcoulee);
        break;
      case fourmi.ETAT.MOUVEMENT_EN_BAS:
        this.descendre(secondeEcoulee);
        break;
    }
  }
determinerRectangleOccupe(){
  return {
    x: this.spritefourmi.x,
    y: this.spritefourmi.y,
    largeur: this.spritefourmi.getBounds().width,
    hauteur: this.spritefourmi.getBounds().height
  };
}
}
fourmi.ETAT = {
  ATTENTE : 0,
  MOUVEMENT_A_DROITE : 1,
  MOUVEMENT_A_GAUCHE : 2,
  MOUVEMENT_EN_HAUT : 3,
  MOUVEMENT_EN_BAS : 4
}
fourmi.DEMANDE = {
  ATTENDRE : 0,
  ALLER_A_DROITE : 1,
  ALLER_A_GAUCHE : 2,
  ALLER_EN_HAUT : 3,
  ALLER_EN_BAS : 4
}
fourmi.VITESSE_PIXEL_SECONDE = 500;