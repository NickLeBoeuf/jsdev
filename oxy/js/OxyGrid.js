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


Object.defineProperty(OxyGrid.prototype, "pixelwidth",
    { get: function () {return this.tile_width*this.width;}  } );

Object.defineProperty(OxyGrid.prototype, "pixelheight",
    { get: function () {return this.tile_height*this.height;}  } );

OxyGrid.prototype.reset = function () {

};


// the viewzone returns a Rectangle that is indicating the Zone of the map that must be drawn. (in pixels)
// Input Parameter is "ppos" = player position. The player position is in the center of the zone, +/- a ratio
// that is applied horizontally and vertically -> ratioud and ratiolr.
// width and height input parameters are indicating the size of the zone to be displayed
OxyGrid.prototype.viewzone = function (ppos, width, height) {
    
    var ratiolr = 0.5;
    var ratioud = 0.8;
    var topleft  = new Vector2( ppos.x - width * ratiolr,
    ppos.y - height * ratioud);
    //var topright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
    //                            ppos.y - this.height * this.ratioud);
    // console.log("viewzone is "+topright.x+topright.y);
    //var botleft  = new Vector2( ppos.x - this.width * this.ratiolr,
    //                            ppos.y + this.height * (1-this.ratioud));
    //var botright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
    //                            ppos.y + this.height * (1-this.ratioud));
    // TODO: the (topright.x-topleft.x),(botright.y-topright.y) are in fact width and height
    //return new Rectangle(topleft.x, topleft.y ,(topright.x-topleft.x),(botright.y-topright.y));                                                
    
    // If zone is too near from the edge of the Map, then stuck it at 0 or maxval-width/height
    var maxright = (this.width*this.tile_width)-width;
    var maxdown  = (this.height*this.tile_height)-height;
    if (topleft.x < 0) topleft.x = 0
    else if (topleft.x >= maxright) topleft.x=maxright-1;
    if (topleft.y < 0) topleft.y = 0;
    else if (topleft.y >= maxdown) topleft.y=maxdown-1;

    
    
    return new Rectangle(topleft.x, topleft.y ,width,height);                                                
                 
  }
  

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


// draw input parameters:
// mapposition -> position of the player on the map
// width, height -> size in pixel of the portion of the map to display
OxyGrid.prototype.draw = function (mapposition, width, height) {
  // mapposition is the location in the map to start drawing in the Zone
  
  // Get the Rectangle where to display the Map. (in map pixel-coords)
  var pos = this.viewzone(mapposition, width, height);
  Canvas2D.drawText("viewzone pos:"+pos.x+" "+pos.y+" "+pos.width+" "+pos.height, new Vector2(10, 480), new Vector2, Color.black);

  //var pos=position.copy();
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
