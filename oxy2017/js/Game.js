"use strict";

var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Game_Singleton() {
    this._totalTime = 0;
    this._size = null;
    this._spritesStillLoading = 0;
    this._totalSprites = 0;
    this.gameWorld = null;
    this.link = this;
    this.identity="Game_Singleton";
    // for debugging
    this.log = "";
}

Object.defineProperty(Game_Singleton.prototype, "totalTime",
    {
        get: function () {
            return this._totalTime;
        }
    });

Object.defineProperty(Game_Singleton.prototype, "size",
    {
        get: function () {
            return this._size;
        }
    });

Object.defineProperty(Game_Singleton.prototype, "screenRect",
    {
        get: function () {
            return new Rectangle(0, 0, this._size.x, this._size.y);
        }
    });

Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var _this = this;
    var image = new Image();
    image.src = imageName;
    this._spritesStillLoading += 1;
    this._totalSprites += 1;
    image.onload = function () {
        _this._spritesStillLoading -= 1; // A nested function don't see the "this", so we must use a local _this instead
        //console.log("Loaded sprite: " + imageName + " sprites still loading="+_this._spritesStillLoading);
    };

    return image;
};

Game_Singleton.prototype.start = function (divName, canvasName, x, y) { 
    this._size = new Vector2(x, y);
    Canvas2D.initialize(divName, canvasName);
    console.log("Launching loadAssets"); 
    this.loadAssets();
    this.assetLoadingLoop();
};

Game_Singleton.prototype.initialize = function () {
};

Game_Singleton.prototype.loadAssets = function () {
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    Canvas2D.clear();
    Canvas2D.drawText(Math.round((this._totalSprites - this._spritesStillLoading) /
        this._totalSprites * 100) + "%");

    if (this._spritesStillLoading > 0)
        requestAnimationFrame(this.assetLoadingLoop.bind(this));
    else {
        this.initialize();
        requestAnimationFrame(this.mainLoop.bind(this));
    }

};

Game_Singleton.prototype.mainLoop = function () {
    //console.log("in MAINLOOP");
    var delta = 1 / 60;
    this._totalTime += delta;
    this.gameWorld.handleInput(delta);
    this.gameWorld.update(delta);
    // TODO : this can be optimized, be clearing only what's needed
    Canvas2D.clear();
    this.gameWorld.draw();
    // displaying the number of touches
    Canvas2D.drawText(this.log);

    Keyboard.reset();
    Mouse.reset();
    Touch.reset();

    requestAnimationFrame(this.mainLoop.bind(this));
};

var Game = new Game_Singleton();


// #@ This is very useful tool to implement inheritance easily, 
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

// Trials


//function Game_Nick() {
    //this.identity = "GameNick";
//}

//Game_Nick.prototype.start = function(message) {
  //console.log("in "+this.identity+".start , received : "+message); 
  ////var _this = this;
  //console.log("Launching nested now");
  //this.nested();
//}

//Game_Nick.prototype.nested = function() {
  //console.log("in "+this.identity+".nested");
  //console.log("Launching nested from nested now");
  //this.nested();
//}


//var Game = new Game_Nick();
//Game.identity = "Nick";


