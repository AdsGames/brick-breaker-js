// Pre Init state
export default class PreInitState extends Phaser.Scene {
  // Init
  constructor () {
    super({ key: 'PreInitState', active: true });
  }
  
  // Preload
  preload () {
    // Loading Screen
    this.load.baseURL = 
        (window.location + '').replace(/[^\/]*$/g, '') +
        document.querySelector('script[src$="main.js"]')
        .getAttribute('src')
        .replace('main.js',"");

    this.load.image('img_load', 'assets/img/loading.png');
  }
      
  // Create
  create () {
    this.scene.start('InitState');
  }
}