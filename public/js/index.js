
import WorldScene from "./scenes/scene_world.js";
import DungeonScene from "./dungeon_1.js";
import StartMenu from "./scenes/start_menu.js";
import StartScreen from "./scenes/start_screen.js";
const config = {
  type: Phaser.AUTO,
  parent: 'palawar',
  width: 640,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      //debug: true,
      //debugShowVelocity: true,
      pixelart:true,
      gravity: { y: 0 }
    }
  },
  scene: [
    StartScreen,
    StartMenu
  ]
  //scene: WorldScene
};
const game = new Phaser.Game(config);
