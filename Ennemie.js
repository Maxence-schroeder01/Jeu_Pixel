class Ennemie{
  constructor(scene){
    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/Dove.png";
  }

  creerSprite(evenementload){
    console.log("Image chargée");
    let spriteSheetEnnemie = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 32,
        height: 32.4
      },

      animations:{
        voler: [0,1,2]
      },


    });
    console.log("SpriteSheetEnnemie créée");

    this.spriteEnnemie = new createjs.Sprite(spriteSheetEnnemie,"voler");
    this.spriteEnnemie.framerate = 15;

    this.spriteEnnemie.scaleX = this.spriteEnnemie.scaleY = 5;

    this.spriteEnnemie.setBounds(
      this.spriteEnnemie.x,
      this.spriteEnnemie.y,
      32 * 4,
      32 * 4);

    this.estCharge = true;
    console.log("SpriteEnnemie créée");

  }
  invisible(){
    this.spriteEnnemie.visible = false;
  }
  afficher(){
    this.spriteEnnemie.x = 5000;
    this.spriteEnnemie.y = 800;
    this.scene.addChild(this.spriteEnnemie);
    console.log("SpriteEnnemie  ajoutée à la scène");
  }
  animer(secondeEcoulee){
    this.spriteEnnemie.x -= Ennemie.VITESSE_PIXEL_SECONDE * secondeEcoulee;
  }

  determinerRectangleOccupe(){
    return {
      x: this.spriteEnnemie.x,
      y: this.spriteEnnemie.y,
      largeur: this.spriteEnnemie.getBounds().width,
      hauteur: this.spriteEnnemie.getBounds().height
    };
  }
}
Ennemie.VITESSE_PIXEL_SECONDE = 100;