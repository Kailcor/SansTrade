/**
 * A class that wraps up our resources logic. It creates and animates a sprite in
 * response to Player Actions. Call its update method from the scene's update and call its destroy
 * method when you're done with the resource.
 */
export default class Resource {
  constructor(scene, type, x,y){
    this.scene = scene;
    this.type = type;
    this.amount = this.randomAmount();
    this.state = "available";
    this.sprite = this.scene.physics.add.sprite(x, y, 'objects');
  }
  update(){
    //TODO Create update for resource.
  }
  consumed(){
    //TODO make the resource consumed and change the sprite and clock to renovation.
  }

  destroy(){
    //TODO Destroy the resources.
  }
  randomAmount(){
    //TODO return random number between accepted values
  }
  defineAnims(){
    const anims = this.scene.anims;
    anims.create({
        key: 'plant',
        frames: [ {key: 'objects',  frame: 130 } ],
        frameRate: 5,
        repeat: -1
    });
  }
}
