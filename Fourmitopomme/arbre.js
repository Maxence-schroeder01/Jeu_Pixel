class arbre{
  constructor(scene){

    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/Dove.png";
  }

  creerSprite(evenementload){
    console.log("Image ennemie.png chargée");

    let spriteSheetDove = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 32,
        height: 32.4
      },

      animations:{
        marcher: [0,1,2]
      }
    });
    console.log("SpriteSheetennemie créée");

    this.spritedove = new createjs.Sprite(spriteSheetDove,"marcher");
    this.spritedove.framerate = 7;

    this.spritedove.scaleX = this.spritedove.scaleY = 1.8;

    this.spritedove.setBounds(
      this.spritedove.x,
      this.spritedove.y,
      120 * 1,
      120 * 1);

    this.estCharge = true;
    console.log("Spritefourmi créée");

  }0

  afficher(){
    this.spritedove.x = 550;
    // Ajustement pour poser le poteau sur le sol même si l'arrière-plan est redimensionné.
    this.spritedove.y = 250 * this.scene.hauteur / 500;
    this.scene.addChild(this.spritedove);
    console.log("Spritefourmi ajoutée à la scène");
  }
  determinerRectangleOccupe(){
    return {
      x: this.spritedove.x,
      y: this.spritedove.y,
      largeur: this.spritedove.getBounds().width,
      hauteur: this.spritedove.getBounds().height
    };
  }

  animer(secondeEcoulee){
    this.spritedove.x -= arbre.VITESSE_PIXEL_SECONDE * secondeEcoulee;
  }


}

arbre.VITESSE_PIXEL_SECONDE = 500 ;