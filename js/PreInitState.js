// Pre Init state
export default class PreInitState extends Phaser.Scene {
  // Init
  constructor () {
    super({ key: 'PreInitState', active: true });
  }
  
  // Preload
  preload () {
    // Loading Screen
    this.load.image('img_load', './assets/img/loading.png');
  }
      
  // Create
  create () {
    this.scene.start('InitState');
  }
}