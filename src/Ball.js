// Ball class
export default class Ball extends Phaser.GameObjects.Sprite {
  // Init
  constructor (scene, x, y, waiting) {
    // Create sprite
    super(scene, x, y, '');
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);
    
    this.body.setSize(10, 10);
    this.body.setOffset(0, 0);
    
    this.body.onCollide = true;
    
    // Size
    this.type = 0;
    
    // Waiting
    this.waiting = waiting;
    
    // Select image
    super.setTexture(this.selectImage(this.type));
    
    // Move ball
    scene.input.on('pointerdown', function(){
      if (this.waiting) {
        this.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
        this.waiting = false;
      }
    }, this);
    
    scene.input.keyboard.on('keydown_SPACE', function(){
      if (this.waiting) {
        this.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
        this.waiting = false;
      }
    }, this);
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
  }
  
  // Is waiting
  isWaiting() {
    return this.waiting;
  }
}