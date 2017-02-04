"use strict";

function GameZone(definiton_rectangle,id) {
    this.id = typeof id !== 'undefined' ? id : 0;
    // the definition_rectangle gives the location and size of the Gamezone on the global screen
    this.position = new Vector2(definiton_rectangle.x,definiton_rectangle.y);
    this.width = definiton_rectangle.width;
    this.height = definiton_rectangle.height;
    // the cornerpos gives the mapposition corresponds to the upper left corner of the zone
    this.cornerpos = new Vector2;
    // the focuspos is the theorical center of the gamezone, given in mapposition units.
    // It comes with the UpDown and LeftRightRatio that are a number tbetween 0 and 1
    this.focuspos = new Vector2;
    this.udratio = 0.8; // the focus will have 80% of zone upper the focus and 20% down
    this.lrratio = 0.5; // the focus will be in the horizontal middle of the zone.
    // Example of functioning: the focuspos will be updated with the player's mapposition
    // and all the objects (map, ennemies, player) will be drawn with respect
    // to the corenerpos(mapposition) and this.position (pixels)   
    this.parent = null;
    this._visible = true;

}

Object.defineProperty(GameZone.prototype, "visible",
    {
        get: function () {
            if (this.parent === null)
                return this._visible;
            else
                return this._visible && this.parent.visible;
        },

        set: function (value) {
            this._visible = value;
        }
    });

Object.defineProperty(GameZone.prototype, "root",
    {
        get: function () {
            if (this.parent === null)
                return this;
            else
                return this.parent.root;
        }
    });

Object.defineProperty(GameZone.prototype, "worldPosition",
    {
        get: function () {
            if (this.parent !== null)
                return this.parent.worldPosition.addTo(this.position);
            else
                return this.position.copy();
        }
    });

GameZone.prototype.reset = function () {
    this._visible = true;
};


GameZone.prototype.update = function (delta) {
    
};

GameZone.prototype.handleInput = function (delta) {
    
};

GameZone.prototype.draw = function () {
    console.log ("Calling Gamezone draw:"+this.position+" "+this.width+" "+this.height);
    if (!this.visible)
        return;
    //Canvas2D._canvasContext.fillRect(10,10,20,20);
    Canvas2D.drawRectangle(this.position.x,this.position.y,this.width,this.height, Color.gray);

};
