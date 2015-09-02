var angle = 1*Math.PI/180;
var canvasRoulette;
var canvasLoopIt2DContext;
var contxt;
var imgroulette;

var main = function() {
  canvasRoulette = document.getElementById('canvasRoulette');
  canvasLoopIt2DContext = canvasRoulette.getContext('2d');
  // use a shorter name for easyness
  contxt=canvasLoopIt2DContext;

  imgroulette = new Image();
  imgroulette.src = "./img/roulette.jpg";
  
  contxt.scale(0.5,0.5);
  contxt.translate(500,500);
  //contxt.drawImage(imgroulette,-504,-504);

}

var rotate_roulette = function() {
  contxt.rotate(angle);
  contxt.drawImage(imgroulette,-504,-500);
  
  requestAnimId = window.requestAnimationFrame(rotate_roulette);
   
}


window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 requestAnimId = window.requestAnimationFrame(rotate_roulette);
  //drawboard();
});
 
