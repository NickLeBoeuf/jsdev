"use strict";

var ID = {};
var sprites = {};
var sounds = {};

// Here we are overloading Game object functions: loadAssets and initialize

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("./img/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("./sounds/" + sound, looping);
    };

    // Loading / Initializing sprites
    sprites.oxylogo = loadSprite("oxy_logo.jpg");
    sprites.tyrianset = loadSprite("tyrian_tiles.png");
    sprites.tileset = loadSprite("terrain.png");

    // Loading / Initializing sounds
    // no sound for the moment
};

Game.initialize = function () {

    
    console.log("Initialize Game"); 
    // define the layers
    ID.layer_background = 1;
    ID.layer_tiles = 10;
    ID.layer_objects = 20;
    ID.layer_objects_1 = 21;
    ID.layer_objects_2 = 22;
    ID.layer_overlays = 30;
    ID.layer_overlays_1 = 31;
    ID.layer_overlays_2 = 32;

    // define object IDs

    ID.grid = 1;
    ID.player = 2;
    ID.playingField = 3;
    ID.gamezone1 = 4;

    // create the game world
    console.log("creating Game World");
    //#@Game.gameWorld = new OxyGameWorld();
};
