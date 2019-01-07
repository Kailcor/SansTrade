
import Player from "../player.js";
import MENU_MAPPING from "../start_menu_mapping.js";
/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class WorldScene extends Phaser.Scene {

  preload() {
      //Loading assets
      //tiles in spritesheet
      this.playerInfo = this.registry.get('playerInfo');

      this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0});
      this.load.tilemapTiledJSON('lightmap','assets/world/overworld.json');
      this.load.spritesheet('hero','assets/players/'+this.playerInfo.SPRITESHEETKEY+'.png', {frameWidth: 24, frameHeight: 32});
      this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
      this.load.image('manabar','assets/ui/manabar.png');
      this.load.image('manabarbg','assets/ui/manabarbg.png');
  }

  create() {

      //Other players group
      //this.otherPlayers = this.physics.add.group();
      //this.playerInfo = MENU_MAPPING.SECTION[0].ITEMS[0];
      //this.playerInfo = this.registry.get('playerInfo');
      //cursors
      this.music = this.sound.add('musicStartMenu', {
          mute: false,
          volume: 0.6,
          rate: 0.5,
          detune: 100,
          seek: 0,
          loop: true,
          delay: 0
      });
      this.music.play();

      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainButtoms = this.input.keyboard.addKeys('Q,W,E,R');

      //Loading map
      this.map = this.make.tilemap({key:'lightmap'});
      this.groundTiles = this.map.addTilesetImage('tiles',"tiles",16,16,1,2);

      this.backgroundLayer  = this.map.createDynamicLayer('background', this.groundTiles);
      this.backgroundLayer2  = this.map.createDynamicLayer('walls', this.groundTiles);
      this.objects  = this.map.createDynamicLayer('staticObjects', this.groundTiles);

      this.backgroundLayer2.setCollisionByExclusion([-1]);
      this.backgroundLayer2.setCollisionByProperty({ collides: true });

      this.objects.setCollisionByExclusion([-1]);

      //set limites del mundo al tamaño del mapa.
      this.physics.world.bounds.width = this.backgroundLayer.width;
      this.physics.world.bounds.height = this.backgroundLayer.height
      this.addPlayer(this.playerInfo);
      this.physics.world.addCollider(this.player.hero, this.backgroundLayer2);
      this.createMiniMap();

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
  createMiniMap(){
       this.minimap = this.cameras.add(10,0, 200,200).setZoom(0.25);
       this.minimap.scrollX = 320;
       this.minimap.scrollY = 320;
   }

  addPlayer(playerInfo){
      console.log(playerInfo);
      this.player = new Player(this, playerInfo);
      //colliders
      this.physics.add.collider(this.objects, this.player.hero);
      //self.physics.add.collider(self.otherPlayers, self.player.hero, this.collideCallbackTest);//create collideCallBack!
      this.cameras.main.startFollow(this.player.hero, true);
  }

}
