// Imports
import Brick from "./Brick.js";
import Lava from "./Lava.js";
import Bar from "./Bar.js";
import Ball from "./Ball.js";
import Powerup from "./Powerup.js";

// State
export default class GameState extends Phaser.Scene {
  // Init
  constructor () {
    super({ 
      key: 'GameState', 
      active: false,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 }
        }
      }
    });
  }
  
  // Create
  create () {
    // Game state variables
    this.lives = 3;
    this.level = 1;
    this.score = 0;
    
    this.level_width = 8;
    this.level_height = 2;
    
    // Background
    this.add.image(550 / 2, 400 / 2, 'img_background');
    
    // Info bar
    this.add.image(55, 20, 'img_info_bar');
    this.add.image(495, 20, 'img_info_bar');
    
    // Text
    this.levelText = this.add.text(450, 12, 'level: ' + this.level, { fontSize: '16px', fill: '#000' });
    this.livesText = this.add.text(10, 12, 'lives: ' + this.lives, { fontSize: '16px', fill: '#000' });
    
    // Lava
    this.lava = new Lava(this, 550 / 2, 400 - 10, 'img_lava', 'img_lava_particle');
    
    // Bricks group
    this.bricks = new Phaser.Physics.Arcade.StaticGroup(this.physics.world, this);
    
    // Balls group
    this.balls = new Phaser.Physics.Arcade.Group(this.physics.world, this);
    
    // Powerups group
    this.powerups = new Phaser.Physics.Arcade.Group(this.physics.world, this);
    
    // Create bar
    this.bar = new Bar(this, 550 / 2, 340, 1);
    
    // New ball waiting
    this.waitingBall = null;
    
    // Waiting
    this.waiting = true;
    
    // Change level
    this.changeLevel();
    
    // Audio
    this.sfx_speed_up = this.sound.add('speed_up');
    this.sfx_slow_down = this.sound.add('slow_down');
    this.sfx_smaller = this.sound.add('smaller');
    this.sfx_multiball = this.sound.add('multiball');
    
    this.sfx_bigger = this.sound.add('bigger');
    this.sfx_bounce = this.sound.add('bounce');
    this.sfx_break = this.sound.add('break');
    this.sfx_dirt = this.sound.add('dirt');
    this.sfx_explode = this.sound.add('explode');
    
    this.sfx_music = this.sound.add('music');
    this.sfx_music.setLoop(true);
    this.sfx_music.play();
    
    var sfx_lava = this.sound.add('lava');
    sfx_lava.play();
    
    // Move ball
    this.input.on('pointerdown', function(){
      // Waiting? Move ball with bar
      if (this.waiting && this.waitingBall) {
        this.waitingBall.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
        this.waiting = false;
      }
    }, this);
  }
  
  // Change level
  changeLevel() {
    // Intensify!
    if (this.level <= 10){
      //balls.members[0].setLevel( level);
      
      if (this.level < 9)
        this.level_height = this.level + 1;
      
      this.lava.lava_emitter.setSpeed({ min: 50 + this.level * 10, max: 100 + this.level * 10 });
      this.lava.lava_emitter.setLifespan({ min: 100 + this.level * 30, max: 500 + this.level * 50 });
    }
    
    // Bar
    this.bar.setSize(0);
    
    // Balls
    this.balls.clear(true, true);
    
    // Create ball
    this.waitingBall = this.createBall(550 / 2, 300);
    
    // Wait for input
    this.waiting = true;
    
    // Bricks
    this.bricks.clear(true, true);
    
    // Make bricks
    this.makeBricks(this.level_width, this.level_height);
    
    // Powerups
    this.powerups.clear(true, true);
    
    // Add colliders
    this.physics.add.collider(this.bricks, this.balls, this.collideBrickBall, null, this);
    this.physics.add.collider(this.balls, this.bar, this.collideBallBar, null, this);
    this.physics.add.collider(this.powerups, this.bar, this.collidePowerupBar, null, this);
    this.physics.add.collider(this.balls, this.lava, this.collideBallLava, null, this);
    this.physics.add.collider(this.powerups, this.lava, this.collidePowerupLava, null, this);
  }
  
  // Make bricks
  makeBricks(newWidth, newHeight) {
    // Create asked amount
    for (var i = 0; i < newWidth; i++) {
      for (var t = 0; t < newHeight; t++) {
        var brickType = Phaser.Math.Between(0, ((this.level - 1)%5) + 1);
        var brickTypeSpecial = Phaser.Math.Between(0, 10);
        
        var newBrick = null;
        
        if (brickTypeSpecial != 1) {
          switch (brickType) {
            case 0:
              newBrick = new Brick(this, 0, 0, brickType);
              break;
            case 1:
              newBrick = new Brick(this, 0, 0, brickType);
              break;
            case 2:
              newBrick = new Brick(this, 0, 0, brickType);
              break;
            case 3:
              newBrick = new Brick(this, 0, 0, brickType);
              break;
            default:
              break;
          }
        }
        else {
          brickType = 10;
          newBrick = new Brick(this, 0, 0, brickType);	
        }
          
        if (brickType < 4 || brickTypeSpecial == 1) {
          newBrick.x = 45 + (i * 64);
          newBrick.y = 70 + (t * 24);
          this.bricks.add(newBrick);
        }
      }
    }
  }
  
  // Update
  update (time, delta) {
    // Lose game! (YOUUU LOSSEEEE *dannyvoice*(tm))
    if (this.lives <= 0) {
      this.sfx_music.stop();
      this.scene.start('MenuState');
    }
    
    // Next level
    if (this.bricks.getLength() <= 0) {
      this.level += 1;
      this.changeLevel();
    }
    
    // Waiting? Move ball with bar
    if (this.waiting && this.waitingBall) {
      this.waitingBall.x = this.bar.x;
    }
    
    // Display lives
    this.livesText.setText("LIVES:" + this.lives);
    
    // Display current level
    this.levelText.setText("LEVEL:" + this.level);
  }
  
  // Create explosion
  makeExplosion(x, y, width, height, rotation, speed, gravity, particle_img) {
    // Explosion emitter
    var particles = this.add.particles(particle_img);
    this.brick_emitter = particles.createEmitter();
    this.brick_emitter.setSpeed(speed);
    this.brick_emitter.setGravity(0, gravity);
    this.brick_emitter.setScale(0.7);
    this.brick_emitter.setLifespan( { min: 300, max: 1000 });
    var emitZoneRect = {
      source: new Phaser.Geom.Rectangle(-width/2, -height/2, width, height),
      type: 'random',
      quantity: 1
    };
    
    this.brick_emitter.setEmitZone(emitZoneRect);
    
    this.brick_emitter.explode(10, x, y);
  }
  
  // Create ball
  createBall(x, y) {
    var newBall = new Ball(this, x, y);
    this.balls.add(newBall);
    newBall.body.setCollideWorldBounds(true);
    newBall.body.setVelocity(0);
    newBall.body.bounce.setTo(1, 1);
    return newBall;
  }
  
  // Colliders
  // Brick with bar
  collideBrickBall(brick, ball) {
    // Do unique stuff
    switch (brick.getType()) {
      case 0:
        this.makeExplosion(brick.x, brick.y, brick.width, brick.height, 5, 50, 30, 'img_particles_blue');
        break;
      case 1:
        this.sfx_dirt.play();
        this.makeExplosion(brick.x, brick.y, brick.width, brick.height, 5, 10, 50, 'img_particles_brown');
        break;
      case 2:
        this.makeExplosion(brick.x, brick.y, brick.width, brick.height, 5, 10, 80, 'img_particles_red');
        var newBrick = new Brick(this, brick.x, brick.y, 0);	
        this.bricks.add(newBrick);
        break;
      case 3:
        this.sfx_explode.play();
        this.makeExplosion(brick.x, brick.y, brick.width, brick.height, 5, 100, 50, 'img_particles_yellow');
        break;
      case 10:
        this.makeExplosion(brick.x, brick.y, brick.width, brick.height, 5, 10, 70, 'img_particles_white');
        var newPowerup = new Powerup(this, brick.x, brick.y, Phaser.Math.Between(0, 4));	
        this.powerups.add(newPowerup);
        newPowerup.body.setVelocity(0, 60);
        break;
      default:
        console.log("Invalid brick id!");
    }
    
    this.sfx_bounce.play();
    this.sfx_break.play();
    
    // Remove brick
    this.bricks.remove(brick, true, true);
  }
  
  // Ball with bar
  collideBallBar(bar, ball) {
    this.sfx_bounce.play();
    ball.hitBar(bar.x);
  }
  
  // Powerup with bar
  collidePowerupBar(bar, powerup) {
    // Do unique stuff
    switch (powerup.getType()) {
      case 0:
        var tempBalls = this.balls.getChildren();
        tempBalls.forEach(child => {
          child.body.setVelocity(child.body.velocity.x * 0.8, child.body.velocity.y * 0.8);
				});
				this.sfx_slow_down.play();
        break;
      case 1:
        var tempBalls = this.balls.getChildren();
        tempBalls.forEach(child => {
          child.body.setVelocity(child.body.velocity.x * 1.2, child.body.velocity.y * 1.2);
				});
				this.sfx_speed_up.play();
        break;
      case 2:
				var tempBalls = this.balls.getChildren();
        tempBalls.forEach(child => {
          var newBall = this.createBall(child.x, child.y);
          newBall.body.setVelocity(-child.body.velocity.x, child.body.velocity.y);
				});
        this.sfx_multiball.play();
        break;
      case 3:
        bar.setSize(1);
				this.sfx_bigger.play();
        break;
      case 4:
        bar.setSize(-1);
				this.sfx_smaller.play();
        break;
      default:
        console.log("Invalid powerup id!");
    }
    
    // Remove powerup
    this.powerups.remove(powerup, true, true);
  }
  
  // Ball lava
  collideBallLava(lava, ball) {
    // Remove powerup
    this.balls.remove(ball, true, true);
    
    // Make a new one
    if (this.balls.getLength() == 0) {
      this.waitingBall = this.createBall(550 / 2, 300);
      this.waiting = true;
      
      // Lives down
      this.lives -= 1;
    }
  }
  
  // Powerup lava
  collidePowerupLava(lava, powerup) {
    // Remove powerup
    this.powerups.remove(powerup, true, true);
  }
}