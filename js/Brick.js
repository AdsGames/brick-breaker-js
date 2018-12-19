// Brick class
export default class Brick extends Phaser.GameObjects.Sprite {
  // Init
  constructor (scene, x, y, type) {
    // Create sprite
    super(scene, x, y, '');
    scene.add.existing(this);
    
    // Physics
    scene.physics.world.enable(this);
    
    this.body.setCollideWorldBounds(true);
    this.body.setSize(64, 24);
    this.body.setOffset(-2, -2);
    this.body.setImmovable(true);
    this.body.onCollide = true;
    
    // Select texture
    this.type = type;
    super.setTexture(this.selectImage(this.type));
  }
  
  // Select image
  selectImage(type) {
    switch (type) {
      case 0:
        return 'img_brick_blue';
      case 1:
        return 'img_brick_brown';
      case 2:
        return 'img_brick_red';
      case 3:
        return 'img_brick_yellow';
      case 10:
        return 'img_brick_white';
    }
    
    return 'img_brick_blue';
  }
  
  // Get type
  getType() {
    return this.type;
  }
}