
import Player from "../player.js";
import MENU_MAPPING from "../start_menu_mapping.js";
/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class WorldScene extends Phaser.Scene {
  preload() {
      //Loading assets
      //tiles in spritesheet
      this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2});
      this.load.tilemapTiledJSON('lightmap','assets/world/Palawar.json');

      this.load.spritesheet('hero','assets/players/link.png', {frameWidth: 16, frameHeight: 16});
      this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
      this.load.image('manabar','assets/ui/manabar.png');
      this.load.image('manabarbg','assets/ui/manabarbg.png');
  }

  create() {

      //Other players group
      //this.otherPlayers = this.physics.add.group();
      this.playerInfo = MENU_MAPPING.SECTION[0].ITEMS[0];
      //cursors
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainButtoms = this.input.keyboard.addKeys('Q,W,E,R');

      //Loading map
      this.map = this.make.tilemap({key:'lightmap'});
      this.groundTiles = this.map.addTilesetImage('tiles',"tiles",8,8,0,0);

      this.backgroundLayer  = this.map.createDynamicLayer('background1', this.groundTiles);
      this.backgroundLayer2  = this.map.createDynamicLayer('background2', this.groundTiles);
      this.objects  = this.map.createDynamicLayer('Objects', this.groundTiles);
      this.objects.setCollisionByExclusion([-1]);

      //set limites del mundo al tamaño del mapa.
      this.physics.world.bounds.width = this.backgroundLayer.width;
      this.physics.world.bounds.height = this.backgroundLayer.height
      this.addPlayer(playerInfo);
      this.createMiniMap(this);

      //Make the main camera focus on the player
      this.cameras.main.setBounds(-300, -300,1100 ,1100);
      //this.cameras.main.setLerp(0.8, 0.8);
      this.cameras.main.setZoom(2);


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
       self.minimap = self.cameras.add(10,0, 200,200).setZoom(0.25);
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
