export default class InitState extends Phaser.Scene {
  // Init
  constructor () {
    super({ key: 'InitState', active: false });
  }
  
  // Preload assets
  preload () {
    // Loading Screen
    this.load.image('img_load', './assets/img/loading.png');
    
    // Background
    this.add.image(550 / 2, 400 / 2, 'img_load');
    
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xAAAAAA, 0.8);
    progressBox.fillRect(215, 270, 110, 10);
    
    var progressBar = this.add.graphics();
    
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 100,
        text: '',
        style: {
            font: '12px monospace',
            fill: '#000000'
        }
    });

    assetText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
        progressBar.clear();
        progressBar.fillStyle(0x000000, 1);
        progressBar.fillRect(217, 272, 106 * value, 6);
    });
    
    this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    /*this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        assetText.destroy();
    });*/
    
    // Lava
    this.load.image('img_lava', './assets/img/lava.png');
    this.load.spritesheet('img_lava_particle', './assets/img/lava_bubble.png', { frameWidth: 8, frameHeight: 8 });
    
    // Buttons
    this.load.image('img_button_play', './assets/img/button_play.png');
    this.load.image('img_button_help', './assets/img/button_help.png');
    this.load.image('img_button_back', './assets/img/button_back.png');
    
    // Background
    this.load.image('img_background', './assets/img/back.png');
    this.load.image('img_help', './assets/img/help.png');
    
    // Title
    this.load.image('img_title', './assets/img/title.png');
    
    // Bricks
    this.load.image('img_brick_blue', './assets/img/bricks/blue.png');
    this.load.image('img_brick_brown', './assets/img/bricks/brown.png');
    this.load.image('img_brick_red', './assets/img/bricks/red.png');
    this.load.image('img_brick_yellow', './assets/img/bricks/yellow.png');
    this.load.image('img_brick_white', './assets/img/bricks/white.png');
    
    // Brick particles
    this.load.spritesheet('img_particles_blue', './assets/img/bricks/particles_blue.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('img_particles_brown', './assets/img/bricks/particles_brown.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('img_particles_red', './assets/img/bricks/particles_red.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('img_particles_yellow', './assets/img/bricks/particles_yellow.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('img_particles_white', './assets/img/bricks/particles_white.png', { frameWidth: 20, frameHeight: 20 });
    
    // Info bar
    this.load.image('img_info_bar', './assets/img/info_bar.png');
		
    // Ball
    this.load.image('img_ball_fire', './assets/img/ball_fire.png');
    this.load.image('img_ball', './assets/img/ball.png');
    
    // Bar
    this.load.image('img_bar', './assets/img/bar/bar.png');
    this.load.image('img_bar_small', './assets/img/bar/bar_small.png');
    this.load.image('img_bar_big', './assets/img/bar/bar_big.png');
    
    // Powerups
    this.load.image('img_powerup_ball_fast', './assets/img/powerup/ball_fast.png');
    this.load.image('img_powerup_ball_fire', './assets/img/powerup/ball_fire.png');
    this.load.image('img_powerup_ball_slow', './assets/img/powerup/ball_slow.png');
    this.load.image('img_powerup_ball_multi', './assets/img/powerup/ball_multi.png');
    this.load.image('img_powerup_bar_big', './assets/img/powerup/bar_big.png');
    this.load.image('img_powerup_bar_small', './assets/img/powerup/bar_small.png');
    this.load.image('img_powerup_ball_error', './assets/img/powerup/ball_error.png');
    
    // Music
    this.load.audio('music', 'assets/sfx/music.mp3');
    
    // Audio
    this.load.audio('bigger', 'assets/sfx/bigger.mp3');
    this.load.audio('bounce', 'assets/sfx/bounce.mp3');
    this.load.audio('break', 'assets/sfx/break.mp3');
    this.load.audio('dirt', 'assets/sfx/dirt.mp3');
    this.load.audio('explode', 'assets/sfx/explode.mp3');
    this.load.audio('lava', 'assets/sfx/lava.mp3');
    this.load.audio('multiball', 'assets/sfx/multiball.mp3');
    this.load.audio('smaller', 'assets/sfx/smaller.mp3');
    this.load.audio('slow_down', 'assets/sfx/slow_down.mp3');
    this.load.audio('speed_up', 'assets/sfx/speed_up.mp3');
  }
    
  // Create
  create () {
    this.scene.start('MenuState');
  }
}