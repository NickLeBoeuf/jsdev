
var canvasOxy;
var canvasOxy2DContext;
var contxt;

var main = function() {
  canvasOxy = document.getElementById('canvasOxy');
  canvasOxy2DContext = canvasOxy.getContext('2d');
  // use a shorter name for easyness
  contxt=canvasOxy2DContext;

  imglogo = new Image();
  imglogo.src = "./img/oxy_logo.jpg";
  
  //contxt.scale(0.5,0.5);
  //contxt.translate(500,500);
  contxt.save();
  contxt.scale(0.2,0.2);
  contxt.drawImage(imglogo, 0, 0);
  contxt.restore();
  
}

//var rotate_roulette = function() {
  //contxt.rotate(angle);
  //contxt.drawImage(imgroulette,-504,-500);
  
  //angle=angle-0.00001;
  //requestAnimId = window.requestAnimationFrame(rotate_roulette);
   
//}


window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(rotate_roulette);
  //drawboard();
});
 
