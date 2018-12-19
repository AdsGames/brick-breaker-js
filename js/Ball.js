// Ball class
export default class Ball extends Phaser.GameObjects.Sprite {
  // Init
  constructor (scene, x, y, type) {
    // Create sprite
    super(scene, x, y, '');
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);
    
    this.body.setSize(10, 10);
    this.body.setOffset(0, 0);
    
    this.body.onCollide = true;
    
    // Size
    this.type = type;
    
    // Select image
    super.setTexture(this.selectImage(this.type));
  }
  
  // Select image
  selectImage(type) {
    switch (type) {
      case 0:
        return 'img_ball';
      case 1:
        return 'img_ball_fire';
    }
    
    return 'img_ball';
  }
  
  // Hit bar
  hitBar(x) {
    //var oldVelocity2 = Math.pow(this.body.velocity.x, 2) + Math.pow(this.body.velocity.y, 2);
    this.body.setVelocityX(this.body.velocity.x + (this.x - x) * 3);
    //this.body.setVelocityY(Math.sqrt(oldVelocity2 - Math.pow(this.body.velocity.x, 2)) * -1);
    //FlxG.play( sfx_bounce, 0.8, false);
  }
}