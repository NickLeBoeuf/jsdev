//alert(" Start loopit.js");

var logoloopit;

var initialisation = function() {
 canvasLoopIt = document.getElementById('canvasLoopIt');
 canvasLoopIt2DContext = canvasLoopIt.getContext('2d');
 logoloopit = new Image();
 logoloopit.src = "./img/Loopit.jpg";
 canvasLoopIt2DContext.drawImage(logoloopit,100,0);

}


window.addEventListener('load', function() {
 initialisation();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);

});
 
