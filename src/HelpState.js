// Imports
import Lava from "./Lava.js";

// Help state
export default class HelpState extends Phaser.Scene {
  // Init
  constructor () {
    super({ key: 'HelpState', active: false });
  }
  
  // Preload
  preload () {
    
  }
  
  // Create
  create () {
    // Background
    this.add.image(550 / 2, 400 / 2, 'img_background');
    
    // Lava
    new Lava(this, 550 / 2, 400 - 10, 'img_lava', 'img_lava_particle');
    
    // Help page
    this.add.image(550 / 2, 190, 'img_help');
    
    // Play button
    var button_back = this.add.sprite(60, 360, 'img_button_back');
    button_back.setInteractive();
    button_back.on('pointerdown', function (event) { 
      this.scene.start('MenuState');
    }, this);
  }
}