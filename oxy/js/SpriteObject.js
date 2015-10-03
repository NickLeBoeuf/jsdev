"use strict";
// The Sprite Object is a child of OxyGameObject, corresponding to a "tile" of the complete spirteset.
function SpriteObject(sprite_set,sourceRect) {
    OxyGameObject.call(this, sprite_set);
    this.sourceRect = sourceRect;
}

SpriteObject.prototype = Object.create(OxyGameObject.prototype);



Object.defineProperty(SpriteObject.prototype, "width",
    {
        get: function () {
            return this.sourceRect.width;
        }
    });

Object.defineProperty(SpriteObject.prototype, "height",
    {
        get: function () {
            return this.sourceRect.height;
        }
    });

Object.defineProperty(SpriteObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.sourceRect.width, this.sourceRect.height);
        }
    });

Object.defineProperty(SpriteObject.prototype, "center",
    {
        get: function () {
            return new Vector2(this.sourceRect.width / 2, this.sourceRect.height / 2);
        }
    });
    


SpriteObject.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(this.currentSprite, this.worldPosition, this.rotation, this.scale, this.origin, this.sourceRect);
    //console.log("drawing sprite");
};


