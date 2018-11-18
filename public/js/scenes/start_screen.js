import LoadingScene from "./loading_scene.js";
import FogParticles from "../../assets/world/particles/fogSansTrade.js";

export default class StartScreen extends LoadingScene {
  constructor(){
      super({key: 'startScreenScene'});
  }
  preload() {
      this.createLoadingBar();
      this.setListeners(this.load);

      this.load.atlas('shapes', 'assets/world/particles/shapes.png', 'assets/world/particles/shapes.json');
      //this.load.text('particle-effect', 'assets/world/particles/fogSansTrade.json');
      //Loading assets
      //tiles in spritesheet
      //this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2});
      //this.load.tilemapTiledJSON('lightmap','assets/world/Palawar.json');

      this.load.image('backgroundStartScreen', 'assets/raw/startScreen.png');
      //this.load.image('shapes', 'assets/world/particles/mist1.png');

      //this.load.spritesheet('objects','assets/raw/objects.png', {frameWidth: 16, frameHeight: 16});
      //this.load.spritesheet('faces','assets/raw/faces2.png', {frameWidth: 64, frameHeight: 64});
    //  this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
      //this.load.image('manabar','assets/raw/objects.png');
      //this.load.image('manabarbg','assets/ui/manabarbg.png');
  }
  create(){
      this.particles = FogParticles;
      this.background = this.add.image(10,-20, 'backgroundStartScreen');
      this.background.setScale(1.2);
      this.background.setOrigin(0.45,0);
      this.iter = 0;
      this.cursors = this.input.keyboard.createCursorKeys();
      // this.tweens.add({
      //    targets: this.background,
      //    x: 540,
      //    ease: 'Sine.easeInOut',
      //    yoyo: true,
      //    repeat: -1,
      //    duration: 6000
      // });

      // this.cameras.main.once('camerafadeincomplete', function (camera) {
      //     camera.fadeOut(2000);
      // });
      //console.log(this.cache.text.get('particle-effect'));
      //this.add.particles('shapes',  new Function('return ' + this.cache.text.get('particle-effect'))());
      this.particlesEmitter = this.add.particles('shapes',  this.particles);
      this.cameras.main.alpha = 0.5;
      // Help text that has a "fixed" position on the screen
      this.add
        .text(180, 550, "Press SPACE to start!", {
          font: "22px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 },
          backgroundColor: "#ffffff"
        })
        .setScrollFactor(0);
      //this.particlesEmitter.setScrollFactor(0);
      //console.log(this.particlesEmitter);
  }


  update(time, delta){
      var halfWidth = -550;
      var quarterWidth = halfWidth / 2;
      //console.log((halfWidth + (Math.cos(this.iter) * quarterWidth))|0);
      this.cameras.main.scrollX = (halfWidth - quarterWidth + (Math.cos(this.iter) * quarterWidth))|0;
      this.iter += 0.009;
      if(this.cursors.space.isDown){
        this.scene.start('startMenuScene');
      }
  }



}
