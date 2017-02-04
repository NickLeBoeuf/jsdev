"use strict";

function OxyGameWorld(layer, id) {
    GameObjectList.call(this, layer, id); // TODO there's no global gamezone

    // Create the GameZone
    var gamezone1 = new GameZone(new Rectangle(20,20,600,400),ID.gamezone1);
    this.add(gamezone1);
    
    // add the playing field
    var playingField = new GameObjectList(ID.layer_objects, ID.playingField, gamezone1);
    playingField.position = gamezone1.position; // TODO we could use gamezone.position directly in the GameList
    this.add(playingField); // Add the object to the OxyGameWorld list

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
