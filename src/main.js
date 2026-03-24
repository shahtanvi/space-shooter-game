const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
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
