class pomme{
    constructor(scene){
      this.scene = scene;
      this.pomme = new createjs.Shape();
      this.pomme.graphics.beginFill("blue").drawCircle(0, 0, 70);
      this.pomme.x = 500;
      this.pomme.y = 500;
    }
  
    afficher(){
      console.log("pomme ajoutée à la scène");
      this.scene.addChild(this.pomme);
      this.scene.update();
    }
    suivre(x, y){
        var deltaX = x - this.pomme.x;
        var deltaY = y - this.pomme.y;
    
        this.pomme.x += deltaX/2;
        this.pomme.y += deltaY/2;
      }
      determinerCercleOccupe(){
        return {
          x: this.pomme.x,
          y: this.pomme.y,
          rayon: this.rayon
        };
      }
}
    