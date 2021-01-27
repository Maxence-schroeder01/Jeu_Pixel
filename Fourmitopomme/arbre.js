class arbre{
  constructor(scene){
    this.scene = scene;
    this.estCharge = false;
    this.image = new Image();
    this.image.addEventListener("load", evenementload => this.creerBitmap(evenementload));
    this.image.src = "illustration/arbre.png";
  }

  creerBitmap(evenementload){
    console.log("Image arbre.png début chargement");
    this.bitmap = new createjs.Bitmap(this.image);
    this.estCharge = true;
    console.log("Image arbre.png chargée");
  }

  afficher(){
    this.bitmap.x = 150;
    this.bitmap.y = 0;
    console.log("arbre ajoutée à la scène");
    this.scene.addChild(this.bitmap);
  }

}