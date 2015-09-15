"use strict";

function TileMap() {
    OxyTileObject.call(this, sprites.tileset);
    this.position = new Vector2(20, 20);
    this.origin = this.center;
    this.visible = false;
}

TileMap.prototype = Object.create(OxyTileObjects.prototype);


TileMap.prototype.reset = function () {
    this.position = new Vector2(20, 20);
};


function TileSand() {
    OxyTileObject.call(this, sprites.tileset,this.sourceRect);
    this.sourceRect = new Rectangle(64,160,32,32);
    console.log("TileSand created");
}
TileSand.prototype = Object.create(OxyTileObject.prototype);


function TileWater() {
    OxyTileObject.call(this, sprites.tileset);
}
TileWater.prototype = Object.create(OxyTileObject.prototype);

function TileGrass() {
    OxyTileObject.call(this, sprites.tileset);
}
TileGrass.prototype = Object.create(OxyTileObject.prototype);

function TileRock() {
    OxyTileObject.call(this, sprites.tileset);
}
TileRock.prototype = Object.create(OxyTileObject.prototype);
