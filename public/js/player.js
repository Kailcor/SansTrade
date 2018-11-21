
import UiBar from "./uibars.js";
import PowerMarker from "./power_marker.js";

/**
 * A class that wraps up our topview player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {


  constructor(scene, playerInfo) {
    this.scene = scene;
    this.cursors = scene.cursors;


    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
       key: 'down',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    anims.create({
        key: 'up',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 2, end: 3}),
        frameRate: 5,
        repeat: -1
    });
   anims.create({
        key: 'left',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 4, end: 5}),
        frameRate: 5,
        repeat: -1
    });
    anims.create({
        key: 'right',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 6, end: 7}),
        frameRate: 5,
        repeat: -1
    });

  // Stand
      anims.create({
       key: 'standDown',
        frames: [ {key: 'hero',  frame: 0 } ],
        frameRate: 5
    });
    anims.create({
        key: 'standUp',
        frames: [ {key: 'hero',  frame: 2 } ],
        frameRate: 5
    });
    anims.create({
        key: 'standLeft',
        frames: [ {key: 'hero',  frame: 4 } ],
        frameRate: 5
    });
    anims.create({
        key: 'standRight',
        frames:  [ {key: 'hero',  frame: 6 } ],
        frameRate: 5
    });

    //Cave


    anims.create({
        key: 'downSpade',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 8, end: 9}),
        frameRate: 8,
        repeat: 1
    });
    anims.create({
        key: 'leftSpade',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 10, end: 11}),
        frameRate: 8,
        repeat: 1
    });
    anims.create({
        key: 'upSpade',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 12, end: 13}),
        frameRate: 8,
        repeat: 1
    });
    anims.create({
        key: 'rightSpade',
        frames: this.scene.anims.generateFrameNumbers('hero', {start: 14, end: 15}),
        frameRate: 8,
        repeat: 1
    });
    //pull
    anims.create({
        key: 'downPull',
        frames: [ {key: 'hero',  frame: 16 } ],
        frameRate: 8
    });
    anims.create({
        key: 'upPull',
        frames: [ {key: 'hero',  frame: 17 } ],
        frameRate: 8
    });
    anims.create({
        key: 'rightPull',
        frames: [ {key: 'hero',  frame: 19 } ],
        frameRate: 8
    });

    anims.create({
        key: 'leftPull',
        frames: [ {key: 'hero',  frame: 18 } ],
        frameRate: 8
    });
  //Pick
    anims.create({
        key: 'downPick',
        frames: [ {key: 'hero',  frame: 20 } ],
        frameRate: 8
    });

    anims.create({
        key: 'upPick',
        frames: [ {key: 'hero',  frame: 23 } ],
        frameRate: 8
    });
    anims.create({
        key: 'rightPick',
        frames: [ {key: 'hero',  frame: 22 } ],
        frameRate: 8
    });

    anims.create({
        key: 'leftPick',
        frames: [ {key: 'hero',  frame: 21 } ],
        frameRate: 8
    });



    // Create the physics-based sprite that we will move around and animate
    this.hero = scene.physics.add.sprite(playerInfo.x, playerInfo.y, 'hero');
    //Hero stats
    this.hero.manaMax = 100;
    this.hero.mana = 100;
    this.hero.manaRecoverRate = 1000;
    this.hero.manaRecoverAmount = 1;
    this.hero.manaRecoverNextTime = 0;
    this.hero.healthMax = 300;
    this.hero.healthRecoverRate = 3000;
    this.hero.healthRecoverAmount = 1;
    this.hero.healthRecoverNextTime = 300;
    this.hero.heroHealth = 300;


    //Hero Movement Stats
    this.hero.headDirection = 'standDown';
    this.hero.heroMoving = false;
    this.hero.heroSpeed = 50;
    this.hero.heroMaxSpeed = 200;
    this.hero.isDashing = false;
    this.hero.lastDash = 0;
    this.hero.dashDuration = 10;
    this.hero.isGrabing = false;
    //Mining Stats
    this.hero.miningSpeed = 30;
    this.hero.lastMined = 0;
    this.hero.gold = 0;
    this.hero.team = playerInfo.team;

    this.uibar = new UiBar(scene, this, playerInfo.x, playerInfo.y);

    this.hero.setCollideWorldBounds(true);
    scene.cameras.main.scrollX = playerInfo.x - scene.physics.world.bounds.width/2;
    scene.cameras.main.scrollY = playerInfo.y - scene.physics.world.bounds.height/2;

    if (playerInfo.team === 'blue') {
      //this.hero.setTint(0x0000ff);
    } else {
      //this.hero.setTint(0xff0000);
    }

    this.hero.setMaxVelocity(this.hero.heroMaxSpeed);

    this.powerMarker = new PowerMarker(scene,this);

    /*// Track the arrow keys & WASD
    const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      w: W,
      a: A,
      d: D
    });*/

  }

  update(time, delta) {

    if(this.hero){

        var x = this.hero.x;
        var y = this.hero.y;
        var headDirection = this.hero.headDirection;
        var isDoingAction = this.hero.isMining || this.hero.isGrabing  || this.hero.isDashing;
        //if(this.hero.isMining) console.log("this.hero.isMining");
        //if(this.hero.isGrabing) console.log("this.hero.isGrabing");
        //if(this.hero.isDashing) console.log("this.hero.isDashing");
        this.hero.heroMoving = false;

        if(!isDoingAction){

            if (this.cursors.left.isDown){

                this.hero.heroMoving = true;
                if(!this.hero.isGrabing) this.hero.headDirection = 'standLeft';
                this.hero.setVelocityX(-this.hero.heroSpeed);
                this.hero.setVelocityY(0);
                this.hero.anims.play('left', true);
            } else if (this.cursors.right.isDown){
                this.hero.heroMoving = true;
                if(!this.hero.isGrabing) this.hero.headDirection = 'standRight';
                this.hero.setVelocityX(this.hero.heroSpeed);
                this.hero.setVelocityY(0);
                this.hero.anims.play('right', true);
            }

            if (this.cursors.up.isDown){
                this.hero.heroMoving = true;
                if(!this.hero.isGrabing) this.hero.headDirection = 'standUp';
                this.hero.setVelocityY(-this.hero.heroSpeed);
                this.hero.setVelocityX(0);
                this.hero.anims.play('up', true);
            } else if(this.cursors.down.isDown){
                this.hero.heroMoving = true;
                if(!this.hero.isGrabing) this.hero.headDirection = 'standDown';
                this.hero.setVelocityY(this.hero.heroSpeed);
                this.hero.setVelocityX(0);
                this.hero.anims.play('down', true);
            }
        }


        if(this.cursors.space.isDown && !this.hero.heroMoving){
            //TODO create hero.mining boolean to do the same as heroMoving.
            this.hero.setVelocityY(0);
            this.hero.setVelocityX(0);
            switch(this.hero.headDirection){
                case 'standDown':
                    this.hero.anims.play('downSpade',true);
                    break;
                case 'standUp':
                    this.hero.anims.play('upSpade',true);
                    break;
                case 'standLeft':
                    this.hero.anims.play('leftSpade',true);
                    break;
                case 'standRight':
                    this.hero.anims.play('rightSpade',true);
                    break;
            }
            //Check if the player can mine the gold.
            if(time > this.hero.lastMined && this.hero.mana > 0){
                 this.hero.lastMined = time + this.hero.miningSpeed;
                 //this.scene.socket.emit('playerMining');
                 this.hero.mana--;
            }

        }


         if(!this.hero.heroMoving && !this.hero.isDashing){
                //this.scene.socket.emit('playerStopMoving');
                this.hero.anims.play(this.hero.headDirection, true);
                this.hero.setVelocityY(0);
                this.hero.setVelocityX(0);
         }else{
                //this.scene.socket.emit('playerMovement', {x: this.hero.x, y: this.hero.y, headDirection: this.hero.headDirection, velocityX: this.hero.body.velocity.x, velocityY: this.hero.body.velocity.y });

         }

        if(this.scene.mainButtoms.R.isDown){
            this.hero.isGrabing = true;
            switch(this.hero.headDirection){
                case 'standDown':
                    this.hero.anims.play('downPull',true);
                    this.hero.setVelocityY(this.hero.heroSpeed/2);
                    break;
                case 'standUp':
                    this.hero.anims.play('upPull',true);
                    this.hero.setVelocityY(-this.hero.heroSpeed/2);
                    break;
                case 'standLeft':
                    this.hero.anims.play('leftPull',true);
                    break;
                case 'standRight':
                    this.hero.anims.play('rightPull',true);
                    break;
            }

        }else if(this.scene.mainButtoms.W.isDown){
            this.powerMarker.setVisible(true);
            this.powerMarker.changeSize(1,5);

        }else if(this.scene.mainButtoms.E.isDown){
            this.powerMarker.setVisible(true);
            this.powerMarker.changeSize(5,1);
        }else{
            this.powerMarker.isVisible = false;
        }

        if(this.scene.mainButtoms.Q.isDown && time > this.hero.lastDash ){
            //Push atack
            this.hero.isDashing = true;
            this.hero.lastDash = time +1000;
            switch(this.hero.headDirection){
                case 'standDown':
                    this.hero.setVelocityY(this.hero.heroSpeed*2);
                    //this.physics.moveTo(this.hero, this.hero.x, this.hero.y + 10, 4);
                    break;
                case 'standUp':
                    this.hero.setVelocityY(-this.hero.heroSpeed*2);
                    this.hero.setVelocityX(0);
                    break;
                case 'standLeft':
                    this.hero.setVelocityY(0);
                    this.hero.setVelocityX(-this.hero.heroSpeed*3);
                    break;
                case 'standRight':
                    this.hero.setVelocityY(0);
                    this.hero.setVelocityX(this.hero.heroSpeed*3);
                    break;
            }
        }

        if(this.hero.isDashing && ( time - this.hero.lastDash ) > this.hero.dashDuration ){
            this.hero.isDashing = false;
        }
        if(this.scene.mainButtoms.R.isUp){
            this.hero.isGrabing = false;
        }
      }



      //update Stats
      if(time > this.hero.manaRecoverNextTime && this.hero.mana <= this.hero.manaMax){
          this.hero.manaRecoverNextTime = time + this.hero.manaRecoverRate;
          this.hero.mana += this.hero.manaRecoverAmount;
      }
      if(time > this.hero.healthRecoverNextTime && this.hero.heroHealth <= this.hero.healthMax){
          this.hero.healthRecoverNextTime = time + this.hero.healthRecoverRate;
          this.hero.heroHealth += this.hero.healthRecoverAmount;
      }
      this.powerMarker.update(time,delta);
      this.uibar.update();
  }
  destroy() {
    this.hero.destroy();
  }

  collideCallbackTest(){
        console.log("Collide Test");
  }
}
