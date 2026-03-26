// MobileControls — finger drag to move + auto-fire + pause button.
//
// Usage:
//   const mc = new MobileControls(scene);
//   mc.init();
//
// Each frame, read:
//   mc.fingerX  — current finger X in game coords (null if not touching)

class MobileControls {
  constructor(scene) {
    this.scene    = scene;
    this.fingerX  = null;   // X position of active touch, null if finger is lifted
    this._pauseBtn = null;
  }

  static isMobile() {
    return navigator.maxTouchPoints > 0;
  }

  init() {
    this._createPauseButton();
    this._startDragTracking();
    this.scene.events.once('shutdown', () => this.destroy(), this);
  }

  // Called by _togglePause — nothing to hide/show for drag controls
  pause()  {}
  resume() {}

  destroy() {
    if (this._pauseBtn?.active) this._pauseBtn.destroy();
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  _createPauseButton() {
    const W = this.scene.scale.width;
    this._pauseBtn = this.scene.add.text(W - 10, 8, 'II', {
      fontFamily: '"Courier New", monospace',
      fontSize:   '15px',
      fill:       '#ffffff'
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(30).setAlpha(0.55).setInteractive();

    this._pauseBtn.on('pointerdown', () => this.scene._togglePause());
  }

  _startDragTracking() {
    // Track the active pointer's X position
    this.scene.input.on('pointerdown', (ptr) => { this.fingerX = ptr.x; });
    this.scene.input.on('pointermove', (ptr) => { if (ptr.isDown) this.fingerX = ptr.x; });
    this.scene.input.on('pointerup',   ()    => { this.fingerX = null; });
  }
}
