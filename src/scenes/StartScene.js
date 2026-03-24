class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    const mono = (size, color = '#ffffff') => ({
      fontFamily: '"Courier New", monospace',
      fontSize:   `${size}px`,
      fill:       color
    });

    // ── Title block ───────────────────────────────────────────────────────────
    this.add.text(W / 2, 110, 'SPACE', mono(52, '#ffffff'))
      .setOrigin(0.5)
      .setStroke('#1133ff', 6);

    this.add.text(W / 2, 168, 'SHOOTER', mono(36, '#aabbff'))
      .setOrigin(0.5)
      .setStroke('#000033', 4);

    this.add.text(W / 2, 210, '─────────────────────', mono(13, '#333366'))
      .setOrigin(0.5);

    // ── Controls legend ───────────────────────────────────────────────────────
    const ctrlStyle = mono(12, '#888899');
    this.add.text(W / 2, 240, 'ARROWS / WASD  Move     SPACE  Fire     P  Pause', ctrlStyle)
      .setOrigin(0.5);

    this.add.text(W / 2, 262, '─────────────────────', mono(13, '#333366'))
      .setOrigin(0.5);

    // ── Leaderboard ───────────────────────────────────────────────────────────
    this.add.text(W / 2, 292, 'TOP SCORES', mono(15, '#aaaaff'))
      .setOrigin(0.5);

    const scores = JSON.parse(localStorage.getItem('spaceShooter_scores') || '[]');

    if (scores.length === 0) {
      this.add.text(W / 2, 328, '— no scores yet —', mono(13, '#444455'))
        .setOrigin(0.5);
    } else {
      scores.slice(0, 5).forEach((s, i) => {
        const color = i === 0 ? '#ffdd44' : '#ccccdd';
        const medal = ['★', '2', '3', '4', '5'][i];
        this.add.text(W / 2, 322 + i * 26, `${medal}   ${s.toLocaleString()}`, mono(15, color))
          .setOrigin(0.5);
      });
    }

    this.add.text(W / 2, H - 130, '─────────────────────', mono(13, '#333366'))
      .setOrigin(0.5);

    // ── Blinking start prompt ─────────────────────────────────────────────────
    const prompt = this.add.text(W / 2, H - 96, 'PRESS  SPACE  TO  START', mono(17, '#88ff88'))
      .setOrigin(0.5);

    this.tweens.add({
      targets:  prompt,
      alpha:    0,
      duration: 600,
      ease:     'Sine.easeInOut',
      repeat:   -1,
      yoyo:     true
    });

    // ── Version tag ───────────────────────────────────────────────────────────
    this.add.text(W / 2, H - 24, 'MILESTONE 3', mono(11, '#333344'))
      .setOrigin(0.5);

    // Space to start
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
}
