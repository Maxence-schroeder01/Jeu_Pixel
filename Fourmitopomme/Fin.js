var Fin = function(){

    var htmlVue;
  
    var initialiser = function(){
      htmlVue = document.querySelector("#page-fin").innerHTML;
    }
  
    this.afficher = function(texte){
      document.querySelector("body").innerHTML =
        htmlVue.replace("{texte-fin-partie}", texte);
    }
  
    initialiser();
  }