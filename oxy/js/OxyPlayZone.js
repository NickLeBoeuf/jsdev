"use strict";

function OxyPlayZone() {
  // Creating Zone object : This will be the area where the action will take place.
  // All objects part of the playing game will use the draw method of this OxyPlayZone object
  this.parent = null;
  this.position = new Vector2(50,100);
  this.width = 210;
  this.height = 250;
  // The Raios are constants for the moment, but could be changed future versions (ie Mulltiplayer)
  this.ratiolr = 0.5; // This is the Left-Right ratio : indicate the realtive player H-position % Map
  this.ratioud = 0.5; // This is the Up-Down ratio : indicate the realtive player V-position % Map
  console.log("OxyPlayzone created");
 
  this.viewzone = { width:  this.width,
                   height: this.height,
                   ratiolr: 0.5,
                   ratioud: 0.8,
                   coords: function(ppos) {
                     var topleft  = new Vector2( ppos.x - this.width * this.ratiolr,
                                                 ppos.y - this.height * this.ratioud);
                     var topright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
                                                 ppos.y - this.height * this.ratioud);
                   // console.log("viewzone is "+topright.x+topright.y);
                     var botleft  = new Vector2( ppos.x - this.width * this.ratiolr,
                                                 ppos.y + this.height * (1-this.ratioud));
                     var botright = new Vector2( ppos.x + this.width * (1-this.ratiolr),
                                                 ppos.y + this.height * (1-this.ratioud));
                     // TODO: the (topright.x-topleft.x),(botright.y-topright.y) are in fact width and height
                     return new Rectangle(topleft.x, topleft.y ,(topright.x-topleft.x),(botright.y-topright.y));                                                
                   }                 
                   }
                   
  this.logo = new LogoOxy(); this.logo.parent=this;
  this.thegrid = new OxyGrid(40,40); this.thegrid.parent = this;
  this.thegrid.initTiles();
  this.thegrid.initMap();
  this.mapposition = new Vector2(0,0);                   
                   
}

OxyPlayZone.prototype.handleInput = function (delta) {
  // Handling input - Keyboard anf Mouse of objects of the zone
  this.logo.handleInput(delta);
};

OxyPlayZone.prototype.update = function (delta) {


  // Calculate the viewzone, using the mapposition
  this.logo.viewzone = this.viewzone.coords(this.logo.mapposition);;
  // Updating the objects of the zone
  this.logo.update(delta);
  // Recalculate the mapposition that is shown on the zone, depending on player's mapposition
  this.mapposition.x = this.logo.viewzone.x;
  this.mapposition.y = this.logo.viewzone.y;
  
  
  
};


OxyPlayZone.prototype.draw = function () {

    Canvas2D.drawText("logo pos:"+this.logo.mapposition.x+" "+this.logo.mapposition.y+
                       "  zonepos:"+this.logo.zonePosition+" "+this.logo._zonePosition.y,
                       new Vector2(10, 460), new Vector2, Color.black);
    Canvas2D.drawText("viewzone pos:"+this.logo.viewzone.x+" "+this.logo.viewzone.y+" "+this.logo.viewzone.width+" "+this.logo.viewzone.height, new Vector2(10, 480), new Vector2, Color.black);

 // Drawing the zone and its objects
 
  // Draw the Map Grid at topLeft position of the Zone, last argument is mapposition
  
  this.thegrid.draw(this.position, this.width, this.height, this.mapposition);
  this.thegrid.drawclip(this.position, this.width, this.height);
  this.logo.draw(); 
 

};

OxyPlayZone.prototype.reset = function () {
  // Reset zone function
    this.logo.reset();
};

OxyPlayZone.prototype.isOutsidePlayZone = function (position) {
    return position.x < 0 || position.x > OxyPlayZone.width || position.y > OxyPlayZone.height;
};


Object.defineProperty(OxyPlayZone.prototype, "worldPosition",
    {
        get: function () {
            if (this.parent !== null)
                return this.parent.worldPosition.addTo(this.position);
            else
                return this.position.copy();
        }
    });
