import MENU_MAPPING from "../start_menu_mapping.js";
import SelectionMenu from "../tools/selection_menu.js";
import LoadingScene from "./loading_scene.js";
const CHARA_SECTIONID = 0;
const TRADE_SECTIONID = 1;

export default class StartMenu extends LoadingScene {
  constructor(){
    super({key: 'startMenuScene'});
  }
  preload() {
      this.createLoadingBar();
      this.setListeners(this.load);

      this.load.image('background', 'assets/raw/SelectionChara3.png');
      this.load.spritesheet('objects','assets/raw/objects.png', {frameWidth: 16, frameHeight: 16});
      this.load.spritesheet('faces','assets/raw/faces2.png', {frameWidth: 64, frameHeight: 64});

      MENU_MAPPING.SECTION[0].ITEMS.forEach((item,index)=> {
          this.load.spritesheet(item.SPRITESHEETKEY,'assets/players/'+item.SPRITESHEETKEY + '.png', {frameWidth: 24, frameHeight: 32});
      });

  }

  create() {
      //Reading sockect
    	//this.socket = io();
      this.add.image(320,320, 'background');


      this.nextUpdate = 0;
      this.elapseTimeForMenu = 300;

      //cursors
      this.cursors = this.input.keyboard.createCursorKeys();
      this.mainButtoms = this.input.keyboard.addKeys('Q,W,E,R');

      this.defineAnims();
      this.menu = new SelectionMenu(MENU_MAPPING, this);

      this.selectedHero = this.physics.add.sprite(200,520, "faces");
      this.defaultHeroTrade = this.physics.add.sprite(222,550, "objects");
      this.extraHeroTrade = this.physics.add.sprite(260,550, "objects");
      //this.selectedHero.setScale(1.2);
      this.defaultHeroTrade.setScale(1.8);
      this.extraHeroTrade.setScale(1.8);


      this.extraHeroTrade.anims.play("empty");
      //Creating description text
      this.infoText = this.add
        .text(280, 490, "", {
          font: "18px monospace",
          fill: "#000000",
          padding: { x: 20, y: 10 }
        });
  }

  update(time, delta) {
        //this.menuItems[0].anims.play('carpinter',false);
        this.updateData();
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
  updateData(){
      if(this.menu.getActiveSection() == CHARA_SECTIONID ){
          var item = this.menu.getSelectedItemFromSection(CHARA_SECTIONID);
          this.infoText.setText(item.infoText);
          this.selectedHero.anims.play(item.ANIMKEY);
          this.defaultHeroTrade.anims.play(item.TRADE);
          var filterArray = [] ;
          MENU_MAPPING.SECTION[TRADE_SECTIONID].ITEMS.forEach((trade) => {
              if(trade.ANIMKEY === item.TRADE) filterArray.push(trade.ID);
          });

          if(filterArray.length > 0) this.menu.setDisableItems(TRADE_SECTIONID,filterArray);

      }
      if(this.menu.getActiveSection() == TRADE_SECTIONID ){
          var item = this.menu.getSelectedItemFromSection(TRADE_SECTIONID);
          this.extraHeroTrade.anims.play(item.ANIMKEY);
          this.infoText.setText(item.infoText);
      }
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
      frames: [{ key: 'objects', frame: 497}],
      frameRate: 5
    });
    self.anims.create({
      key: 'chef',
      frames: [{ key: 'objects', frame: 465}],
      frameRate: 5
    });
    self.anims.create({
      key: 'blacksmith',
      frames: [{ key: 'objects', frame: 464}],
      frameRate: 5
    });
    self.anims.create({
      key: 'alquimist',
      frames: [{ key: 'objects', frame: 466}],
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
