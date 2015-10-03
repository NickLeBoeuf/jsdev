"use strict";

function LogoOxy() {
    OxyGameObject.call(this, sprites.oxylogo);
    this.mapposition = new Vector2(120, 220);
    this.origin = this.center;
    this.visible = true;
    this.scale = 0.1;
}

LogoOxy.prototype = Object.create(OxyGameObject.prototype);


LogoOxy.prototype.reset = function () {
    this.position = new Vector2(200, 300);
};

LogoOxy.prototype.handleInput = function (delta) {



    if (Keyboard._keyStates[Keys.Q].down)
        this.rotation += 0.01;
    if (Keyboard._keyStates[Keys.W].down)
        this.rotation -= 0.01;        
    if (Keyboard._keyStates[Keys.A].down)
        this.scale -= 0.01;        
    if (Keyboard._keyStates[Keys.S].down)
        this.scale += 0.01;        
    if (Keyboard._keyStates[Keys.left].down)
        this.mapposition.x -= 1;
    if (Keyboard._keyStates[Keys.right].down)
        this.mapposition.x += 1;
    if (Keyboard._keyStates[Keys.up].down)
        this.mapposition.y -= 1
    if (Keyboard._keyStates[Keys.down].down)
        this.mapposition.y += 1;      
    if (Keyboard._keyStates[Keys.T].down)
        this.visible = not(this.visible);        
};

