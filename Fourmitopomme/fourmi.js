class fourmi{
  constructor(scene){

    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerSprite(evenementload));
    this.image.src = "illustration/fourmi1.png";
  }

  creerSprite(evenementload){
    console.log("Image fourmi1.png chargée");

    let spriteSheetfourmi = new createjs.SpriteSheet({
      images: [this.image],

      frames:{
        width: 120,
        height: 120
      },

      animations:{
        voler: [0,1]
      }
    });
    console.log("SpriteSheetfourmi créée");

    this.spritefourmi = new createjs.Sprite(spriteSheetfourmi,"voler");

    this.spritefourmi.scaleX = this.spritefourmi.scaleY = 1;

    this.spritefourmi.setBounds(
      this.spritefourmi.x,
      this.spritefourmi.y,
      120 * 1,
      120 * 1);

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