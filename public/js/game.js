var config = {
  type: Phaser.AUTO,
  parent: 'palawar',
  width: 640,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      debugShowVelocity: true,
      pixelart:true,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);

function preload() {
    //Loading assets
    //tiles in spritesheet
    this.load.spritesheet('tiles','assets/world/tiles.png', {frameWidth: 8, frameHeight: 8, margin: 1, spacing: 2});
    this.load.tilemapTiledJSON('lightmap','assets/world/Palawar.json');

    this.load.spritesheet('hero','assets/players/link.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('hearts','assets/ui/hearts.png', {frameWidth: 10, frameHeight: 10});
    this.load.image('manabar','assets/ui/manabar.png');
    this.load.image('manabarbg','assets/ui/manabarbg.png');


}

function create() {
	//Reading sockect
	this.socket = io();
    //Other players group
    this.otherPlayers = this.physics.add.group();


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
    var self = this;

    //console.log(this.backgroundLayer.width);
    createSockets(self);
    createAnimations(self);
    createMiniMap(self);

    //Make the main camera focus on the player
    this.cameras.main.setBounds(-300, -300,1100 ,1100);
    //this.cameras.main.setLerp(0.8, 0.8);
    this.cameras.main.setZoom(1);


    //this.physics.add.collider(this.otherPlayers, this.hero, collideCallbackTest);

}
 function collideCallbackTest(){
        console.log("Collide Test");
 }
function update(time, delta) {
    if(this.hero){
        var x = this.hero.x;
        var y = this.hero.y;
        var headDirection = this.hero.headDirection;
        var isDoingAction = this.hero.isMining || this.hero.isGrabing  || this.hero.isDashing;

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
                 this.socket.emit('playerMining');
                 this.hero.mana--;
            }

        }


         if(!this.hero.heroMoving && !this.hero.isDashing){
                this.socket.emit('playerStopMoving');
                this.hero.anims.play(this.hero.headDirection, true);
                this.hero.setVelocityY(0);
                this.hero.setVelocityX(0);
         }else{
                this.socket.emit('playerMovement', {x: this.hero.x, y: this.hero.y, headDirection: this.hero.headDirection, velocityX: this.hero.body.velocity.x, velocityY: this.hero.body.velocity.y });
                //this.cameras.main.scrollX = this.hero.x - config.width/2;
                //this.cameras.main.scrollY = this.hero.y - config.height/2;
         }

        if(this.mainButtoms.R.isDown){

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

        }else if(this.mainButtoms.W.isDown){

        }else if(this.mainButtoms.E.isDown){

        }

        if(this.mainButtoms.Q.isDown && time > this.hero.lastDash ){
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
        if(this.mainButtoms.R.isUp){
            this.hero.isGrabing = false;
        }

        this.otherPlayers.getChildren().forEach(function (otherPlayer) {
            updateUI(otherPlayer);
            updateStats(otherPlayer, time, delta);

        });
        updateUI(this.hero);
        updateStats(this.hero, time, delta);




    }


}

function addPlayer(self, playerInfo) {
  self.hero = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'hero');
  //Hero stats
  self.hero.manaMax = 100;
  self.hero.mana = 100;
  self.hero.manaRecoverRate = 1000;
  self.hero.manaRecoverAmount = 1;
  self.hero.manaRecoverNextTime = 0;
  self.hero.healthMax = 300;
  self.hero.healthRecoverRate = 3000;
  self.hero.healthRecoverAmount = 1;
  self.hero.healthRecoverNextTime = 300;
  self.hero.heroHealth = 300;


  //Hero Movement Stats
  self.hero.headDirection = 'standDown';
  self.hero.heroMoving = false;
  self.hero.heroSpeed = 50;
  self.hero.heroMaxSpeed = 200;
  self.hero.isDashing = true;
  self.hero.lastDash = 0;
  self.hero.dashDuration = 10;
  self.hero.isGrabing = false;
  //Mining Stats
  self.hero.miningSpeed = 30;
  self.hero.lastMined = 0;
  self.hero.gold = 0;
  self.hero.team = playerInfo.team;
  //


  //Mana bar
  createUiBar(self, self.hero, playerInfo.x, playerInfo.y);

  //Para que no pueda salirse del mundo.
  self.hero.setCollideWorldBounds(true);
  self.cameras.main.scrollX = playerInfo.x - config.width/2;
    self.cameras.main.scrollY = playerInfo.y - config.height/2;
  if (playerInfo.team === 'blue') {
    //self.hero.setTint(0x0000ff);
  } else {
    //self.hero.setTint(0xff0000);
  }

  self.hero.setMaxVelocity(self.hero.heroMaxSpeed);
  self.physics.add.collider(self.objects, self.hero);
  self.physics.add.collider(self.otherPlayers, self.hero, collideCallbackTest);
  self.cameras.main.startFollow(self.hero, true);

    //self.hero.body.drawDebug();
}

