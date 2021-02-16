var Fourmi = function(scene){

  var imagefourmi;
  var spriteSheetfourmi;
  var spritefourmi;
  var charge;


  var initialiser = function(){
    imagefourmi = new Image();
    imagefourmi.onload = creerSpriteSheet;
    imagefourmi.src = "illustration/Lightning.png";
    charge = false;
  }


  var creerSpriteSheet = function(evenementOnload){
    console.log("Image oiseau-vol.png chargée");

    spriteSheetfourmi = new createjs.SpriteSheet({
      images: [imagefourmi],
      frames:{
        width: 32,
        height: 32.5
      },
      animations:{
        voler: [0,1,2]
      }
    });
    console.log("SpriteSheetfourmi créée");

    creerSprite();
  }
  var creerSprite = function(){
    spritefourmi = new createjs.Sprite(spriteSheetfourmi,"voler");
    spritefourmi.scaleX = spritefourmi.scaleY = 0.5;
    spritefourmi.setBounds(
      spritefourmi.x,
      spritefourmi.y,
      700 * 0.5,
      600 * 0.5);
    console.log("Spritefourmi créée");

    charge = true;
    //afficher();
  }

  this.afficher = function(){
    scene.addChild(spritefourmi);
    console.log("Spritefourmi ajoutée à la scène");
  }

  this.getRectangle = function(){
    var rectangle = {
      x: spritefourmi.x,
      y: spritefourmi.y,
      width: spritefourmi.getBounds().width,
      height: spritefourmi.getBounds().height
    };

    return rectangle;
  }

  this.disparaitre = function(){
    spritefourmi.visible = false;
  }

  this.faireAparaitre = function(){
    spritefourmi.visible = true;
  }

  this.estCharge = function(){
    return charge;
  }
 
  this.estCharge = function(){
    return charge;
  }

  this.avancer = function(){
    spritefourmi.x += 10;
  }

  this.reculer = function(){
    spritefourmi.x -= 10;
  }
  this.descendre = function(){
    spritefourmi.y += 10;
  }
  this.monter = function(){
    spritefourmi.y -= 10;
  }

  initialiser();
}