import Player from "./player.js";
import TILES from "./tile-mapping.js";
import MENU_MAPPING from "./start_menu_mapping.js";

export default class DungeonScene extends Phaser.Scene {
  preload() {
      //Loading assets
      //tiles in spritesheet
      this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2});
      //this.load.tilemapTiledJSON('lightmap','assets/world/Palawar.json');

      this.load.spritesheet('hero','assets/players/link.png', {frameWidth: 16, frameHeight: 16});
      this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
      this.load.image('manabar','assets/ui/manabar.png');
      this.load.image('manabarbg','assets/ui/manabarbg.png');
  }

  create() {
      const dungeon = new Dungeon({
        width: 50,
        height: 50,
        rooms: {
          width: { min: 7, max: 15 },
          height: { min: 7, max: 15 },
          maxRooms: 12
        }
      });
      //Reading sockect

      //Other players group
      //this.otherPlayers = this.physics.add.group();
      this.playerInfo = MENU_MAPPING.SECTION[0].ITEMS[0];

      //cursors
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainButtoms = this.input.keyboard.addKeys('Q,W,E,R');

      //Loading map
      this.map = this.make.tilemap({
        tileWidth: 8,
        tileHeight: 8,
        width: dungeon.width,
        height: dungeon.height
      });
      this.groundTiles = this.map.addTilesetImage('tiles',"tiles",8,8,0,0);

      this.backgroundLayer  =  this.map.createBlankDynamicLayer("Ground", this.groundTiles);
      this.objectsLayer  =  this.map.createBlankDynamicLayer("Objects", this.groundTiles);

      //Add empty tiles (20 is the id of the empty tile in the actual Tileset)
      this.backgroundLayer.fill(TILES.BLANK);

      dungeon.rooms.forEach(room =>{

        const { x, y, width, height, left, right, top, bottom } = room;
        // Fill the room (minus the walls) with mostly clean floor tiles (90% of the time), but
        // occasionally place a dirty tile (10% of the time).
        this.backgroundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, [
            { index: 1806, weight: 9 },
            { index: [1807], weight: 1 } // 1/10 times, randomly pick 7, 8 or 26
        ]);
        //corners
        this.backgroundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
        this.backgroundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
        this.backgroundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);
        this.backgroundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
        //walls borders (collide)
        this.backgroundLayer.fill(1419, left + 1, top, width - 2, 1); // Top
        this.backgroundLayer.fill(1613, left + 1, bottom, width - 2, 1); // Bottom
        this.backgroundLayer.fill(1610, left, top + 1, 1, height - 2); // Left
        this.backgroundLayer.fill(1421, right, top + 1, 1, height - 2); // Right
        //walls (No Collide)
        this.backgroundLayer.fill(1515, left + 1, top+1, width - 2, 1); // Top INNER
        this.backgroundLayer.fill(1806, left + 1, bottom-1, width - 2, 1); // Bottom INNER
        this.backgroundLayer.fill(1611, left+1, top + 2, 1, height - 3); // Left INNER
        this.backgroundLayer.fill(1420, right-1, top + 2, 1, height - 3); // Right INNER

      });
      /*const mappedTiles = dungeon.getMappedTiles({ empty: -1, floor: 4004, door: 4004, wall: 5126 });
      this.backgroundLayer.putTilesAt(mappedTiles, 0, 0);
      this.backgroundLayer.setCollision(5126); // We only need one tile index (the walls) to be colliding for now
      */
      //set limites del mundo al tamaño del mapa.
      this.physics.world.bounds.width = this.backgroundLayer.width;
      this.physics.world.bounds.height = this.backgroundLayer.height;
      this.addPlayer(playerInfo);
      this.createMiniMap(this);

      //Make the main camera focus on the player
      this.cameras.main.setBounds(-300, -300,1100 ,1100);
      //this.cameras.main.setLerp(0.8, 0.8);
      this.cameras.main.setZoom(2);

    // Instantiate a player instance at the location of the "Spawn Point" object in the Tiled map.
    // Note: instead of storing the player in a global variable, it's stored as a property of the
    // scene.
    /*const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );*/


    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    /*this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys or WASD to move & jump", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);*/
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    if(  this.player ) this.player.update(time,delta);

    /*if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }*/
  }
  createMiniMap(self){
       self.minimap = self.cameras.add(10,0, 200,200).setZoom(0.45);
       self.minimap.scrollX = 320;
       self.minimap.scrollY = 320;
   }

   addPlayer(playerInfo){
       this.player = new Player(self, playerInfo);
       //colliders
       this.physics.add.collider(this.objects, this.player.hero);
       //self.physics.add.collider(self.otherPlayers, self.player.hero, this.collideCallbackTest);//create collideCallBack!
       this.cameras.main.startFollow(this.player.hero, true);
   }


}
