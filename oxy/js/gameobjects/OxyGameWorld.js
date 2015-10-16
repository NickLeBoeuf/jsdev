"use strict";

function OxyGameWorld(layer, id) {
    GameObjectList.call(this, layer, id);

     // add the playing field
    var playingField = new GameObjectList(ID.layer_objects);
    playingField.position = new Vector2(85, 150);
    this.add(playingField);

    // add the grid
    var rows = 10, columns = 5;
    var grid = null;
    //grid.cellWidth = 85;
    //grid.cellHeight = 85;
    //grid.reset();
    //playingField.add(grid);

}
OxyGameWorld.prototype = Object.create(GameObjectList.prototype);


OxyGameWorld.prototype.handleInput = function (delta) {

    // playing
    GameObjectList.prototype.handleInput.call(this, delta);

};

OxyGameWorld.prototype.update = function (delta) {

    // playing
    var helpFrame = this.root.find(ID.help_frame);
    var grid = this.root.find(ID.grid);
    //grid.visible = true;
    GameObjectList.prototype.update.call(this, delta);
};


OxyGameWorld.prototype.reset = function () {
    GameObjectList.prototype.reset.call(this);
 
};
