import MENU_MAPPING from "../start_menu_mapping.js";
import SelectionMenu from "../tools/selection_menu.js";
import LoadingScene from "./loading_scene.js";

export default class StartMenu extends LoadingScene {
  constructor(){
    super({key: 'startMenuScene'});
  }
  preload() {
      this.createLoadingBar();
      this.setListeners(this.load);
      //Loading assets
      //tiles in spritesheet
      //this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2});
      //this.load.tilemapTiledJSON('lightmap','assets/world/Palawar.json');

      this.load.image('background', 'assets/raw/SelectionChara3.png');
      this.load.spritesheet('objects','assets/raw/objects.png', {frameWidth: 16, frameHeight: 16});
      this.load.spritesheet('faces','assets/raw/faces2.png', {frameWidth: 64, frameHeight: 64});
    //  this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
      //this.load.image('manabar','assets/raw/objects.png');
      //this.load.image('manabarbg','assets/ui/manabarbg.png');
  }

  create() {
      //Reading sockect
    	//this.socket = io();
      this.add.image(320,320, 'background');
      //Moved to Selection_menu
      // this.menuSectionID = 0;
      // this.numSections = MENU_MAPPING.SECTION.length -1;
      //
      // this.menuActualSection = MENU_MAPPING.SECTION[this.menuSectionID]; //Which section is the user in...
      // this.menuItemSelected = []; // which item is selected.
      // this.menuItemSelected[this.menuActualSection.ID] = 0; //settig default item.

      this.nextUpdate = 0;
      this.elapseTimeForMenu = 300;

      //cursors
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainButtoms = this.input.keyboard.addKeys('Q,W,E,R');

      this.defineAnims();
      this.menu = new SelectionMenu(MENU_MAPPING, this);
      // var x = 100;
      // var y = 100;
      // var distance = 60;
      // let scale = 3;

      // this.menuItems = [];
      // var self = this;
      //for(let section )
      // MENU_MAPPING.SECTION.forEach(function(section){
      //    section.ITEMS.forEach(function (item) {
      //
      //      self.menuItems[(section.ID*10) +item.ID] = self.physics.add.sprite(item.X,item.Y, item.SPRITEKEY);
      //      self.menuItems[(section.ID*10) +item.ID].alpha = 0.5;
      //      self.menuItems[(section.ID*10) + item.ID].setScale(item.SCALE);
      //
      //      self.menuItems[(section.ID*10) + item.ID].anims.play(item.ANIMKEY,false);
      //
      //    });
      // });

      //console.log(this.menuItemSelected);
  }

  update(time, delta) {
        //this.menuItems[0].anims.play('carpinter',false);
        if (this.cursors.left.isDown){
          //console.log(this.menuItems);
          if(this.nextUpdate < time){
            this.menu.prevItem();
            // this.menuItemSelected[this.menuActualSection.ID]--;
            // if(this.menuItemSelected[this.menuActualSection.ID] < 0) this.menuItemSelected[this.menuActualSection.ID] = (this.menuActualSection.ITEMS.length - 1);
            this.nextUpdate= time + this.elapseTimeForMenu;
          }

        } else if (this.cursors.right.isDown){
            if(this.nextUpdate < time){
              this.menu.nextItem();
              // this.menuItemSelected[this.menuActualSection.ID]++;
              // if(this.menuItemSelected[this.menuActualSection.ID] > this.menuActualSection.ITEMS.length -1) this.menuItemSelected[this.menuActualSection.ID] = 0;
              this.nextUpdate= time +this.elapseTimeForMenu;
            }
        }

        if (this.cursors.up.isDown){
            if(this.nextUpdate < time){
              // this.menuItemSelected[this.menuActualSection.ID]--;
              // if(this.menuItemSelected[this.menuActualSection.ID] < 0) this.menuItemSelected[this.menuActualSection.ID] = this.menuActualSection.ITEMS.length -1;
              this.nextUpdate= time +this.elapseTimeForMenu;
              this.menu.prevSection();
            }
        } else if(this.cursors.down.isDown){
            if(this.nextUpdate < time){
              // this.menuItemSelected[this.menuActualSection.ID]++;
              // if(this.menuItemSelected[this.menuActualSection.ID] > this.menuActualSection.ITEMS.length -1) this.menuItemSelected[this.menuActualSection.ID] = 0;
              this.nextUpdate= time +this.elapseTimeForMenu;
              this.menu.nextSection();
            }
        }

        if(this.cursors.space.isDown){
          // if(this.menuSectionID < this.numSections){
          //     if(this.nextUpdate < time){
          //         this.menuActualSection = MENU_MAPPING.SECTION[++this.menuSectionID];
          //         this.menuItemSelected[this.menuActualSection.ID] = 0;
          //         this.nextUpdate= time +this.elapseTimeForMenu;
          //     }
          // }else{
          //   // TODO change scene;
          //   console.log("The game starts!");
          // }
        }

        // this.menuItems.forEach(  (item,index) => {
        //     let indexFromActualSection = index ;
        //     let indexBottomForActualSection = (this.menuActualSection.ID*10) ;
        //     if( indexFromActualSection >= indexBottomForActualSection &&  indexFromActualSection < indexBottomForActualSection + 10)  {
        //         item.alpha=0.5;
        //     }
        // });
        // var id = (this.menuActualSection.ID *10) +this.menuItemSelected[this.menuActualSection.ID];
        // this.menuItems[id].alpha=1;
        this.menu.update();
        //this.updateData(playerInfo);

  }
  updateData(playerInfo){

  }
  defineAnims(){
    self = this;
    self.anims.create({
      key: 'mee',
      frames: [{ key: 'faces', frame: 0}],
      frameRate: 5
    });
    self.anims.create({
      key: 'yee',
      frames: [{ key: 'faces', frame: 1}],
      frameRate: 5
    });
    self.anims.create({
      key: 'lee',
      frames: [{ key: 'faces', frame: 2}],
      frameRate: 5
    });
    self.anims.create({
      key: 'ree',
      frames: [{ key: 'faces', frame: 3}],
      frameRate: 5
    });
    self.anims.create({
      key: 'tee',
      frames: [{ key: 'faces', frame: 4}],
      frameRate: 5
    });
    self.anims.create({
      key: 'xee',
      frames: [{ key: 'faces', frame: 5}],
      frameRate: 5
    });
    self.anims.create({
      key: 'kee',
      frames: [{ key: 'faces', frame: 6}],
      frameRate: 5
    });
    self.anims.create({
      key: 'wee',
      frames: [{ key: 'faces', frame: 7}],
      frameRate: 5
    });
    self.anims.create({
      key: 'carpenter',
      frames: [{ key: 'objects', frame: 464}],
      frameRate: 5
    });
    self.anims.create({
      key: 'chef',
      frames: [{ key: 'objects', frame: 465}],
      frameRate: 5
    });
    self.anims.create({
      key: 'blacksmith',
      frames: [{ key: 'objects', frame: 466}],
      frameRate: 5
    });
    self.anims.create({
      key: 'alquimist',
      frames: [{ key: 'objects', frame: 497}],
      frameRate: 5
    });
    self.anims.create({
      key: 'chaman',
      frames: [{ key: 'objects', frame: 498}],
      frameRate: 5
    });
    self.anims.create({
      key: 'empty',
      frames: [{ key: 'objects', frame: 499}],
      frameRate: 5
    });
  }
  startGame(){

  }


}
