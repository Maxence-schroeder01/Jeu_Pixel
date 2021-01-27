class fourmi{
  constructor(scene){

    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/fourmi.png";
  }

  creerSprite(evenementload){
    console.log("Image fourmi.png chargée");

    let spriteSheetfourmi = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 533,
        height: 468
      },

      animations:{
        voler: [0,1]
      }
    });
    console.log("SpriteSheetfourmi créée");

    this.spritefourmi = new createjs.Sprite(spriteSheetfourmi,"voler");

    this.spritefourmi.scaleX = this.spritefourmi.scaleY = 0.2;

    this.spritefourmi.setBounds(
      this.spritefourmi.x,
      this.spritefourmi.y,
      533 * 0.2,
      468 * 0.2);

    this.estCharge = true;
    console.log("Spritefourmi créée");

  }

  afficher(){
    this.spritefourmi.x = 200;
    this.spritefourmi.y = 600;
    this.scene.addChild(this.spritefourmi);
    console.log("Spritefourmi ajoutée à la scène");

  }
}