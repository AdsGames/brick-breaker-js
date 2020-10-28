/* eslint-disable max-lines */
import * as Phaser from "phaser";

import Brick from "./Brick";
import Lava from "./Lava";
import Bar from "./Bar";
import Ball from "./Ball";
import Powerup from "./Powerup";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "GameState",
  physics: {
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
    default: "arcade",
  },
};

export default class GameState extends Phaser.Scene {
  private lives: number = 3;

  private level: number = 1;

  private score: number = 0;

  private readonly levelWidth: number = 8;

  private levelHeight: number = 2;

  private levelText!: Phaser.GameObjects.Text;

  private livesText!: Phaser.GameObjects.Text;

  private lava!: Lava;

  private bricks!: Phaser.Physics.Arcade.StaticGroup;

  private balls!: Phaser.Physics.Arcade.Group;

  private powerups!: Phaser.Physics.Arcade.Group;

  private bar!: Bar;

  private waitingBall: Phaser.GameObjects.GameObject | null = null;

  private waiting: boolean = false;

  private sfxSpeedUp!: Phaser.Sound.BaseSound;

  private sfxSlowDown!: Phaser.Sound.BaseSound;

  private sfxSmaller!: Phaser.Sound.BaseSound;

  private sfxMultiball!: Phaser.Sound.BaseSound;

  private sfxBigger!: Phaser.Sound.BaseSound;

  private sfxBounce!: Phaser.Sound.BaseSound;

  private sfxBreak!: Phaser.Sound.BaseSound;

  private sfxDirt!: Phaser.Sound.BaseSound;

  private sfxExplode!: Phaser.Sound.BaseSound;

  private sfxMusic!: Phaser.Sound.BaseSound;

