class Player{
  constructor(scene){
    this.etat = Player.ETAT.ATTENTE;

    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/Lightning.png";
  }

  creerSprite(evenementload){
    console.log("Image chargée");

    let spriteSheetPlayer = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 32,
        height: 32.4
      },

      animations:{
        voler: [0,1,2]
      },


    });
    console.log("SpriteSheetPlayer créée");

    this.spritePlayer = new createjs.Sprite(spriteSheetPlayer,"voler");
    this.spritePlayer.framerate = 15;

    this.spritePlayer.scaleX = this.spritePlayer.scaleY = 5;

    this.spritePlayer.setBounds(
      this.spritePlayer.x,
      this.spritePlayer.y,
      100 * 0.5,
      100 * 0.5);

    this.estCharge = true;
    console.log("SpritePlayer créée");

  }
  afficher(){
    this.spritePlayer.x = 0;
    this.spritePlayer.y = 800;
    this.scene.addChild(this.spritePlayer);
    console.log("SpritePlayer ajoutée à la scène");
  }
  invisible(){
    this.spritePlayer.visible = false;
  }

  avancer(secondeEcoulee){
    this.spritePlayer.x = this.limiterMouvement(this.spritePlayer.x + Player.VITESSE_PIXEL_SECONDE * secondeEcoulee, this.spritePlayer.y).x;
  }

  reculer(secondeEcoulee){
    this.spritePlayer.x = this.limiterMouvement(this.spritePlayer.x - Player.VITESSE_PIXEL_SECONDE * secondeEcoulee, this.spritePlayer.y).x;
  }

  monter(secondeEcoulee){
    this.spritePlayer.y = this.limiterMouvement(this.spritePlayer.x, this.spritePlayer.y - Player.VITESSE_PIXEL_SECONDE * secondeEcoulee).y;
  }

  descendre(secondeEcoulee){
    this.spritePlayer.y = this.limiterMouvement(this.spritePlayer.x, this.spritePlayer.y + Player.VITESSE_PIXEL_SECONDE * secondeEcoulee).y;
  }

  limiterMouvement(testX, testY){
    let nouveauX = testX;
    let nouveauY = testY;

    if(testX + this.spritePlayer.getBounds().width > this.scene.largeur){
      nouveauX  = this.scene.largeur - this.spritePlayer.getBounds().width;
    }else if(testX < 0){
      nouveauX = 0;
    }

    if(testY + this.spritePlayer.getBounds().height > this.scene.hauteur){
      nouveauY  = this.scene.hauteur - this.spritePlayer.getBounds().height;
    }else if(testY < 0){
      nouveauY = 0;
    }

    return {x: nouveauX, y: nouveauY};

  }

  traiter(demande){
    switch(demande){
      case Player.DEMANDE.ATTENDRE:
        this.etat = Player.ETAT.ATTENTE;
        break;
      case Player.DEMANDE.ALLER_A_DROITE:
        this.etat = Player.ETAT.MOUVEMENT_A_DROITE;
        break;
      case Player.DEMANDE.ALLER_A_GAUCHE:
        this.etat = Player.ETAT.MOUVEMENT_A_GAUCHE;
        break;
      case Player.DEMANDE.ALLER_EN_HAUT:
        this.etat = Player.ETAT.MOUVEMENT_EN_HAUT;
        break;
      case Player.DEMANDE.ALLER_EN_BAS:
        this.etat = Player.ETAT.MOUVEMENT_EN_BAS;
        break;
    }

  }

  animer(secondeEcoulee){
    switch(this.etat){
      case Player.ETAT.ATTENTE:
        //rien faire
        break;
      case Player.ETAT.MOUVEMENT_A_DROITE:
        this.avancer(secondeEcoulee);
        break;
      case Player.ETAT.MOUVEMENT_A_GAUCHE:
        this.reculer(secondeEcoulee);
        break;
      case Player.ETAT.MOUVEMENT_EN_HAUT:
        this.monter(secondeEcoulee);
        break;
      case Player.ETAT.MOUVEMENT_EN_BAS:
        this.descendre(secondeEcoulee);
        break;
    }
  }

  determinerRectangleOccupe(){
    return {
      x: this.spritePlayer.x,
      y: this.spritePlayer.y,
      largeur: this.spritePlayer.getBounds().width,
      hauteur: this.spritePlayer.getBounds().height
    };
  }
}

Player.ETAT = {
  ATTENTE : 0,
  MOUVEMENT_A_DROITE : 1,
  MOUVEMENT_A_GAUCHE : 2,
  MOUVEMENT_EN_HAUT : 3,
  MOUVEMENT_EN_BAS : 4
}
Player.DEMANDE = {
  ATTENDRE : 0,
  ALLER_A_DROITE : 1,
  ALLER_A_GAUCHE : 2,
  ALLER_EN_HAUT : 3,
  ALLER_EN_BAS : 4
}
Player.VITESSE_PIXEL_SECONDE = 500;