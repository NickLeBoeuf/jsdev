"use strict";

function OxyGrid(width, height) {
   this.parent = null;
   this.width = width;
   this.height = height;
   this.position = new Vector2;
   this.tiles = new Array();
   this.map = new Array(width*height);
   this.tile_width;
   this.tile_height;

 }



OxyGrid.prototype.reset = function () {

};


OxyGrid.prototype.initTiles = function () {
  this.tile_width=32;
  this.tile_height=32;
  var tile_posx=0;
  var tile_posy=160;
  var tile_number=30;
  
  for (var i=0; i<tile_number;i++) {
    this.tiles[i] = new OxyTileObject(sprites.tileset,new Rectangle(i*this.tile_width+tile_posx,tile_posy,this.tile_width,this.tile_height));
   }
 
};


OxyGrid.prototype.initMap = function () {
  for (var x=0; x<this.width;x++) {
    for (var y=0; y<this.height;y++) {
        if (x===0 || y===0 || x===this.width-1 || y===this.height-1) 
          this.map[x+y*this.width] = 27; 
        else
        if ((x>(this.width/2)-4) && (x<(this.width/2)+4) && (y>(this.height/2)-2) && (y<(this.height/2)+2))
          this.map[x+y*this.width] = 15; 
        else
        this.map[x+y*this.width] = Math.floor(Math.random() * 9);
    }
  }
  
};   



OxyGrid.prototype.draw = function (position, width, height, mapposition) {
  // position is the location where to draw the Map in Pixels, on Canvas
  // mapposition is the location in the map to start drawing in the Zone
  
  
  var pos=position.copy();
  var xpos =pos.x; var ypos=pos.y;
  var xmap = Math.floor(mapposition.x/this.tile_width);
  var ymap = Math.floor(mapposition.y/this.tile_height);
  var xoffset =  mapposition.x%this.tile_width;
  var yoffset =  mapposition.y%this.tile_height;
  
  xpos -= xoffset;
  ypos -= yoffset;
  var maxwidth = Math.floor(width/this.tile_width)+1;
  var maxheight = Math.floor(height/this.tile_height)+1;
  //console.log("maxw="+width+"%"+this.tile_width+"="+maxwidth);
  for (var x=0; x<maxwidth;x++) {
    for (var y=0; y<maxheight;y++) {
        this.tiles[this.map[(x+xmap)+(y+ymap)*this.width]].draw(new Vector2(xpos+this.tile_width*x,ypos+this.tile_height*y)); 
    }
  }  
}



OxyGrid.prototype.drawclip = function (position, width, height) {

//  var rect = new Rectangle(position.x, position.y+height, width, this.tile_height);
 // rect.draw();
  
 
  var rect = new Rectangle(position.x-this.tile_width,
                           position.y-this.tile_height,
                           this.tile_width, height+this.tile_height*2);
  rect.draw();
  rect.x += width+this.tile_width;
  rect.draw();
  rect.width=width;rect.height=this.tile_height;rect.x=position.x;
  rect.draw();
  rect.y+=height+this.tile_height;
  rect.draw();
  
 // rect = new Rectangle(position, width, height);  rect.draw();
  //rect = new Rectangle(position, this.tile_width, height);  rect.draw();
 // rect = new Rectangle(position, this.tile_width, height);  rect.draw();

  
    
}  
