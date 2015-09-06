"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("./img/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("./sounds/" + sound, looping);
    };

    // Loading / Initializing sprites
    sprites.logo = loadSprite("oxy_logo.jpg");

    // Loading / Initializing sounds
    // no sound for the moment
};

Game.initialize = function () {

    // create the game world
    console.log("creating Game World");
    Game.gameWorld = new OxyGameWorld();
};
