class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    const W        = this.scale.width;
    const H        = this.scale.height;
    const isMobile = MobileControls.isMobile();

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
    if (isMobile) {
      this.add.text(W / 2, 240, 'TILT  Move     HOLD RIGHT  Fire', ctrlStyle)
        .setOrigin(0.5);
    } else {
      this.add.text(W / 2, 240, 'ARROWS / WASD  Move     SPACE  Fire     P  Pause', ctrlStyle)
        .setOrigin(0.5);
    }

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
    const promptText = isMobile ? 'TAP  TO  START' : 'PRESS  SPACE  TO  START';
    const prompt = this.add.text(W / 2, H - 96, promptText, mono(17, '#88ff88'))
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
    this.add.text(W / 2, H - 24, 'MILESTONE 4', mono(11, '#333344'))
      .setOrigin(0.5);

    // ── Input ─────────────────────────────────────────────────────────────────
    if (isMobile) {
      // Use a native DOM event — iOS Safari only honours requestPermission()
      // when called directly from a real browser gesture handler, not Phaser's.
      const canvas = this.game.canvas;
      const onTap = () => {
        canvas.removeEventListener('touchstart', onTap);
        canvas.removeEventListener('click',      onTap);
        this._mobileStart();
      };
      canvas.addEventListener('touchstart', onTap, { once: true, passive: true });
      canvas.addEventListener('click',      onTap, { once: true });
    } else {
      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.start('GameScene', { calibration: 0 });
      });
    }
  }

  // ─── Mobile start flow ─────────────────────────────────────────────────────

  _mobileStart() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ requires explicit permission from a user gesture
      DeviceOrientationEvent.requestPermission()
        .then(result => {
          if (result === 'granted') {
            this._captureCalibrationAndStart();
          } else {
            this._showPermissionDenied();
          }
        })
        .catch(() => this._captureCalibrationAndStart());
    } else {
      // Android / other browsers — no permission needed
      this._captureCalibrationAndStart();
    }
  }

  // Listen for one orientation event to capture the player's natural holding angle.
  _captureCalibrationAndStart() {
    let started = false;

    const onOrientation = (e) => {
      if (started) return;
      started = true;
      window.removeEventListener('deviceorientation', onOrientation, true);
      this.scene.start('GameScene', { calibration: e.gamma || 0 });
    };
    window.addEventListener('deviceorientation', onOrientation, true);

    // Fallback: if no orientation event fires within 800 ms, start with 0°
    setTimeout(() => {
      if (started) return;
      started = true;
      window.removeEventListener('deviceorientation', onOrientation, true);
      this.scene.start('GameScene', { calibration: 0 });
    }, 800);
  }

  _showPermissionDenied() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.add.rectangle(W / 2, H / 2, W - 40, 110, 0x110011, 0.95)
      .setOrigin(0.5)
      .setDepth(20);
    this.add.text(W / 2, H / 2, 'Motion access denied.\n\nGo to Settings > Safari >\nMotion & Orientation\nand enable access, then reload.', {
      fontFamily: '"Courier New", monospace',
      fontSize:   '13px',
      fill:       '#ff6666',
      align:      'center'
    }).setOrigin(0.5).setDepth(21);
  }
}
