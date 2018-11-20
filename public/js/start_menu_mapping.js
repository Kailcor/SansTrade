var x = 90;
var x_dist= 50;
var y = 150;
var y_dist = 210;
var x_emb = 205;
var y_emb = 300;
var x_emb_dist = 60;
var MENU_MAPPING = {
  SECTION:[
    {

      NAME: 'Hero',
      ITEMS:[
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'mee',
          ANIMKEY: 'mee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 'blacksmith',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: Mee',
            'Dmg: 19',
            'Def: 15'

          ]
        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'yee',
          ANIMKEY: 'yee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 'carpenter',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'lee',
          ANIMKEY: 'lee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 'alquimist',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'ree',
          ANIMKEY: 'ree',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 'chef',

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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'tee',
          ANIMKEY: 'tee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 'chef',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'xee',
          ANIMKEY: 'xee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 'chaman',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'kee',
          ANIMKEY: 'kee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y,
          TRADE: 'alquimist',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: ',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

        },
        {
          NAME: '',
          SPRITEKEY: 'faces',
          SPRITESHEETKEY: 'wee',
          ANIMKEY: 'wee',
          SCALE: 1.5,
          X: x+=x_dist,
          Y: y_dist,
          TRADE: 'blacksmith',
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
          healthRecoverNextTime: 0,
          infoText: [
            'Name: Wee',
            'Trade: ',
            'Dmg: 18',
            'Def: 20'

          ]

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
