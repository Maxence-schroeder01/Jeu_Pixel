class pomme{
    constructor(scene){
      this.scene = scene;
      this.pomme = new createjs.Shape();
      this.pomme.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
      this.pomme.x = 100;
      this.pomme.y = 100;
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
  }