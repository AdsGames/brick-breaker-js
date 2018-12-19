// Bar class
export default class Bar extends Phaser.GameObjects.Sprite {
  // Init
  constructor (scene, x, y, size) {
    // Create sprite
    super(scene, x, y, '');
    scene.add.existing(this);
    
    // Physics
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setOffset(0, 0);
    this.body.setImmovable(true);
    this.body.allowRotation = false;
    
    // Size
    this.size = size;
    
    // Set size
    this.setSize(0);
    
    // Move to mouse
    scene.input.on('pointermove', function (pointer) {
      this.setPosition(pointer.x, this.y);
    }, this);
  }
  
  // Select image
  selectImage(size) {
    switch (size) {
      case 0:
        return 'img_bar_small';
      case 1:
        return 'img_bar';
      case 2:
        return 'img_bar_big';
    }
    
    return 'img_bar';
  }
  
  // Set size
  setSize(size) {
    // Change size
    if (this.size + size > -1 && this.size + size < 3)
      this.size += size;
    
    // Get image
    super.setTexture(this.selectImage(this.size));
    
    // Set body size
    switch (this.size) {
      case 0:
        this.body.setSize(60, 16);
        break;
      case 1:
        this.body.setSize(90, 16);
        break;
      case 2:
        this.body.setSize(140, 16);
        break;
    }
    
    return 'img_bar';
  }
}