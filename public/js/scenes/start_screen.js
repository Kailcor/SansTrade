import LoadingScene from "./loading_scene.js";
import FogParticles from "../../assets/world/particles/fogSansTrade.js";

export default class StartScreen extends LoadingScene {
  constructor(){
      super({key: 'startScreenScene'});
  }
  preload() {
      this.createLoadingBar();
      this.setListeners(this.load);
      this.load.audio('musicStartScreen','assets/sound/music/Day_Of_Recon.mp3');
      this.load.atlas('shapes', 'assets/world/particles/shapes.png', 'assets/world/particles/shapes.json');
      this.load.image('backgroundStartScreen', 'assets/raw/startScreen.png');
  }
  create(){
      this.music = this.sound.add('musicStartScreen', {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
      });
      this.music.play();
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
        this.music.stop();
        this.scene.start('startMenuScene');
      }
  }



}
