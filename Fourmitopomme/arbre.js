var Arbre = function(scene, position){

  var image;
  var bitmap;
  var charge;

  var initialiser = function(){
    image = new Image();
    image.onload = creerBitmap;
    image.src = "illustration/Dove.png";
    charge = false;
  }

  var creerBitmap = function(evenementOnload){
    console.log("poteau-->creerBitmap");
    bitmap = new createjs.Bitmap(image)
    bitmap.x = position.x;
    bitmap.y = position.y;
    charge = true;
  }

  this.estCharge = function(){
    return charge;
  }

  this.afficher = function(){
    console.log("poteau-->afficher");
    scene.addChild(bitmap);
  }

  this.getRectangle = function(){
    var rectangle = {
      x: bitmap.x,
      y: bitmap.y,
      width: image.width,
      height: image.height
    };

    return rectangle;
  }

  initialiser();

}