function addOtherPlayers(self, playerInfo) {
      const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'hero');

      otherPlayer.headDirection = 'standDown';
      otherPlayer.heroMoving = false;
      otherPlayer.manaMax = playerInfo.manaMax;
      otherPlayer.mana = playerInfo.mana;
      otherPlayer.manaRecoverRate = playerInfo.manaRecoverRate;
      otherPlayer.manaRecoverAmount = playerInfo.manaRecoverAmount;
      otherPlayer.manaRecoverNextTime = playerInfo.manaRecoverNextTime;
      otherPlayer.healthMax = playerInfo.healthMax;
      otherPlayer.healthRecoverRate = playerInfo.healthRecoverRate;
      otherPlayer.healthRecoverAmount = playerInfo.healthRecoverAmount;
      otherPlayer.healthRecoverNextTime = playerInfo.healthRecoverNextTime;
      otherPlayer.heroHealth = playerInfo.heroHealth;

      //TODO Add pending stats that are on the server but not here (heroSpeed, maxSpeed, etc)

      if (playerInfo.team === 'blue') {
        otherPlayer.setTint(0x0000ff);
      } else {
        otherPlayer.setTint(0xff0000);
      }
      otherPlayer.playerId = playerInfo.playerId;
      createUiBar(self,otherPlayer, playerInfo.x, playerInfo.y);

      self.otherPlayers.add(otherPlayer);
      self.physics.add.collider(self.objects, otherPlayer);
      self.physics.add.collider(self.otherPlayers, otherPlayer);
}


