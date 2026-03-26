const isMobile = navigator.maxTouchPoints > 0;

const config = {
  type: Phaser.AUTO,
  width:  isMobile ? window.innerWidth  : 480,
  height: isMobile ? window.innerHeight : 640,
  backgroundColor: '#000011',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scale: {
    mode:       Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [StartScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
