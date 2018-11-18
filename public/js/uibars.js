

export default class UiBar {
    constructor(scene, player, x, y){
        this.scene = scene;
        this.hero = player.hero;
        const anims = scene.anims;
        //hearts animns
        anims.create({
            key: 'fullHeart',
            frames:  [ {key: 'hearts',  frame: 0 } ],
            frameRate: 5
        });
        anims.create({
            key: 'threeQuarterHeart',
            frames:  [ {key: 'hearts',  frame: 1 } ],
            frameRate: 5
        });
        anims.create({
            key: 'halfHeart',
            frames:  [ {key: 'hearts',  frame: 2 } ],
            frameRate: 5
        });
        anims.create({
            key: 'aQuarterHeart',
            frames: this.scene.anims.generateFrameNumbers('hearts', {start: 3, end: 4}),
            frameRate: 8,
            repeat: -1
        });
        anims.create({
            key: 'empty',
            frames:  [ {key: 'hearts',  frame: 4 } ],
            frameRate: 5
        });
        
        this.hero.manaBarBg = this.scene.add.sprite(x, y, 'manabarbg');
        this.hero.manaBar  = this.scene.add.sprite(x - this.hero.manaBarBg.width/2, y, 'manabar');
        this.hero.manaBar.setOrigin(0,0);

       //hearts display
        this.hero.hearts = this.scene.add.group({
            key: 'heart',
            repeat: 3,
            setXY:{
                x: this.hero.x - 8,
                y: this.hero.y -18,
                StepX: 5,
                StepY: 0
            },
            setScale: {
                x: 0.9,
                y: 0.9
            }
        });
    }

    update(){
        if(this.hero.manaBar !== undefined && this.hero.manaBarBg !== undefined  ){

            this.hero.manaBarBg.x = this.hero.x;
            this.hero.manaBarBg.y = this.hero.y-12;
            this.hero.manaBar.x = this.hero.x-9;
            this.hero.manaBar.y = this.hero.y-14;
            //updating mana
            this.hero.manaBar.scaleX = 1 - (this.hero.manaMax - this.hero.mana)/this.hero.manaMax;
        }
        if(this.hero.hearts !== undefined ){
            var lifePercent = this.hero.heroHealth/this.hero.healthMax;
            var adjustPositionX = -12;
            var i = 1;

            var uibarSelf = this;
            this.hero.hearts.getChildren().forEach(function (heart) {
                heart.x = uibarSelf.hero.x + adjustPositionX;
                adjustPositionX += 8;
                heart.y = uibarSelf.hero.y - 19;
                uibarSelf.defineHeartAnim(heart, lifePercent, i);
                i++;
            });
        }
    }

    defineHeartAnim(heart, lifePercent, heartPosition){
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
}
