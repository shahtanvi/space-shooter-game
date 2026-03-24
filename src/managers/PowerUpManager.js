// PowerUpManager — spawns power-up drops, handles collection, applies effects,
// and draws the shield ring. GameScene reads the boolean flags:
//   scene.spreadActive, scene.speedBoostActive, scene.shieldActive

// power-up.png is a 2×2 grid of 16×16 frames:
//   frame 0 (top-left,  orange): Spread Shot
//   frame 1 (top-right, blue):   Speed Boost
//   frame 2 (bottom-left, red):  Shield

const PU_TYPES  = ['spread', 'speed', 'shield'];
const PU_FRAMES = { spread: 0, speed: 1, shield: 2 };

class PowerUpManager {
  constructor(scene) {
    this.scene        = scene;
    this.powerups     = scene.physics.add.group();
    this._effects     = {};      // active DelayedCall events keyed by type
    this._shieldRing  = null;    // Graphics object drawn once, repositioned each frame
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  trySpawn(x, y, chance = 0.25) {
    if (Math.random() > chance) return;

    const type = Phaser.Utils.Array.GetRandom(PU_TYPES);
    const pu   = this.powerups.create(x, y, 'powerup', PU_FRAMES[type]);
    pu.setScale(2.5).setDepth(3);
    pu.setVelocityY(70);
    pu.powerupType = type;
    pu.body.setSize(12, 12).setOffset(2, 2);

    // Bobbing motion to attract the player's eye
    this.scene.tweens.add({
      targets:  pu,
      y:        y + 10,
      duration: 700,
      ease:     'Sine.easeInOut',
      repeat:   -1,
      yoyo:     true
    });
  }

  collect(powerup) {
    const type = powerup.powerupType;
    powerup.destroy();

    this.scene.sound.play('pickupSfx', { volume: 0.5 });

    // Brief golden flash on the player ship
    this.scene.player.setTint(0xffffaa);
    this.scene.time.delayedCall(250, () => {
      if (this.scene.player?.active) this.scene.player.clearTint();
    });

    this._applyEffect(type);
  }

  // Called when an enemy or bullet hits the player and shield is active
  consumeShield() {
    this.scene.shieldActive = false;
    if (this._effects.shield) { delete this._effects.shield; }

    // Fade and hide the ring
    this.scene.tweens.add({
      targets:    this._shieldRing,
      alpha:      0,
      duration:   300,
      ease:       'Linear',
      onComplete: () => {
        if (this._shieldRing) {
          this._shieldRing.setVisible(false);
          this._shieldRing.setAlpha(1);
        }
      }
    });
  }

  // Called every frame from GameScene.update()
  update() {
    // Track shield ring to player
    if (this._shieldRing && this.scene.shieldActive) {
      this._shieldRing.setPosition(this.scene.player.x, this.scene.player.y);
    }
    // Cull power-ups that scrolled off the bottom
    this.powerups.getChildren().forEach(pu => {
      if (pu.y > this.scene.scale.height + 40) pu.destroy();
    });
  }

  pause() {
    Object.values(this._effects).forEach(t => { if (t) t.paused = true; });
  }

  resume() {
    Object.values(this._effects).forEach(t => { if (t) t.paused = false; });
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  _applyEffect(type) {
    // Refresh timer if effect is already active
    if (this._effects[type]) {
      this._effects[type].remove();
      delete this._effects[type];
    }

    if (type === 'spread') {
      this.scene.spreadActive = true;
      this._effects.spread = this.scene.time.delayedCall(8000, () => {
        this.scene.spreadActive = false;
        delete this._effects.spread;
      });

    } else if (type === 'speed') {
      this.scene.speedBoostActive = true;
      this._effects.speed = this.scene.time.delayedCall(6000, () => {
        this.scene.speedBoostActive = false;
        delete this._effects.speed;
      });

    } else if (type === 'shield') {
      this.scene.shieldActive = true;
      this._showShieldRing(true);
    }
  }

  _showShieldRing(visible) {
    if (!this._shieldRing) {
      // Draw the ring once; it is repositioned in update()
      this._shieldRing = this.scene.add.graphics().setDepth(6);
      this._shieldRing.lineStyle(3, 0x44bbff, 1);
      this._shieldRing.strokeCircle(0, 0, 38);
    }
    this._shieldRing.setVisible(visible).setAlpha(1);
  }
}
