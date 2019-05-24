// Imports
import Lava from "./Lava.js";

// Menu state
export default class GameOverState extends Phaser.Scene {
  // Ctor
  constructor () {
    super({ 
      key: 'GameOverState', 
      active: false 
    });
  }

  // Init
  init({ score, level }) {
    this.score = score;
    this.level = level;
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

    // Text
    this.add.sprite(550 / 2, 400 / 2, 'img_game_over_panel')
      .setInteractive()
      .on('pointerdown', function (event) { 
        this.scene.start('MenuState');
      }, this);
    
    const textConf = { 
      fontSize: '18px', 
      color: '#000', 
      fontFamily: 'Consolas, monospace'
    }

    this.add.text(
      170, 
      160, 
      'Game Over!', 
      {
        ...textConf,
        fontSize: '38px'
      }
    );

    this.add.text(
      180, 
      200, 
      'Score: ' + this.score, 
      textConf
    );
    
    this.add.text(
      180, 
      220, 
      'Level: ' + this.level, 
      textConf
    );
  }
}