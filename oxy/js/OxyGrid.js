"use strict";

function OxyGrid(width, height) {
   this.width = width;
   this.height = height;
   this.tiles = new Array();
   this.map = new Array(width*height);
   
 }



OxyGrid.prototype.reset = function () {

};


OxyGrid.prototype.initTiles = function () {
  var tile_width=32;
  var tile_height=32;
  var tile_posx=0;
  var tile_posy=160;
  var tile_number=30;
  
  for (var i=0; i<tile_number;i++) {
    this.tiles[i] = new OxyTileObject(sprites.tileset,new Rectangle(i*tile_width+tile_posx,tile_posy,tile_width,tile_height));
   }
 
};


OxyGrid.prototype.initMap = function () {
  for (var x=0; x<this.width;x++) {
    for (var y=0; y<this.height;y++) {
        this.map[x+y*this.width] = Math.floor(Math.random() * 30);
    }
  }
};   



OxyGrid.prototype.draw = function () {
  
  for (var x=0; x<this.width;x++) {
    for (var y=0; y<this.height;y++) {
        this.tiles[this.map[x+y*this.width]].draw(new Vector2(32*x,32*y)); 
    }
  }  
}
