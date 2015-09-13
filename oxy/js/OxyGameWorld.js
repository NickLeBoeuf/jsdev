"use strict";

function OxyGameWorld() {
  // Creating all objects of world here
    console.log("OxyWorld created");
  // Need to craete the logo object here
  this.logo = new LogoOxy();
  
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
   
};

OxyGameWorld.prototype.reset = function () {
  // Reset world function
    this.logo.reset();
};

//OxyGameWorld.prototype.isOutsideWorld = function (position) {
//    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
//};
