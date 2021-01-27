class App{
  constructor(){

    let dessin = document.getElementById("dessin");

    
    this.scene = new createjs.Stage(dessin);
    this.arbre = new arbre(this.scene);
    this.fourmi = new fourmi(this.scene);
    this.estCharge = false;

   
    createjs.Ticker.addEventListener("tick", evenementtick => this.boucler(evenementtick));
    createjs.Ticker.setFPS(5);
  }

  boucler(evenementtick){

    if(!this.estCharge && this.arbre.estCharge && this.fourmi.estCharge){
      this.estCharge = true;
      this.arbre.afficher();
      this.fourmi.afficher();
    }
    /*
    Si les ressources sont chargées, les traitements de la boucle de jeu peuvent avoir lieu.
     */
    if(this.estCharge){
      //Traitement du jeu ...
    }
    this.scene.update(evenementtick);
  }

}

new App(); // App est le main, il doit s'auto-exécuter.