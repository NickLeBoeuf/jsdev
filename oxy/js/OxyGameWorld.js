"use strict";

function OxyGameWorld() {
  // Creating all objects of world here
    console.log("OxyWorld created");
  // Need to craete the logo object here
  this.logo = new LogoOxy();
  this.tilecup = new OxyTileObject(sprites.tileset,new Rectangle(96,192,32,64));
  this.tiledirt1 = new OxyTileObject(sprites.tileset,new Rectangle(32,96,32,32));
  this.tiledirt2 = new OxyTileObject(sprites.tileset,new Rectangle(128,96,32,32));
  this.tiledirt3 = new OxyTileObject(sprites.tileset,new Rectangle(224,96,32,32));
  
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
    this.logo.draw();
    this.tilecup.draw(new Vector2(200,300));
    this.tiledirt1.draw(new Vector2(100,100));
    this.tiledirt2.draw(new Vector2(132,100));
    this.tiledirt3.draw(new Vector2(164,100));
   
    this.thegrid.draw();
   
};

OxyGameWorld.prototype.reset = function () {
  // Reset world function
    this.logo.reset();
};

//OxyGameWorld.prototype.isOutsideWorld = function (position) {
//    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
//};
