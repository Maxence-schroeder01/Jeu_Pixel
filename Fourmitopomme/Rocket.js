class Rocket{
  constructor(scene){

    this.scene = scene;
    this.shoot;
    this.estCharge = false;
    this.rocket = new Image();
    this.player = new Player(this.scene);
    this.rocket.addEventListener("load", evenementloadR => this.creerMissile(evenementloadR));
    this.rocket.src = "illustration/missile.png";
  }
  creerMissile(evenementloadR){
    console.log("Image missile début chargement");
    this.missile = new createjs.Bitmap(this.rocket);
    this.missile.scaleX = this.missile.scaleY = 0.25;
    this.missile.setBounds(
      this.missile.x,
      this.missile.y,
      512 * 0.5,
      217 * 0.5);
    this.estCharge = true;
    console.log("Image missile chargée");
  }

  afficher(rocket){
    this.missile.x = rocket.x + 100;
    this.missile.y = rocket.y + 55;
    this.scene.addChild(this.missile);
    if (this.shoot == true) {
      this.tirer(secondeEcoulee)
    }
    console.log("SpritePlayer ajoutée à la scène");
  }


  tirer(secondeEcoulee){
    this.missile.x += Rocket.VITESSE_PIXEL_SECONDE * secondeEcoulee;
  }


  determinerRectangleOccupe(){
    return {
      x: this.missile.x,
      y: this.missile.y,
      largeur: this.missile.getBounds().width,
      hauteur: this.missile.getBounds().height
    };
  }
}
Rocket.VITESSE_PIXEL_SECONDE = 9000;