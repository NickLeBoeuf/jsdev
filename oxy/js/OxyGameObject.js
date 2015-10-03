"use strict";

function OxyGameObject(sprite_set) {

    this.parent = null;
    this.currentSprite = sprite_set;
    this.velocity = Vector2.zero;
    this.mapposition = Vector2.zero; // position on the Global Map of the Game
    this._zonePosition = Vector2.zero; // position on the "screen/zone" -Relative to this.mapposition and to the topleft coords of the zone
    this.origin = Vector2.zero;
    this.rotation = 0;
    this.scale = 1;
    this.visible = false;
    this._viewzone=new Rectangle;
    console.log("OxyGameObject created.");
}


Object.defineProperty(OxyGameObject.prototype, "width",
    {
        get: function () {
            return this.currentSprite.width;
        }
    });

Object.defineProperty(OxyGameObject.prototype, "height",
    {
        get: function () {
            return this.currentSprite.height;
        }
    });

Object.defineProperty(OxyGameObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentSprite.width, this.currentSprite.height);
        }
    });

Object.defineProperty(OxyGameObject.prototype, "center",
    {
        get: function () {
            return new Vector2(this.currentSprite.width / 2, this.currentSprite.height / 2);
        }
    });

// The Zone-position is the position on the "screen/zone" -Relative to this.mapposition and to the topleft coords of the zone    
Object.defineProperty(OxyGameObject.prototype, "zonePosition",
    {
        get: function () {
            var vzrclip = this._viewzone;
            var vzr = this._viewzone;
            //vzrclip.x -= this.width;
            //vzrclip.y -= this.heigth;
            //vzrclip.width += this.width;
            //vzrclip.height += this.height;
            
            
            if (vzrclip.contains(this.mapposition)) {
                this.visible = true;
                this._zonePosition.x = this.mapposition.x-vzr.x;
                this._zonePosition.y = this.mapposition.y-vzr.y;
              }
            else
                this.visible = false;

            return this._zonePosition;
        },
        set: function(value) {
          this._zonePosition = value;
        }
        
    });
    
Object.defineProperty(OxyGameObject.prototype, "viewzone",
    {
        get: function () {
            return this._viewzone;
        },
        set: function(value) {
          this._viewzone = value;
        }
        
    });
    
    
// The world position is a recursive function to determine the screen position relatively to parent object.
Object.defineProperty(OxyGameObject.prototype, "worldPosition",
    {
        get: function () {
            if (this.parent !== null)
                return this.parent.worldPosition.addTo(this.zonePosition);
            else
                return this.zonePosition.copy();
        }
    });


    
        
OxyGameObject.prototype.update = function (delta) {
    this.mapposition.addTo(this.velocity.multiply(delta));
    var temp_pos = this.worldPosition;
};

OxyGameObject.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(this.currentSprite, this.worldPosition, this.rotation, this.scale, this.origin);
    //console.log("gameobject is visible:"+this.visible);
};
