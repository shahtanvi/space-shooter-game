class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score    || 0;
    this.isNewBest  = data.isNewBest || false;
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    const mono = (size, color = '#ffffff') => ({
      fontFamily: '"Courier New", monospace',
      fontSize:   `${size}px`,
      fill:       color
    });

    // Dark overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.92);

    // Title
    this.add.text(W / 2, 75, 'GAME OVER', mono(42, '#ff3344'))
      .setOrigin(0.5)
      .setStroke('#000000', 6);

    // Score
    this.add.text(W / 2, 138, 'SCORE', mono(13, '#aaaacc')).setOrigin(0.5);
    this.add.text(W / 2, 165, this.finalScore.toLocaleString(), mono(34)).setOrigin(0.5);

    if (this.isNewBest) {
      this.add.text(W / 2, 205, '★  NEW  BEST  ★', mono(15, '#ffdd44')).setOrigin(0.5);
    }

    // Divider
    this.add.text(W / 2, 230, '─────────────────────', mono(13, '#333366')).setOrigin(0.5);

    // Top-5 leaderboard
    this.add.text(W / 2, 255, 'TOP  SCORES', mono(14, '#aaaaff')).setOrigin(0.5);

    const scores = JSON.parse(localStorage.getItem('spaceShooter_scores') || '[]');
    if (scores.length === 0) {
      this.add.text(W / 2, 290, '— no scores yet —', mono(13, '#444455')).setOrigin(0.5);
    } else {
      scores.slice(0, 5).forEach((s, i) => {
        const isThis = (s === this.finalScore && this.isNewBest && i === 0);
        const color  = i === 0 ? '#ffdd44' : '#ccccdd';
        const medal  = ['★', '2', '3', '4', '5'][i];
        const suffix = isThis ? '  ←' : '';
        this.add.text(W / 2, 282 + i * 26, `${medal}   ${s.toLocaleString()}${suffix}`, mono(14, color))
          .setOrigin(0.5);
      });
    }

    this.add.text(W / 2, H - 110, '─────────────────────', mono(13, '#333366')).setOrigin(0.5);

    // Blinking prompt
    const prompt = this.add.text(W / 2, H - 80, 'PRESS  SPACE  TO  PLAY  AGAIN', mono(15, '#88ffaa'))
      .setOrigin(0.5);

    this.tweens.add({
      targets:  prompt,
      alpha:    0,
      duration: 550,
      ease:     'Sine.easeInOut',
      repeat:   -1,
      yoyo:     true
    });

    // Return to Start screen (which shows updated leaderboard)
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('StartScene');
    });
  }
}
