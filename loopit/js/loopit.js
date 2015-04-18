//alert(" Start loopit.js");

//  Object "Cell" creation
function Cell(row,col) {
  this.row=row;
  this.col=col;
  var value = 0;
  var ridge = new Ridge;
}

function Ridge() {
 var up = 0;
 var right =0;
 var down=0;
 var left=0;
}




var initialisation = function() {
  var logoloopit;
  canvasLoopIt = document.getElementById('canvasLoopIt');
  canvasLoopIt2DContext = canvasLoopIt.getContext('2d');
  logoloopit = new Image();
  logoloopit.src = "./img/Loopit.jpg";
  canvasLoopIt2DContext.drawImage(logoloopit,100,0);

  // Initialisation of the board with creation of cells
  var cell =[];
  var sizer = 4; var sizec = 4;
  for (var r=1;r<=sizer;r++)
  {
     cell[r]=[];
     for (var c=1;c<=sizec;c++)
     {
       cell[r][c]= new Cell(r,c);
     }
   }  

 
  console.log("start init");
  
  console.log(cell[3][2]);
  
  console.log("end init");
}




window.addEventListener('load', function() {
 initialisation();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);

});
 
