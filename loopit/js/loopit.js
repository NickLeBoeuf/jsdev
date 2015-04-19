//alert(" Start loopit.js");

// Object Ridge creation
function Ridge(row,col) {
  this.row = row; 
  this.col = col;
  var up = null;
  // Define Getters and setters of the ridge, filling the RidgeH/V commmon Arrays.
  Object.defineProperty(this, "up", {
    get: function() {return ridgeh[row][col];},
    set: function(val) {ridgeh[row][col]=val;  }   });
  Object.defineProperty(this, "down", {
    get: function() {return ridgeh[row+1][col];},
    set: function(val) {ridgeh[row+1][col]=val;  }   });
  Object.defineProperty(this, "left", {
    get: function() {return ridgev[row][col];},
    set: function(val) {ridgev[row][col]=val;  }   });
  Object.defineProperty(this, "right", {
    get: function() {return ridgev[row][col+1];},
    set: function(val) {ridgev[row][col+1]=val;  }   });
}
 
 
//  Object "Cell" creation
function Cell(row,col) {
  this.row=row;
  this.col=col;
  this.number = 0;
  this.ridge = null;
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


// Global function to draw lines easily
function drawline(sx,sy,dx,dy,color) {
  contxt.beginPath();
  if (color==1) { contxt.strokeStyle="#FF0000"} else {contxt.strokeStyle="#AAAAAA"}
  contxt.moveTo(sx,sy);
  contxt.lineTo(dx,dy);
  contxt.stroke();
}
 



// Global variables ,and global common ridge arrays creation
var sizer = 4; var sizec = 4;
var cell =[];
var ridgeh =[];
var ridgev =[];
for (var r=1;r<=sizer+1;r++)
{
  ridgeh[r]=[];
  ridgev[r]=[];
  for (var c=1;c<=sizec+1;c++)
  {
    ridgeh[r][c]= 0;
    ridgev[r][c]= 0;
  }
}  

// Main function, launched at html page loading

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
       cell[r][c].ridge = new Ridge(r,c);
     }
   }  
 
  // Change some values of ridges
  cell[1][1].ridge.up=1;
  cell[1][1].ridge.right=1;
  cell[2][1].ridge.right=1;
  cell[2][1].ridge.down=1;
  cell[2][1].ridge.left=1;
   
  // Additionnal identical values
 // cell[1][2].ridge.left=1;
 // cell[2][2].ridge.left=1;
 // cell[3][1].ridge.up=1;
 
  // Now draw the Board
  for (var r=1;r<=sizer;r++)
  { for (var c=1;c<=sizec;c++)
     { cell[r][c].draw(50,50);
     }
   }  
  contxt.stroke();
  
  
  console.log("start init");
  
  console.log(cell[2][1].ridge.down);
  console.log(cell[3][1].ridge.up);
  cell[2][1].ridge.down = 0;
  console.log(cell[2][1].ridge.down);
  console.log(cell[3][1].ridge.up);
  
  
  console.log("end init");




}



window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);
  //drawboard();
});
 
