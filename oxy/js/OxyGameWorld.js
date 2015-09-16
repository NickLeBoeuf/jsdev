"use strict";

function OxyGameWorld() {
  // Creating all objects of world here
    console.log("OxyWorld created");
  // Need to craete the logo object here
  this.logo = new LogoOxy();
  
  this.viewzone = { width:  200,
                   height: 250,
                   ratiolr: 0.5,
                   ratioud: 0.8,
                   coords: function(ppos) {
                     var topleft  = new Vector2( ppos.x - this.width * this.ratiolr,
                                                 ppos.y - this.height * this.ratioud);
                     var topright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
                                                 ppos.y - this.height * this.ratioud);
                   // console.log("viewzone is "+topright.x+topright.y);
                     var botleft  = new Vector2( ppos.x - this.width * this.ratiolr,
                                                 ppos.y + this.height * (1-this.ratioud));
                     var botright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
                                                 ppos.y + this.height * (1-this.ratioud));
                     // TODO: the (topright.x-topleft.x),(botright.y-topright.y) are in fact width and height
                     return new Rectangle(topleft.x, topleft.y ,(topright.x-topleft.x),(botright.y-topright.y));                                                
                   }                 
                   }
                   
  //this.viewzone = new viewzone2;                   
  this.tilecup = new OxyTileObject(sprites.tileset,new Rectangle(96,192,32,64));
  
  this.thegrid = new OxyGrid(20,15);
  this.thegrid.initTiles();
  this.thegrid.initMap();
}


// Prototypes
OxyGameWorld.prototype.handleInput = function (delta) {
  // Handling input - Keyboard anf Mouse
  this.logo.handleInput(delta);
};

OxyGameWorld.prototype.update = function (delta) {
  // Updating the World
  this.logo.update(delta);
};

OxyGameWorld.prototype.draw = function () {
  // Drawing the world
    Canvas2D.drawText("Welcome to Oxy !", new Vector2(10, 20), Color.black);
    
    //logoloc = logoloc.addtoTo(logoveloc);
    //this.tilecup.draw(new Vector2(200,300));
     
   // this.thegrid.update();
    this.thegrid.draw();
  
    this.logo.draw(); 

    var test = this.viewzone.coords(this.logo.position);
//    console.log(test);
//    Canvas2D.drawText("viewzone pos:", new Vector2(10, 480), new Vector2, Color.black);
    Canvas2D.drawText("viewzone pos:"+test.x+" "+test.y+" "+test.width+" "+test.height, new Vector2(10, 480), new Vector2, Color.black);

};

OxyGameWorld.prototype.reset = function () {
  // Reset world function
    this.logo.reset();
};

//OxyGameWorld.prototype.isOutsideWorld = function (position) {
//    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
//};
