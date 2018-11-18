import Player from "./player.js";

export default class PowerMarker {

  constructor(scene, player){
      this.scene = scene;
      this.player = player;
      this.isVisible = false;
      this.tileSize = this.scene.map.tileWidth*2;
      this.factorX = 1;
      this.factorY = 1;
      this.marker = this.scene.add.graphics();
      this.marker.fillStyle(0xffbbbb, 0.5);
      this.marker.fillRect(0, 0, this.tileSize, this.tileSize);
      //this.marker.strokeRect(0, 0, this.scene.map.tileWidth * this.numberOfTiles, this.scene.map.tileHeight * this.numberOfTiles);
      //this.marker.lineStyle(3, 0xff4f78, 1);
      //this.marker.strokeRect(0, 0, this.scene.map.tileWidth * this.numberOfTiles, this.scene.map.tileHeight * this.numberOfTiles);


  }

  update(time, delta){
    var worldPointX = 0;
    var worldPointY = 0;

    this.marker.visible = this.isVisible;
    if(!this.isVisible){
        return;
    }
    console.log();
    switch (this.player.hero.headDirection) {
      case 'standDown':
          worldPointX = this.player.hero.x - (this.tileSize * this.factorX)/2;
          worldPointY = this.player.hero.y + this.player.hero.getBounds().height;
          break;
      case 'standUp':
          worldPointX = this.player.hero.x - (this.tileSize * this.factorX)/2;
          worldPointY = this.player.hero.y - this.player.hero.getBounds().height;
          break;
      case 'standLeft':
          worldPointX = this.player.hero.x - this.player.hero.getBounds().width;
          worldPointY = this.player.hero.y - (this.tileSize * this.factorY)/2;
          break;
      case 'standRight':
          worldPointX = this.player.hero.x + this.player.hero.getBounds().width;
          worldPointY = this.player.hero.y - (this.tileSize * this.factorY)/2;
          break;

    }

    const pointerTileXY = this.scene.backgroundLayer2.worldToTileXY(worldPointX, worldPointY );
    const snappedWorldPoint = this.scene.backgroundLayer2.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
    this.marker.setPosition(snappedWorldPoint.x , snappedWorldPoint.y );

  }
  changeSize(long, wide){
    var factorX = 1, factorY = 1;
    switch (this.player.hero.headDirection) {
      case 'standDown':
          factorY+=long;
          factorX+=wide;

          break;
      case 'standUp':
          factorY+=long;
          factorY*=-1;;
          factorX+=wide;
          break;
      case 'standLeft':
          factorX+=long;
          factorX*=-1;
          factorY+=wide;
          break;
      case 'standRight':
          factorX+=long;
          factorY+=wide;
          break;

    }
    if(this.factorX != factorX || this.factorY != factorY){
        this.factorX = factorX;
        this.factorY = factorY;
        this.marker.clear();
        this.marker.fillStyle(0xffbbbb, 0.5);
        this.marker.fillRect(0, 0, this.tileSize * factorX, this.tileSize * factorY);

    }

  }
  setVisible(isVisible){
      this.isVisible = isVisible;
  }
}