function createAnimations(self){

//---------------- Animations -------------------
      self.anims.create({
         key: 'down',
          frames: self.anims.generateFrameNumbers('hero', {start: 0, end: 1}),
          frameRate: 5,
          repeat: -1
      });
      self.anims.create({
          key: 'up',
          frames: self.anims.generateFrameNumbers('hero', {start: 2, end: 3}),
          frameRate: 5,
          repeat: -1
      });
      self.anims.create({
          key: 'left',
          frames: self.anims.generateFrameNumbers('hero', {start: 4, end: 5}),
          frameRate: 5,
          repeat: -1
      });
      self.anims.create({
          key: 'right',
          frames: self.anims.generateFrameNumbers('hero', {start: 6, end: 7}),
          frameRate: 5,
          repeat: -1
      });

    // Stand
        self.anims.create({
         key: 'standDown',
          frames: [ {key: 'hero',  frame: 0 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'standUp',
          frames: [ {key: 'hero',  frame: 2 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'standLeft',
          frames: [ {key: 'hero',  frame: 4 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'standRight',
          frames:  [ {key: 'hero',  frame: 6 } ],
          frameRate: 5
      });

      //Cave


      self.anims.create({
          key: 'downSpade',
          frames: self.anims.generateFrameNumbers('hero', {start: 8, end: 9}),
          frameRate: 8,
          repeat: 1
      });
      self.anims.create({
          key: 'leftSpade',
          frames: self.anims.generateFrameNumbers('hero', {start: 10, end: 11}),
          frameRate: 8,
          repeat: 1
      });
      self.anims.create({
          key: 'upSpade',
          frames: self.anims.generateFrameNumbers('hero', {start: 12, end: 13}),
          frameRate: 8,
          repeat: 1
      });
      self.anims.create({
          key: 'rightSpade',
          frames: self.anims.generateFrameNumbers('hero', {start: 14, end: 15}),
          frameRate: 8,
          repeat: 1
      });
      //pull
      self.anims.create({
          key: 'downPull',
          frames: [ {key: 'hero',  frame: 16 } ],
          frameRate: 8
      });
      self.anims.create({
          key: 'upPull',
          frames: [ {key: 'hero',  frame: 17 } ],
          frameRate: 8
      });
      self.anims.create({
          key: 'rightPull',
          frames: [ {key: 'hero',  frame: 19 } ],
          frameRate: 8
      });

      self.anims.create({
          key: 'leftPull',
          frames: [ {key: 'hero',  frame: 18 } ],
          frameRate: 8
      });
    //Pick
      self.anims.create({
          key: 'downPick',
          frames: [ {key: 'hero',  frame: 20 } ],
          frameRate: 8
      });

      self.anims.create({
          key: 'upPick',
          frames: [ {key: 'hero',  frame: 23 } ],
          frameRate: 8
      });
      self.anims.create({
          key: 'rightPick',
          frames: [ {key: 'hero',  frame: 22 } ],
          frameRate: 8
      });

      self.anims.create({
          key: 'leftPick',
          frames: [ {key: 'hero',  frame: 21 } ],
          frameRate: 8
      });

      //hearts
      self.anims.create({
          key: 'fullHeart',
          frames:  [ {key: 'hearts',  frame: 0 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'threeQuarterHeart',
          frames:  [ {key: 'hearts',  frame: 1 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'halfHeart',
          frames:  [ {key: 'hearts',  frame: 2 } ],
          frameRate: 5
      });
      self.anims.create({
          key: 'aQuarterHeart',
          frames: self.anims.generateFrameNumbers('hearts', {start: 3, end: 4}),
          frameRate: 8,
          repeat: -1
      });
      self.anims.create({
          key: 'empty',
          frames:  [ {key: 'hearts',  frame: 4 } ],
          frameRate: 5
      });


}

function createSockets(self){
    //----------------Sockets Events-------------------
    //
    self.socket.on('connect',function(){

    });
	self.socket.on('currentPlayers', function (players) {
        Object.keys(players).forEach(function (id) {

          if (players[id].playerId === self.socket.id) {
            addPlayer(self, players[id]);
          }else {
            addOtherPlayers(self, players[id]);
          }
        });
    });
    //
    self.socket.on('newPlayer', function (playerInfo) {
        addOtherPlayers(self, playerInfo);
    });
    //
    self.socket.on('disconnect', function (playerId) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (playerId === otherPlayer.playerId) {
            otherPlayer.manaBar.destroy();
            otherPlayer.manaBarBg.destroy();
            otherPlayer.hearts.clear(true,true);
            otherPlayer.destroy();
          }
        });
      });
    self.socket.on('playerMoved',function(playerInfo){
       self.otherPlayers.getChildren().forEach(function(otherPlayer){
         if(playerInfo.playerId === otherPlayer.playerId){
             otherPlayer.setPosition(playerInfo.x, playerInfo.y);
             otherPlayer.headDirection = playerInfo.headDirection;

             switch(otherPlayer.headDirection){
                case 'standDown':
                    otherPlayer.anims.play('down',true);
                    break;
                case 'standUp':
                    otherPlayer.anims.play('up',true);
                    break;
                case 'standLeft':
                    otherPlayer.anims.play('left',true);
                    break;
                case 'standRight':
                    otherPlayer.anims.play('right',true);
                    break;
             }
             //Para corregir cuando chocan los cuerpos el otro jugador empieza a moverse por las fisica, pero solo se refleja en el servidor.
             //TODO Revisar si no hay una mejor solución, las velocidades podrian ir del lado del servidor.
             otherPlayer.body.setVelocityY(playerInfo.velocityY);
             otherPlayer.body.setVelocityX(playerInfo.velocityX);
         }

       });


    });

     self.socket.on('playerStoped',function(playerInfo){
         self.otherPlayers.getChildren().forEach(function(otherPlayer){
             if(playerInfo.playerId === otherPlayer.playerId){
                if(playerInfo.playerId === otherPlayer.playerId){
                    console.log(otherPlayer.headDirection);
                    otherPlayer.anims.play(otherPlayer.headDirection);
                    otherPlayer.body.setVelocityY(0);
                    otherPlayer.body.setVelocityX(0);
                 }
              }
          });
     });
}

function createMiniMap(self){
    self.minimap = self.cameras.add(10,0, 200,200).setZoom(0.25);
    self.minimap.scrollX = 320;
    self.minimap.scrollY = 320;
}
function createUiBar(self,hero,x,y){

  hero.manaBarBg = self.add.sprite(x, y, 'manabarbg');
  hero.manaBar  = self.add.sprite(x - hero.manaBarBg.width/2, y, 'manabar');
  hero.manaBar.setOrigin(0,0);

 //hearts display
  hero.hearts = self.add.group({
      key: 'heart',
      repeat: 3,
      setXY:{
          x: hero.x - 8,
          y: hero.y -18,
          StepX: 5,
          StepY: 0
      },
      setScale: {
          x: 0.9,
          y: 0.9
      }
  });

}
function updateUI(hero){
    if(hero.manaBar !== undefined && hero.manaBarBg !== undefined  ){
        hero.manaBarBg.x = hero.x;
        hero.manaBarBg.y = hero.y-12;
        hero.manaBar.x = hero.x-9;
        hero.manaBar.y = hero.y-14;

        //updating mana
        hero.manaBar.scaleX = 1 - (hero.manaMax - hero.mana)/hero.manaMax;

    }
    if(hero.hearts !== undefined ){
        var lifePercent = hero.heroHealth/hero.healthMax;
        var adjustPositionX = -12;
        var i = 1;
        hero.hearts.getChildren().forEach(function (heart) {
            heart.x = hero.x + adjustPositionX;
            adjustPositionX += 8;
            heart.y = hero.y - 19;
            defineHeartAnim(heart, lifePercent, i);
            i++;
        });


    }

}
function updateStats(hero, time, delta){
    if(time > hero.manaRecoverNextTime && hero.mana <= hero.manaMax){
        hero.manaRecoverNextTime = time + hero.manaRecoverRate;
        hero.mana += hero.manaRecoverAmount;
    }
    if(time > hero.healthRecoverNextTime && hero.heroHealth <= hero.healthMax){
        hero.healthRecoverNextTime = time + hero.healthRecoverRate;
        hero.heroHealth += hero.healthRecoverAmount;
    }


}

function defineHeartAnim(heart, lifePercent, heartPosition){
    var topLimit = (lifePercent - (0.25* heartPosition)) +0.01; //0.99 - (0.50)
    var bottomLimit = (lifePercent - (0.25* (heartPosition-1)));

    var calculation = (lifePercent - (0.25 * (heartPosition-1) ));

    if(topLimit >= 0){
        heart.anims.play('fullHeart');
    }else if(bottomLimit >= 0){
        if( calculation > 0.16 ){
            heart.anims.play('threeQuarterHeart');

        }else if(calculation > 0.08335){
            heart.anims.play('halfHeart');
        }else{
             heart.anims.play('aQuarterHeart');

        }
    }else{
         heart.anims.play('empty');

    }

}

//TODO implement grab  (velocity - 3Grab factor )
function grabMoving(headDirection, object){
    if (this.cursors.left.isDown){
        this.hero.heroMoving = true;
        this.hero.setVelocityX(-this.hero.heroSpeed/2);
        this.hero.setVelocityY(0);
    } else if (this.cursors.right.isDown){
        this.hero.heroMoving = true;
        this.hero.setVelocityX(this.hero.heroSpeed/2);
        this.hero.setVelocityY(0);
    }

    if (this.cursors.up.isDown){
        this.hero.heroMoving = true;
        this.hero.setVelocityY(-this.hero.heroSpeed/2);
        this.hero.setVelocityX(0);
    } else if(this.cursors.down.isDown){
        this.hero.heroMoving = true;
        this.hero.setVelocityY(this.hero.heroSpeed/2);
        this.hero.setVelocityX(0);
    }
}
