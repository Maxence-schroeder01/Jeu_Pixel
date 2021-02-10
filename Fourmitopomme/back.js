class back{
    constructor(scene){
      this.scene = scene;
      this.conteneur = new createjs.Container();
  
      this.estChargePaysageArriere = false;
      this.shapePaysageArriere = new createjs.Shape();
      this.matricePaysageArriere = new createjs.Matrix2D();
      this.imagePaysageArriere = new Image();
      this.imagePaysageArriere.addEventListener("load", evenementloadpaysagearriere => this.creerShapePaysageArriere(evenementloadpaysagearriere));
      this.imagePaysageArriere.src = "illustration/back.jpg"
  
    }
  
    creerShapePaysageArriere(evenementloadpaysagearriere){
      this.shapePaysageArriere.graphics.beginBitmapFill(this.imagePaysageArriere, "repeat", this.matricePaysageArriere).drawRect(0,0,800,500).endStroke();
      this.estChargePaysageArriere = true;
    }
  
  
    get estCharge(){
      return this.estChargePaysageArriere;
    }
  
    afficher(){
     this.conteneur.addChild(this.shapePaysageArriere);

     this.conteneur.scaleX = this.scene.largeur / 800;
     this.conteneur.scaleY = this.scene.hauteur / 500;
  
     this.scene.addChild(this.conteneur);
    }
  
    animer(secondeEcoulee){
     let correctionVitesseRelative = 800 / this.scene.largeur;
     this.matricePaysageArriere.translate(-back.VITESSE_PIXEL_SECONDE.PAYSAGE_ARRIERE * secondeEcoulee * correctionVitesseRelative, 0);

    }
  }
  
  back.VITESSE_PIXEL_SECONDE = {
    PAYSAGE_ARRIERE : 15,
  }