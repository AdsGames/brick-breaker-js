// Brick class
export default class Lava extends Phaser.GameObjects.Sprite {
  // Init
  constructor (scene, x, y, lava_image, lava_particle) {
    // Lava
    super(scene, x, y, lava_image);
    scene.add.existing(this);
    
    // Physics
    if (scene.physics) {
      scene.physics.world.enable(this);
      
      this.body.setImmovable(true);
      this.body.setSize(scene.width, 10);
      this.body.setOffset(0, 10);
      this.body.onCollide = true;
    }
    
    // Lava particles
    var particles = scene.add.particles(lava_particle);
    this.lava_emitter = particles.createEmitter();
    
    this.lava_emitter.setSpeed({ min: 50, max: 100 });
    this.lava_emitter.setGravity(0, 200);
    this.lava_emitter.setScale({ start: 1, end: 0.2 });
    this.lava_emitter.setAngle({ min: 230, max: 310 });
    
    this.lava_emitter.setLifespan({ min: 100, max: 500 });
    this.lava_emitter.setFrequency(100);
    this.lava_emitter.setPosition(0, 380);
    
    var emitZoneRect = {
      source: new Phaser.Geom.Rectangle(0, 0, 550, 1),
      type: 'random',
      quantity: 1
    };
    
    this.lava_emitter.setEmitZone(emitZoneRect);
    
  }
}