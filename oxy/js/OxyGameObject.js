"use strict";

function OxyGameObject(sprite_set) {

    this.currentSprite = sprite_set;
    this.velocity = Vector2.zero;
    this.position = Vector2.zero;
    this.origin = Vector2.zero;
    this.rotation = 0;
    this.scale = 1;
    this.visible = false;
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

OxyGameObject.prototype.update = function (delta) {
    this.position.addTo(this.velocity.multiply(delta));
};

OxyGameObject.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(this.currentSprite, this.position, this.rotation, this.scale, this.origin);
};
