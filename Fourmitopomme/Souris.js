class Souris{
  constructor(scene){
    this.scene = scene;
    this.souris = new createjs.Shape();
    this.rayon = 50;
    this.souris.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, this.rayon);
    this.souris.x = 100;
    this.souris.y = 100;
  }

  afficher(){
    this.scene.addChild(this.souris);
    this.scene.update();
  }

  suivre(x, y){
    var deltaX = x - this.souris.x;
    var deltaY = y - this.souris.y;

    this.souris.x += deltaX/2;
    this.souris.y += deltaY/2;
  }

  determinersourisOccupe(){
    return {
      x: this.souris.x,
      y: this.souris.y,
      rayon: this.rayon
    };
  }

}