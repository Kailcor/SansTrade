var x = 90;
var x_dist= 50;
var y = 150;
var y_dist = 210;
var x_emb = 105;
var y_emb = 540;
var x_emb_dist = 80;
var MENU_MAPPING = {
  SECTION:[
    {

      NAME: 'Hero',
      ITEMS:[
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'mee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'yee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'lee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'ree',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 0,

          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'tee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'xee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'kee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: '',
          ANIMKEY: 'wee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 0,
          headDirection: 'standDown',
          heroSpeed: 30,
          maxSpeed: 100,
          velocityX: 0,
          velocityY: 0,
          miningSpeed: 30,
          lastMined: 0,
          gold: 0,
          mana: 100,
          heroHealth: 100,
          manaMax: 200,
          healthMax: 230,
          manaRecoverRate: 100,
          manaRecoverAmount: 1,
          manaRecoverNextTime: 0 ,
          healthRecoverRate: 300,
          healthRecoverAmount: 1,
          healthRecoverNextTime: 0

        }
      ]
    },
    {
      NAME: 'Trade',
      ITEMS:[
        {
          SPRITEKEY: 'objects',
          ANIMKEY: 'carpenter',
          SCALE: 3,
          X: x_emb+=x_dist,
          Y: y_emb
        },
        {
          SPRITEKEY: 'objects',
          ANIMKEY: 'chef',
          SCALE: 3,
          X: x_emb+=x_emb_dist,
          Y: y_emb
        } ,
        {
          SPRITEKEY: 'objects',
          ANIMKEY: 'blacksmith',
          SCALE: 3,
          X: x_emb+=x_emb_dist,
          Y: y_emb
        },
        {
          SPRITEKEY: 'objects',
          ANIMKEY: 'alquimist',
          SCALE: 3,
          X: x_emb+=x_emb_dist,
          Y: y_emb
        },
         {
          SPRITEKEY: 'objects',
          ANIMKEY: 'chaman',
          SCALE: 3,
          X: x_emb+=x_emb_dist,
          Y: y_emb
        }
      ]
    }
  ]
};


  export default MENU_MAPPING;
