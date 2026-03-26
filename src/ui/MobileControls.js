// MobileControls — gyroscope tilt (left/right) + hold-to-fire button + pause button.
//
// Usage:
//   const mc = new MobileControls(scene);
//   mc.init(calibrationGamma);   // call once, after player taps Play
//
// Each frame, read:
//   mc.tiltX   — normalised -1 (full left) to +1 (full right); 0 in dead zone
//   mc.firing  — true while fire button is held

class MobileControls {
  constructor(scene) {
    this.scene    = scene;
    this.tiltX    = 0;       // -1 … +1
    this.firing   = false;   // fire button held?
    this._cal     = 0;       // gamma value at game-start = neutral centre
    this._handler = null;    // deviceorientation listener ref
    this._fireZone  = null;
    this._fireLabel = null;
    this._pauseBtn  = null;
  }

  // Returns true when running on a touch device.
  static isMobile() {
    return navigator.maxTouchPoints > 0;
  }

  // calibrationGamma: the gamma reading captured the moment the player tapped Play.
  init(calibrationGamma) {
    this._cal = calibrationGamma || 0;
    this._createFireButton();
    this._createPauseButton();
    this._startGyro();
    // Auto-cleanup when the scene shuts down (scene restart, game over, etc.)
    this.scene.events.once('shutdown', () => this.destroy(), this);
  }

  // Call from GameScene._togglePause() when pausing.
  pause() {
    this.firing = false;
    if (this._fireZone)  this._fireZone.setVisible(false);
    if (this._fireLabel) this._fireLabel.setVisible(false);
  }

  // Call from GameScene._togglePause() when resuming.
  resume() {
    if (this._fireZone)  this._fireZone.setVisible(true);
    if (this._fireLabel) this._fireLabel.setVisible(true);
  }

  destroy() {
    if (this._handler) {
      window.removeEventListener('deviceorientation', this._handler, true);
      this._handler = null;
    }
    [this._fireZone, this._fireLabel, this._pauseBtn].forEach(o => {
      if (o?.active) o.destroy();
    });
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  _createFireButton() {
    const W = this.scene.scale.width;
    const H = this.scene.scale.height;

    // Large translucent zone covering the right half of the screen, below the HUD.
    this._fireZone = this.scene.add
      .rectangle(W * 0.75, H * 0.58, W * 0.5, H * 0.78, 0xffffff, 0.03)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(30)
      .setInteractive();

    this._fireLabel = this.scene.add.text(W - 14, H - 22, 'FIRE', {
      fontFamily: '"Courier New", monospace',
      fontSize:   '11px',
      fill:       '#ffffff'
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(31).setAlpha(0.3);

    this._fireZone.on('pointerdown', () => { this.firing = true;  });
    this._fireZone.on('pointerup',   () => { this.firing = false; });
    this._fireZone.on('pointerout',  () => { this.firing = false; });
  }

  _createPauseButton() {
    const W = this.scene.scale.width;

    this._pauseBtn = this.scene.add.text(W - 10, 8, 'II', {
      fontFamily: '"Courier New", monospace',
      fontSize:   '15px',
      fill:       '#ffffff'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(30).setAlpha(0.55).setInteractive();

    this._pauseBtn.on('pointerdown', () => this.scene._togglePause());
  }

  _startGyro() {
    const DEAD_ZONE = 5;   // ±5° around centre — no movement
    const MAX_TILT  = 35;  // degrees for full speed

    this._handler = (e) => {
      const gamma = e.gamma ?? 0;          // -90 (left) to +90 (right)
      const delta = gamma - this._cal;     // apply calibration offset

      if (Math.abs(delta) < DEAD_ZONE) {
        this.tiltX = 0;
      } else {
        // Shift so dead-zone edge = 0, then normalise to ±1
        const shifted = delta > 0 ? delta - DEAD_ZONE : delta + DEAD_ZONE;
        this.tiltX = Phaser.Math.Clamp(shifted / MAX_TILT, -1, 1);
      }
    };

    window.addEventListener('deviceorientation', this._handler, true);
  }
}
