// Boss — top-down boss enemy using the top-down-boss pack sprites.
//
// Sprite assets (all from Legacy Collection/Assets/Misc/top-down-boss/PNG/spritesheets/):
//   boss.png       960×144 → 192×144 per frame, 5 frames  (body animation)
//   boss-thrust.png 256×48 → 128×48  per frame, 2 frames  (engine exhaust)
//   bolt.png         16×8  →   8×8   per frame, 2 frames  (boss projectiles)
//
// GameScene must call boss.update() each frame to keep the thrust sprite
// synced to the boss body position.

const BOSS_MAX_HP = 20;

class Boss {
  constructor(scene) {
    this.scene       = scene;
    this.hp          = BOSS_MAX_HP;
    this.sprite      = null;  // physics sprite in scene.bosses group
    this.thrustSprite = null; // decorative engine exhaust (no physics)
    this._burstTimer = null;
    this._aimedTimer = null;
    this._driftTween = null;
    this._active     = false;
  }

  get active() {
    return this._active && this.sprite?.active;
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  spawn() {
    const W = this.scene.scale.width;
    this.hp      = BOSS_MAX_HP;
    this._active = true;

    // Engine exhaust — decorative, rendered behind the boss body
    this.thrustSprite = this.scene.add.sprite(W / 2, -160, 'boss-thrust')
      .setScale(0.6)
      .setFlipY(false)
      .setDepth(3);
    this.thrustSprite.play('boss-thrust-anim');

    // Boss body — physics sprite in the bosses group
    this.sprite = this.scene.bosses.create(W / 2, -80, 'boss')
      .setScale(0.6)
      .setFlipY(true)   // art faces up; flip so boss faces the player (down)
      .setDepth(4);
    this.sprite.play('boss-idle');

    // Physics body: setSize/setOffset use pre-scale frame coords (192×144)
    // Cover the central hull, ignoring the very tips of the wings.
    this.sprite.body.setSize(140, 110).setOffset(26, 17);

    // Slide boss and thrust down from off-screen to hover position
    this.scene.tweens.add({
      targets:  this.sprite,
      y:        140,
      duration: 2000,
      ease:     'Power2',
      onComplete: () => {
        this._startDrift();
        this._startFiring();
      }
    });
    this.scene.tweens.add({
      targets:  this.thrustSprite,
      y:        200,   // trails above boss in screen-space (behind the boss's back)
      duration: 2000,
      ease:     'Power2'
    });
  }

  // Called every frame from GameScene.update()
  update() {
    if (this.thrustSprite && this.sprite?.active) {
      // Keep thrust locked behind the boss (above it on screen = lower Y after FlipY)
      this.thrustSprite.setPosition(this.sprite.x, this.sprite.y + 55);
    }
  }

  // Returns true if the boss was killed by this hit.
  takeDamage() {
    if (!this.active) return false;
    this.hp--;
    this._flash();
    this.scene._updateBossHPBar(this.hp, BOSS_MAX_HP);

    if (this.hp <= 0) {
      const { x, y } = this.sprite;
      this._cleanupSprites();
      this.scene._onBossDefeated(x, y);
      return true;
    }
    return false;
  }

  stop() {
    this._active = false;
    this._clearTimers();
    this._cleanupSprites();
  }

  pause() {
    if (this._burstTimer) this._burstTimer.paused = true;
    if (this._aimedTimer) this._aimedTimer.paused = true;
    if (this._driftTween) this._driftTween.pause();
  }

  resume() {
    if (this._burstTimer) this._burstTimer.paused = false;
    if (this._aimedTimer) this._aimedTimer.paused = false;
    if (this._driftTween) this._driftTween.resume();
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  _flash() {
    if (!this.sprite?.active) return;
    this.sprite.setTint(0xffffff);
    this.scene.time.delayedCall(80, () => {
      if (this.sprite?.active) this.sprite.clearTint();
    });
  }

  _startDrift() {
    if (!this.active) return;
    const W = this.scene.scale.width;

    // First glide to the left edge, then start the full side-to-side loop.
    this.scene.tweens.add({
      targets:  this.sprite,
      x:        W * 0.22,
      duration: 900,
      ease:     'Sine.easeInOut',
      onComplete: () => {
        if (!this.active) return;
        this._driftTween = this.scene.tweens.add({
          targets:  this.sprite,
          x:        W * 0.78,
          duration: 2200,
          ease:     'Sine.easeInOut',
          repeat:   -1,
          yoyo:     true
        });
      }
    });
  }

  _startFiring() {
    // Burst: 5 bolts in a ±60° fan, every 2.5 s
    this._burstTimer = this.scene.time.addEvent({
      delay:         2500,
      callback:      this._fireBurst,
      callbackScope: this,
      loop:          true
    });

    // Aimed: single tracking shot every 1.8 s, staggered 1.2 s from burst
    this.scene.time.delayedCall(1200, () => {
      if (!this.active) return;
      this._aimedTimer = this.scene.time.addEvent({
        delay:         1800,
        callback:      this._fireAimed,
        callbackScope: this,
        loop:          true
      });
    });
  }

  _fireBurst() {
    if (!this.active || this.scene.isPaused || this.scene.gameEnding) return;
    const { x, y } = this.sprite;

    [-60, -30, 0, 30, 60].forEach(deg => {
      const rad  = Phaser.Math.DegToRad(90 + deg); // 90° = straight down
      const spd  = 160;
      const bolt = this.scene.enemyBullets.create(x, y + 50, 'boss-bolt', 0);
      bolt.setScale(3.5).setTint(0xff2222).setDepth(3);
      bolt.setVelocity(Math.cos(rad) * spd, Math.sin(rad) * spd);
      bolt.body.setSize(6, 6).setOffset(1, 1);
    });
  }

  _fireAimed() {
    if (!this.active || !this.scene.player?.active
        || this.scene.isPaused || this.scene.gameEnding) return;

    const { x, y } = this.sprite;
    const angle = Phaser.Math.Angle.Between(x, y, this.scene.player.x, this.scene.player.y);
    const spd   = 240;
    const bolt  = this.scene.enemyBullets.create(x, y + 50, 'boss-bolt', 1);
    bolt.setScale(4).setTint(0xff8800).setDepth(3);
    bolt.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    bolt.body.setSize(6, 6).setOffset(1, 1);
  }

  _clearTimers() {
    if (this._driftTween) { this._driftTween.stop(); this._driftTween = null; }
    if (this._burstTimer) { this._burstTimer.remove(); this._burstTimer = null; }
    if (this._aimedTimer) { this._aimedTimer.remove(); this._aimedTimer = null; }
  }

  _cleanupSprites() {
    this._clearTimers();
    if (this.thrustSprite) { this.thrustSprite.destroy(); this.thrustSprite = null; }
    if (this.sprite?.active) { this.sprite.destroy(); this.sprite = null; }
  }
}