  public constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.initUi();
    this.initGameObjects();
    this.initAudio();
    this.changeLevel();
  }

  public initUi(): void {
    // Background
    this.add.image(550 / 2, 400 / 2, "img_background");

    // Info bar
    this.add.image(55, 20, "img_info_bar");
    this.add.image(495, 20, "img_info_bar");

    // Text
    this.levelText = this.add.text(458, 12, `level: ${this.level}`, {
      fill: "#000",
      fontSize: "16px",
    });
    this.livesText = this.add.text(18, 12, `lives: ${this.lives}`, {
      fill: "#000",
      fontSize: "16px",
    });
  }

  public initGameObjects(): void {
    // Lava
    this.lava = new Lava(
      this,
      550 / 2,
      400 - 10,
      "img_lava",
      "img_lava_particle"
    );

    // Bricks group
    this.bricks = new Phaser.Physics.Arcade.StaticGroup(
      this.physics.world,
      this
    );

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
  }

  public initAudio(): void {
    // Audio
    this.sfxSpeedUp = this.sound.add("speed_up");
    this.sfxSlowDown = this.sound.add("slow_down");
    this.sfxSmaller = this.sound.add("smaller");
    this.sfxMultiball = this.sound.add("multiball");

    this.sfxBigger = this.sound.add("bigger");
    this.sfxBounce = this.sound.add("bounce");
    this.sfxBreak = this.sound.add("break");
    this.sfxDirt = this.sound.add("dirt");
    this.sfxExplode = this.sound.add("explode");

    this.sfxMusic = this.sound.add("music");
    this.sfxMusic.play();
    if (this.sfxMusic instanceof Phaser.Sound.WebAudioSound) {
      this.sfxMusic.setLoop(true);
    }

    const sfxLava = this.sound.add("lava");
    sfxLava.play();
  }

  public changeLevel(): void {
    // Intensify!
    if (this.level <= 10) {
      if (this.level < 9) this.levelHeight = this.level + 1;

      this.lava.lavaEmitter.setSpeed({
        max: 100 + this.level * 10,
        min: 50 + this.level * 10,
      });
      this.lava.lavaEmitter.setLifespan({
        max: 500 + this.level * 50,
        min: 100 + this.level * 30,
      });
    }

    // Bar
    this.bar.setBarSize(0);

    // Balls
    this.balls.clear(true, true);

    // Create ball
    this.waitingBall = this.createBall(550 / 2, 300, true);

    // Wait for input
    this.waiting = true;

    // Bricks
    this.bricks.clear(true, true);

    // Make bricks
    this.makeBricks(this.levelWidth, this.levelHeight);

    // Powerups
    this.powerups.clear(true, true);

    // Create colliders
    this.createColliders();
  }

  public createColliders(): void {
    this.createCollider(
      this.bricks,
      this.balls,
      this.collideBrickBall.bind(this)
    );
    this.createCollider(this.balls, this.bar, this.collideBallBar.bind(this));
    this.createCollider(
      this.powerups,
      this.bar,
      this.collidePowerupBar.bind(this)
    );
    this.createCollider(this.balls, this.lava, this.collideBallLava.bind(this));
    this.createCollider(
      this.powerups,
      this.lava,
      this.collidePowerupLava.bind(this)
    );
  }

  public createCollider(
    group1: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group,
    group2: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group,
    collider: (
      obj1: Phaser.GameObjects.GameObject,
      obj2: Phaser.GameObjects.GameObject
    ) => void
  ): void {
    // eslint-disable-next-line no-undefined
    this.physics.add.collider(group1, group2, collider, undefined, this);
  }

  public makeBricks(newWidth: number, newHeight: number): void {
    // Create asked amount
    for (let i = 0; i < newWidth; i += 1) {
      for (let t = 0; t < newHeight; t += 1) {
        let brickType = Phaser.Math.Between(0, ((this.level - 1) % 5) + 1);
        const brickTypeSpecial = Phaser.Math.Between(0, 10);

        let newBrick = null;

        if (brickTypeSpecial === 1) {
          brickType = 10;
          newBrick = new Brick(this, 0, 0, brickType);
        } else {
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

        if (newBrick && (brickType < 4 || brickTypeSpecial === 1)) {
          newBrick.x = 45 + i * 64;
          newBrick.y = 70 + t * 24;
          this.bricks.add(newBrick);
        }
      }
    }
  }

  public update(): void {
    // Update bar, keyboard polling
    this.bar.update();

    // Lose game! (YOUUU LOSSEEEE *dannyvoice*(tm))
    if (this.lives <= 0) {
      this.sfxMusic.stop();
      this.scene.start("GameOverState", {
        level: this.level,
        score: this.score,
      });
    }

    // Next level
    if (this.bricks.getLength() <= 0) {
      this.level += 1;
      this.changeLevel();
    }

    // Waiting ball? Move ball with bar
    this.balls.getChildren().forEach((child) => {
      if (child instanceof Ball && child.isWaiting()) {
        child.x = this.bar.x;
      }
    });

    // Display lives
    this.livesText.setText(`LIVES: ${this.lives}`);

    // Display current level
    this.levelText.setText(`LEVEL: ${this.level}`);
  }

  public makeExplosion(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    gravity: number,
    particleImage: string
  ): void {
    // Explosion emitter
    const brickEmitter = this.add.particles(particleImage).createEmitter({});
    brickEmitter.setFrame([0, 1, 2, 3], true);
    brickEmitter.setSpeed(speed);
    brickEmitter.setGravity(0, gravity);
    brickEmitter.setScale(0.7);
    brickEmitter.setLifespan({ max: 600, min: 200 });

    const emitZoneRect = {
      quantity: 1,
      source: new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
      type: "random",
    };

    brickEmitter.setEmitZone(emitZoneRect);
    brickEmitter.explode(10, x, y);
  }

  private createPowerup(
    x: number,
    y: number,
    type: number,
    velocityX: number,
    velocityY: number
  ): void {
    const newPowerup = new Powerup(this, x, y, type);
    this.powerups.add(newPowerup);
    if (newPowerup.body instanceof Phaser.Physics.Arcade.Body) {
      newPowerup.body.setVelocity(velocityX, velocityY);
    }
  }

  private createBall(x: number, y: number, waiting: boolean): Ball {
    const newBall = new Ball(this, x, y, waiting);
    this.balls.add(newBall);
    if (newBall.body instanceof Phaser.Physics.Arcade.Body) {
      newBall.body.setCollideWorldBounds(true);
      newBall.body.setVelocity(0);
      newBall.body.bounce.setTo(1, 1);
    }
    return newBall;
  }

  private collideBrickBall(brick: Phaser.GameObjects.GameObject): void {
    if (!(brick instanceof Brick)) {
      return;
    }

    const { x, y, width, height } = brick;

    const particles = {
      blue: "img_particles_blue",
      brown: "img_particles_brown",
      red: "img_particles_red",
      white: "img_particles_white",
      yellow: "img_particles_yellow",
    };

    switch (brick.getBrickType()) {
      case 0:
        this.makeExplosion(x, y, width, height, 100, 80, particles.blue);
        break;
      case 1:
        this.sfxDirt.play();
        this.makeExplosion(x, y, width, height, 40, 50, particles.brown);
        break;
      case 2:
        this.makeExplosion(x, y, width, height, 80, 80, particles.red);
        this.bricks.add(new Brick(this, x, y, 0));
        break;
      case 3:
        this.sfxExplode.play();
        this.makeExplosion(x, y, width, height, 200, 50, particles.yellow);
        break;
      case 10:
        this.makeExplosion(x, y, width, height, 50, 70, particles.white);
        this.createPowerup(x, y, Phaser.Math.Between(0, 4), 0, 60);
        break;
      default:
        throw Error("Invalid brick id!");
    }

    this.sfxBounce.play();
    this.sfxBreak.play();
    this.score += 1;

    // Remove brick
    this.bricks.remove(brick, true, true);
  }

  private collideBallBar(
    bar: Phaser.GameObjects.GameObject,
    ball: Phaser.GameObjects.GameObject
  ): void {
    if (!(bar instanceof Bar) || !(ball instanceof Ball)) {
      return;
    }

    this.sfxBounce.play();
    ball.hitBar(bar.x);
  }

  // eslint-disable-next-line max-lines-per-function
  private collidePowerupBar(
    bar: Phaser.GameObjects.GameObject,
    powerup: Phaser.GameObjects.GameObject
  ): void {
    if (!(bar instanceof Bar) || !(powerup instanceof Powerup)) {
      return;
    }

    switch (powerup.getType()) {
      case 0:
        this.balls.getChildren().forEach((child) => {
          if (
            child instanceof Ball &&
            child.body instanceof Phaser.Physics.Arcade.Body
          ) {
            child.body.setVelocity(
              child.body.velocity.x * 0.8,
              child.body.velocity.y * 0.8
            );
          }
        });
        this.sfxSlowDown.play();
        break;
      case 1:
        this.balls.getChildren().forEach((child) => {
          if (
            child instanceof Ball &&
            child.body instanceof Phaser.Physics.Arcade.Body
          ) {
            child.body.setVelocity(
              child.body.velocity.x * 1.2,
              child.body.velocity.y * 1.2
            );
          }
        });
        this.sfxSpeedUp.play();
        break;
      case 2:
        this.balls.getChildren().forEach((child) => {
          if (
            child instanceof Ball &&
            child.body instanceof Phaser.Physics.Arcade.Body
          ) {
            const newBall = this.createBall(child.x, child.y, false);

            if (newBall.body instanceof Phaser.Physics.Arcade.Body) {
              newBall.body.setVelocity(
                -child.body.velocity.x,
                child.body.velocity.y
              );
            }
          }
        });
        this.sfxMultiball.play();
        break;
      case 3:
        bar.setBarSize(1);
        this.sfxBigger.play();
        break;
      case 4:
        bar.setBarSize(-1);
        this.sfxSmaller.play();
        break;
      default:
        throw new Error("Invalid powerup id");
    }

    // Remove powerup
    this.powerups.remove(powerup, true, true);
  }

  private collideBallLava(
    _lava: Phaser.GameObjects.GameObject,
    ball: Phaser.GameObjects.GameObject
  ): void {
    if (!(ball instanceof Ball)) {
      return;
    }

    // Remove ball
    this.balls.remove(ball, true, true);

    // Make a new one
    if (this.balls.getLength() === 0) {
      this.waitingBall = this.createBall(550 / 2, 300, true);
      this.waiting = true;

      // Lives down
      this.removeLife();
    }
  }

  private collidePowerupLava(
    _lava: Phaser.GameObjects.GameObject,
    powerup: Phaser.GameObjects.GameObject
  ): void {
    if (!(powerup instanceof Powerup)) {
      return;
    }

    // Remove powerup
    this.powerups.remove(powerup, true, true);
  }

  private removeLife(): void {
    this.lives -= 1;
  }
}
