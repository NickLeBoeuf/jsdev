//alert(" Start loopit.js");

//  Object "Cell" creation
function Cell(row,col) {
  this.row=row;
  this.col=col;
  this.number = 0;
  this.ridge = new Ridge;
  this.pwidth=40; // width in pixels for drawing in context
}

// Object Cell "draw" method
Cell.prototype.draw = function(ox,oy) {
  // ox and oy are the origin of the upper left cell of the board
  var w = this.pwidth;
  var wx2 = w/2-5;  // 5 is because we use a 20 px font
  var wy2 = w/2+5;
  contxt.font="20px Verdana";
  var ul = {x:ox+w*this.col,y:oy+w*this.row};
  var ur = {x:ox+w*this.col+w,y:oy+w*this.row};
  var dl = {x:ox+w*this.col,y:oy+w*this.row+w};
  var dr = {x:ox+w*this.col+w,y:oy+w*this.row+w};
  contxt.fillText(this.number.toString(), ox+w*this.col + wx2 ,oy+w*this.row + wy2);
  drawline(ul.x,ul.y,ur.x,ur.y, this.ridge.up);
  drawline(ur.x,ur.y,dr.x,dr.y, this.ridge.right);
  drawline(dl.x,dl.y,dr.x,dr.y, this.ridge.down);
  drawline(dl.x,dl.y,ul.x,ul.y, this.ridge.left);
}

function drawline(sx,sy,dx,dy,color) {
  contxt.beginPath();
  if (color==1) { contxt.strokeStyle="#FF0000"} else {contxt.strokeStyle="#AAAAAA"}
  contxt.moveTo(sx,sy);
  contxt.lineTo(dx,dy);
  contxt.stroke();
}
 
// Object Ridge creation
function Ridge() {
 this.up = 0; 
 this.right =0;
 this.down=0;
 this.left=0;
}

// Function to draw the board on the screen
// NOT USED
var drawboard = function() {
  contxt.strokestyle="#0000FF";
  contxt.rect(100,100,200,25);
  contxt.rect(300,300,200,25);
  contxt.stroke();
}  


var cell =[];
var sizer = 4; var sizec = 4;

var main = function() {
  var logoloopit;
  canvasLoopIt = document.getElementById('canvasLoopIt');
  canvasLoopIt2DContext = canvasLoopIt.getContext('2d');
  // use a shorter name for easyness
  contxt=canvasLoopIt2DContext;
  logoloopit = new Image();
  logoloopit.src = "./img/Loopit.jpg";
  canvasLoopIt2DContext.drawImage(logoloopit,100,0);

  // Initialisation of the board with creation of cells
  for (var r=1;r<=sizer;r++)
  {
     cell[r]=[];
     for (var c=1;c<=sizec;c++)
     {
       cell[r][c]= new Cell(r,c);
     }
   }  
 
  // Change some values of ridges
  cell[1][1].ridge.up=1;
  cell[1][1].ridge.right=1;
  cell[2][1].ridge.right=1;
  cell[2][1].ridge.down=1;
  cell[2][1].ridge.left=1;
   
  // Additionnal identical values
  cell[1][2].ridge.left=1;
  cell[2][2].ridge.left=1;
  cell[3][1].ridge.up=1;
 
  // Now draw the Board
  for (var r=1;r<=sizer;r++)
  { for (var c=1;c<=sizec;c++)
     { cell[r][c].draw(50,50);
     }
   }  
  contxt.stroke();
  
  
  console.log("start init");
  
  console.log(cell[3][2].ridge.down);
  
  console.log("end init");




}



window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);
  //drawboard();
});
 
