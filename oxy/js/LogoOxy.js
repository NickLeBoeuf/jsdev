"use strict";

function LogoOxy() {
    OxyGameObject.call(this, sprites.oxylogo);
    this.position = new Vector2(20, 20);
    this.origin = this.center;
    this.visible = true;
}

LogoOxy.prototype = Object.create(OxyGameObject.prototype);


LogoOxy.prototype.reset = function () {
    this.position = new Vector2(20, 20);
};

LogoOxy.prototype.handleInput = function (delta) {
    if (Keyboard.keyDown === Keys.Q)
        this.rotation += 0.01;
    else if (Keyboard.keyDown === Keys.W)
        this.rotation -= 0.01;        
    else if (Keyboard.keyDown === Keys.A)
        this.scale -= 0.01;        
    else if (Keyboard.keyDown === Keys.S)
        this.scale += 0.01;        
    else if (Keyboard.keyDown === Keys.left)
        this.position.x -= 1;
    else if (Keyboard.keyDown === Keys.right)
        this.position.x += 1;
    else if (Keyboard.keyDown === Keys.up)
        this.position.y -= 1
    else if (Keyboard.keyDown === Keys.down)
        this.position.y += 1;      
    else if (Keyboard.keyDown === Keys.T)
        this.visible = not(this.visible);        
};

