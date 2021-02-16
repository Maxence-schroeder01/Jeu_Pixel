var Game= function(){

    var htmlVue;
  
    var initialiser = function(){
      htmlVue = document.querySelector("#page-jeu").innerHTML;
    }
  
    this.afficher = function(){
      document.querySelector("body").innerHTML = htmlVue;
    }
  
    initialiser();
  }