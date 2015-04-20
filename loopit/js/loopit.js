
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

// randint function : return an integer between 0 and int-1
function randint(int) { return Math.floor((Math.random()*int)); }

// Generate Loop of minlength function
function generateloop(minlength) {
  // Choose start point randomly in the board
  var start = {r:randint(sizer)+1, c:randint(sizec)+1};
  console.log("start in", start.r, start.c);
}

var vector = function(row,col,dir) {
  self.row = row;
  self.col = col;
  self.dir = dir;
}
// Define a function that return the dest according to the dir


// build function : the function at the heart of the loop creation
// It is a function called recursively.
function build(vector, minlength) {
  // 1 - test if we can draw if the direction of the vector, using drawtest function
  // 2 - drawtest will return -> OK, CANT, STOP (loop is closed)
  // 2a - STOP: if loop is closed and long enough -> build()return DONE (loop is looped)
  // 2b - STOP: if loop is closed and too short -> build()return CANT (cant build there, dead end)
  // 2c - CANT: we cant build in that direction -> build()return CANT (cant build there, dead end)
  // 2d - OK : 2da : we can draw in that direction. so let's call build again:
  //           2db : set the ridge in the board
  //           2dc : Create an array of 4 directions, removing directly the one we are coming from
  //           2dd : Loop into the array directions (using a while loop)
  //           2de :   - call the chooseDirection function (with a smart algorithm...;)
  //           2df :   - remove the chooosenDirection from the Direction Array
  //           2dg :   - call the build function again 
  //           2dh :   - test the return of the build -> if CANT, then loop
  //                                                  -> if DONE then build()return DONE
  //           2di :   - if there's no more direction to loop with, then build()return CANT
  // Use splice() and indexOf() of the Array object to remember the directions that have not been searched yet
  
}

function choosedirection(arrayofpossibledirections, location, vectorcomingfrom) {
 // This function will return the direction to go to, depending on the current location
 // and where the line is coming from. It will use also the common ridge arrays to do the statistics.
 }

function drawtest(vector) {
 // this function test if we can draw in the direction of the vector (vector is a location+dir)
 // return possibilities are :
  // 2a - STOP: drawing to a corner were a unique line is already arriving : Closing the loop
  // 2c - CANT: cant build in that direction -> there's an edge, or destination is a corner with already two lines (forming L or I or -)
  // 2d - OK : can draw in that direction. (if two above don't apply, then it's OK)
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
   
  // Now draw the Board
  for (var r=1;r<=sizer;r++)
  { for (var c=1;c<=sizec;c++)
     { cell[r][c].draw(50,50);
     }
   }  
  contxt.stroke();
  
  
  console.log("start init");
  
//   console.log(cell[2][1].ridge.down);
//   console.log(cell[3][1].ridge.up);
//   cell[2][1].ridge.down = 0;
//   console.log(cell[2][1].ridge.down);
//   console.log(cell[3][1].ridge.up);
  
  console.log("end init");
  generateloop(10);



}



window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);
  //drawboard();
});
 
