
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

function setridgewith(vector,drawit) {
  var r = vector.row;
  var c = vector.col;
  switch(vector.dir) {
    case "up":
      cell[r-1][c].ridge.left=1;
      if (drawit===1) { cell[r-1][c].draw();}
      break;
    case "right":
      cell[r][c].ridge.up=1;
      if (drawit===1) { cell[r][c].draw();}
      break;
    case "down":
      cell[r][c].ridge.left=1;
      if (drawit===1) { cell[r][c].draw();}
      break;
    case "left":
      cell[r][c-1].ridge.up=1;
      if (drawit===1) { cell[r][c-1].draw();}
      break;
  }
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
Cell.prototype.draw = function() {
  // ox and oy are the origin of the upper left cell of the board
  var ox = 50;
  var oy = 50;
  var w = this.pwidth;
  var wx2 = w/2-5;  // 5 is because we use a 20 px font
  var wy2 = w/2+5;
  contxt.font="20px Verdana";
  var ul = {x:ox+w*this.col,y:oy+w*this.row};
  var ur = {x:ox+w*this.col+w,y:oy+w*this.row};
  var dl = {x:ox+w*this.col,y:oy+w*this.row+w};
  var dr = {x:ox+w*this.col+w,y:oy+w*this.row+w};
  contxt.fillStyle = "black";
  contxt.fillText(this.number.toString(), ox+w*this.col + wx2 ,oy+w*this.row + wy2);
  drawline(ul.x,ul.y,ur.x,ur.y, this.ridge.up);
  drawline(ur.x,ur.y,dr.x,dr.y, this.ridge.right);
  drawline(dl.x,dl.y,dr.x,dr.y, this.ridge.down);
  drawline(dl.x,dl.y,ul.x,ul.y, this.ridge.left);
}


// Global function to draw lines easily
function drawline(sx,sy,dx,dy,color) {
  contxt.beginPath();
  if (color==1) { contxt.fillStyle="black"} else {contxt.fillStyle="#DDDDDD"}
  contxt.fillRect(sx,sy,(dx-sx)+3,(dy-sy)+3);  
  contxt.stroke();
}
 

// Global variables ,and global common ridge arrays creation + cells
// IMPORTANT: Note that the upper left cell is cell[1][1].
// but we define addtionnal columns and rows all around the table
// to avoid painful test at the borders
var sizer = 4; var sizec = 4;
var cell =[];
var ridgeh =[];
var ridgev =[];
for (var r=0;r<=sizer+2;r++)
{
  ridgeh[r]=[];
  ridgev[r]=[];
  for (var c=0;c<=sizec+2;c++)
  {
    ridgeh[r][c]= 0;
    ridgev[r][c]= 0;
  }
}  
// Initialisation of the board with creation of cells
for (var r=0;r<=sizer+1;r++)
{
   cell[r]=[];
   for (var c=0;c<=sizec+1;c++)
   {
     cell[r][c]= new Cell(r,c);
     cell[r][c].ridge = new Ridge(r,c);
   }
 }  




// randint function : return an integer between 0 and int-1
function randint(int) { return Math.floor((Math.random()*int)); }



// Vector Object definition
function Vector(row,col,dir) {
  this.row = row; //varr[0];
  this.col = col; //varr[1];
  this.dir = dir; //varr[2];
  this.oppositedir = opposite(dir);
  Object.defineProperty(this, "val", {
    get: function() {return [this.row,this.col,this.dir]},
    set: function(val) {console.log('set called with',val);
      this.row=val[0];
      this.col=val[1];
      this.dir=val[2];
      this.oppositedir=opposite(this.dir)
      }   
    });
    
  function opposite(direction) {
    switch(direction) {
      case "up": return "down"; break;
      case "right": return "left"; break;
      case "down": return "up"; break;
      case "left": return "right"; break;
    }
  }
}  

// Define a function that return the dest according to the dir


function choosedirection(arrayofpossibledirections, location, vectorcomingfrom) {
 // This function will return the direction to go to, depending on the current location
 // and where the line is coming from. It will use also the common ridge arrays to do the statistics.
 // TODO: For the moment, the direction is chosen randomly
  console.log("array of possible is:", arrayofpossibledirections.toString());
  var randnum = randint(arrayofpossibledirections.length);
  return arrayofpossibledirections[randnum];
 }


// Main function, launched at html page loading

var main = function() {
  var looplength = 0; // initial length of the loop is zero

  // Generate Loop of minlength function
  function generateloop(minlength) {
    // Choose start point randomly in the board
    var start = {r:randint(sizer+1)+1, c:randint(sizec+1)+1};
    console.log("start in", start.r, start.c);
    vector = new Vector(start.r,start.c, choosedirection.call(null,['up','down','right','left'], [start.r, start.c] ));
    console.log("build with vector : ", vector);
    var minlen=12;
    build(vector,minlen);
  }
  

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
    
    // 1
    var drawresult = drawtest(vector);
    console.log("drawtest returned:",drawresult);
    draw = drawresult[0];
    if (draw === 'OK') { dr = drawresult[1]; dc = drawresult[2];}  // Memorize the destination
    
    // 2
    if (draw === 'STOP' && looplength >= minlength) {return 'DONE'}
    else if (draw === 'STOP' && looplength < minlength) {return 'CANT'}
    else if (draw === 'CANT') {return 'CANT'}
    // 2da
    else if (draw === 'OK') {
      looplength = looplength + 1;       // increase loop length
      // 2db draw the ridge
      setridgewith(vector,1); // The second parameter set to 1 indicates we want to redraw the cell immediatlely
      // 2dc prepare the array of possible directions
      remainingdirections = ['up','right','down','left'];
      console.log('init remainingdirections:',remainingdirections.toString());
      // remove the direction we're coming from (so it is the #! opposite of vector.dir)
      remainingdirections.splice(remainingdirections.indexOf(vector.oppositedir),1);
      // 2dd now loop into these directions and continue the loop if possible.
      console.log('go to these dirs:',remainingdirections.toString(), "length is",remainingdirections.length);
      while (remainingdirections.length != 0) {
        godir=choosedirection(remainingdirections, [dr,dc] , vector);
        console.log('chosen to go to ',godir);
        remainingdirections.splice(remainingdirections.indexOf(godir),1);
        }
    
    }
    
  }
  
  function drawtest(vect) {
   // this function test if we can draw in the direction of the vector (vector is a location+dir)
   // return possibilities are :
    // 2a - STOP: drawing to a corner were a unique line is already arriving : Closing the loop
    // 2c - CANT: cant build in that direction -> there's an edge, or destination is a corner with already two lines (forming L or I or -)
    // 2d - OK : can draw in that direction. (if two above don't apply, then it's OK)
    
    var r = vect.row;
    var c = vect.col;
    var d = vect.dir;
    // Test if there's an edge
    if ((c === 1 && d === 'left') ||
        (c === sizec+1 && d === 'right') ||
        (r === 1 && d === 'up') ||
        (r === sizer+1 && d === 'down'))
        {return 'CANT'};
        
    // Test if there's already a line
    if ((d === 'up' && cell[r-1][c].ridge.left===1) ||
       (d === 'down' && cell[r][c].ridge.left===1) ||
       (d === 'right' && cell[r][c].ridge.up===1) ||
       (d === 'left' && cell[r][c-1].ridge.up===1)  )
      {return 'CANT'};
    
    // Test if line arrives in a corner with already two lines (forming L or I or -)
    if ((d === 'up' && ( (cell[r-1][c].ridge.up===1 && cell[r-1][c-1].ridge.up===1) ||
                         (cell[r-2][c].ridge.left===1 && cell[r-2][c].ridge.down===1) ||
                         (cell[r-2][c-1].ridge.right===1 && cell[r-2][c-1].ridge.down===1))) ||
//                         (r>2 && (cell[r-2][c].ridge.left===1 && cell[r-2][c].ridge.down===1)) ||
//                         (r>2 && (cell[r-2][c-1].ridge.right===1 && cell[r-2][c-1].ridge.down===1)))) ||
        (d === 'down' && ( (cell[r][c-1].ridge.down===1 && cell[r][c].ridge.down===1) ||
                           (cell[r+1][c].ridge.left===1 && cell[r+1][c].ridge.up===1) ||
                           (cell[r+1][c-1].ridge.right===1 && cell[r+1][c-1].ridge.up===1))) ||
        (d === 'right' && ( (cell[r][c+1].ridge.left===1 && cell[r-1][c+1].ridge.left===1) ||
                            (cell[r-1][c+1].ridge.left===1 && cell[r-1][c+1].ridge.down===1) ||
                            (cell[r][c+1].ridge.up===1 && cell[r][c+1].ridge.left===1))) ||
        (d === 'left' && ( (cell[r][c-1].ridge.left===1 && cell[r-1][c-1].ridge.left===1) ||
                         (cell[r-1][c-2].ridge.right===1 && cell[r-1][c-2].ridge.down===1) ||
                         (cell[r][c-2].ridge.up===1 && cell[r][c-2].ridge.right===1))) )
//                         (c>2 && (cell[r-1][c-2].ridge.right===1 && cell[r-1][c-2].ridge.down===1)) ||
//                         (c>2 && (cell[r][c-2].ridge.up===1 && cell[r][c-2].ridge.right===1)))) )
      {return 'CANT'};                    
                      
    // if None of the case above applies, then line can be drawn
    // calculate the destination:
    switch(d) {
      case "up":    dr = r -1; dc = c;   break;
      case "right": dr = r;    dc = c+1; break;
      case "down":  dr = r +1; dc = c;   break;
      case "left":  dr = r;    dc = c-1; break;
    } 
    return ['OK',dr,dc];
  }

  var logoloopit;
  canvasLoopIt = document.getElementById('canvasLoopIt');
  canvasLoopIt2DContext = canvasLoopIt.getContext('2d');
  // use a shorter name for easyness
  contxt=canvasLoopIt2DContext;
  logoloopit = new Image();
  logoloopit.src = "./img/Loopit.jpg";
  contxt.drawImage(logoloopit,100,0);
  contxt.globalAlpha = 1;
  contxt.shadowColor = 'white';
  contxt.CanvasGradient = 'white';
  contxt.globalCompositeOperation = "none";
  console.log(contxt.globalCompositeOperation);
  console.log(contxt.CanvasGradient);
  
  //contxt.fillStyle = "red";
  //contxt.fillRect(10,10,100,100);
   //contxt.stroke();
  //contxt.fillStyle = "blue";
  //contxt.fillRect(50,50,100,100);
  //contxt.stroke();
  //contxt.lineWidth = 1;
  //contxt.strokeStyle = "yellow";
  //contxt.moveTo(0,75);
  //contxt.lineTo(300,75);
  //contxt.fillStyle = "yellow";
   //contxt.fillRect(0,80,300,1);
  //contxt.stroke();
  
  //// Change some values of ridges
  //cell[1][1].ridge.up=1;
  //cell[1][1].ridge.right=1;
  //cell[2][1].ridge.right=1;
////   var q=2;
////   console.log("cell21r=",cell[2][q-1].ridge.right);
////   console.log("cell22l=",cell[2][q].ridge.left);
    //cell[2][1].ridge.down=1;
  //cell[2][1].ridge.left=1;
   
  // Now draw the Board
  for (var r=1;r<=sizer;r++)
  { for (var c=1;c<=sizec;c++)
     { cell[r][c].draw();
     }
   }  
  contxt.stroke();
  


  
//  console.log("start init");
  
//   console.log(cell[2][1].ridge.down);
//   console.log(cell[3][1].ridge.up);
//   cell[2][1].ridge.down = 0;
//   console.log(cell[2][1].ridge.down);
//   console.log(cell[3][1].ridge.up);
  
 // console.log("end init");
  generateloop(10);



}



window.addEventListener('load', function() {
 main();
 //setInterval(scrollingHorizontal, 50); 
 //requestAnimId = window.requestAnimationFrame(scrollingHorizontal);
  //drawboard();
});
 
