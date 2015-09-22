"use strict";

function OxyTileObject(sprite_set,sourceRect) {

    this.currentSprite = sprite_set;
    this.sourceRect = sourceRect;
    
    console.log("OxyTileObject created.");
}


Object.defineProperty(OxyTileObject.prototype, "width",
    {
        get: function () {
            return this.sourceRect.width;
        }
    });

Object.defineProperty(OxyTileObject.prototype, "height",
    {
        get: function () {
            return this.sourceRect.height;
        }
    });

Object.defineProperty(OxyTileObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.sourceRect.width, this.sourceRect.height);
        }
    });

Object.defineProperty(OxyTileObject.prototype, "center",
    {
        get: function () {
            return new Vector2(this.sourceRect.width / 2, this.sourceRect.height / 2);
        }
    });

OxyTileObject.prototype.draw = function (position, scale) {
  //  console.log("Drawing OxyTileObject with position ="+position);
    Canvas2D.drawImage(this.currentSprite, position, 0, scale, new Vector2, this.sourceRect);
  //Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin, sourceRect) {
   };
