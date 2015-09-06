"use strict";

function OxyGameWorld() {
  // Creating all objects of world here
    console.log("OxyWorld created");

}


// Prototypes
OxyGameWorld.prototype.handleInput = function (delta) {
  // Handling input - Keyboard anf Mouse

};

OxyGameWorld.prototype.update = function (delta) {
  // Updating the World
};

OxyGameWorld.prototype.draw = function () {
  // Drawing the world
    console.log("World.draw function() called");
    Canvas2D.drawImage(sprites.logo, new Vector2(20,20),0,0.2);
    Canvas2D.drawText("Welcome to Oxy !", new Vector2(10, 20), Color.black);
};

OxyGameWorld.prototype.reset = function () {
  // Reset world function

};

//OxyGameWorld.prototype.isOutsideWorld = function (position) {
//    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
//};
