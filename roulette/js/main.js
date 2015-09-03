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
  angle = 0;
  angle_increment = 0.1;
  

}

var rotate_roulette = function() {
 
  contxt.save();
  contxt.rotate(angle);
  contxt.drawImage(imgroulette,-504,-500);
  angle = angle + angle_increment  ;
  if (angle_increment > 0) 
    angle_increment = angle_increment - 0.0003;
  else 
    angle_increment = 0;

  
  contxt.restore();
  
  contxt.clearRect(-480,-500,300,80);
  contxt.fillText(angle.toString(), -480, -480);
  contxt.fillText(angle_increment.toString(), -480, -450);
  contxt.font="20px Verdana";
  contxt.fillStyle = "black";
  contxt.stroke();
  
  
  requestAnimId = window.requestAnimationFrame(rotate_roulette);
   
}


window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 requestAnimId = window.requestAnimationFrame(rotate_roulette);
  //drawboard();
});
 
