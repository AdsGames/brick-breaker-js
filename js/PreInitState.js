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
        document.querySelector('script[src$="js/Main.js"]')
        .getAttribute('src')
        .replace('js/Main.js',"");

    this.load.image('img_load', 'assets/img/loading.png');
  }
      
  // Create
  create () {
    this.scene.start('InitState');
  }
}