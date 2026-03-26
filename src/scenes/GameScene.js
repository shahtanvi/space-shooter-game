// ─── Asset paths (all relative to index.html) ────────────────────────────────
const ASSETS = {
  // Backgrounds
  bg:          'Legacy Collection/Assets/Environments/space_background_pack/Old Version/layers/parallax-space-backgound.png',
  stars:       'Legacy Collection/Assets/Environments/space_background_pack/Old Version/layers/parallax-space-stars.png',
  farPlanets:  'Legacy Collection/Assets/Environments/space_background_pack/Old Version/layers/parallax-space-far-planets.png',
  ringPlanet:  'Legacy Collection/Assets/Environments/space_background_pack/Old Version/layers/parallax-space-ring-planet.png',
  bigPlanet:   'Legacy Collection/Assets/Environments/space_background_pack/Old Version/layers/parallax-space-big-planet.png',

  // Ships
  ship:        'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/ship.png',
  enemySmall:  'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-small.png',
  enemyMedium: 'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-medium.png',
  enemyBig:    'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-big.png',

  // Weapons & pickups
  laser:       'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/laser-bolts.png',
  powerup:     'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/power-up.png',

  // Explosions — M1 ship-pack explosion (5×16×16) used for shield absorption
  exploShip:   'Legacy Collection/Assets/Packs/SpaceShipShooter/spritesheets/explosion.png',
  // Explosions — M2 packs, each progressively larger
  exploA:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-a/spritesheet.png',
  exploB:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-b/spritesheet.png',
  exploC:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-c/spritesheet.png',
  exploD:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-d/spritsheet.png',
  // Explosions — M3 boss death (large)
  exploE:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-e/explosion-5.png',
  exploF:      'Legacy Collection/Assets/Misc/Explosions pack/explosion-1-f/Sprites.png',

  // Boss — top-down-boss pack
  bossSheet:   'Legacy Collection/Assets/Misc/top-down-boss/PNG/spritesheets/boss.png',
  bossThrust:  'Legacy Collection/Assets/Misc/top-down-boss/PNG/spritesheets/boss-thrust.png',
  bossBolt:    'Legacy Collection/Assets/Misc/top-down-boss/PNG/spritesheets/bolt.png',

  // Audio
  laserSfx:   'Legacy Collection/Assets/Packs/grotto_escape_pack/Base pack/sounds/laser.wav',
  pickupSfx:  'Legacy Collection/Assets/Packs/grotto_escape_pack/Base pack/sounds/pickup.wav'
};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {}

  // ─── PRELOAD ───────────────────────────────────────────────────────────────
  preload() {
    // Backgrounds
    this.load.image('bg',         ASSETS.bg);
    this.load.image('stars',      ASSETS.stars);
    this.load.image('farPlanets', ASSETS.farPlanets);
    this.load.image('ringPlanet', ASSETS.ringPlanet);
    this.load.image('bigPlanet',  ASSETS.bigPlanet);

    // Ships — measured frame sizes:
    // ship.png      80×48  → 16×24  (5 cols × 2 rows)
    // enemy-small   32×16  → 16×16  (2 cols × 1 row)
    // enemy-medium  64×16  → 16×16  (4 cols × 1 row)
    // enemy-big     64×32  → 32×32  (2 cols × 1 row)
    this.load.spritesheet('ship',        ASSETS.ship,        { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('enemy-small', ASSETS.enemySmall,  { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('enemy-med',   ASSETS.enemyMedium, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('enemy-big',   ASSETS.enemyBig,    { frameWidth: 32, frameHeight: 32 });

    // Weapons & pickups
    // laser-bolts  32×32 → 16×16 (2×2 grid);  power-up 32×32 → 16×16 (2×2 grid)
    this.load.spritesheet('laser',       ASSETS.laser,   { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerup',     ASSETS.powerup, { frameWidth: 16, frameHeight: 16 });

    // Explosions
    // explo-ship   80×16  → 16×16 (5 frames) — shield absorption flash
    // explo-a     256×32  → 32×32 (8 frames) — small enemy
    // explo-b     512×64  → 64×64 (8 frames) — medium enemy
    // explo-c    1280×80  → 80×80 (16 frames) — big enemy
    // explo-d   1536×128  → 128×128 (12 frames) — player death
    this.load.spritesheet('explo-ship', ASSETS.exploShip, { frameWidth: 16,  frameHeight: 16  });
    this.load.spritesheet('explo-a',    ASSETS.exploA,    { frameWidth: 32,  frameHeight: 32  });
    this.load.spritesheet('explo-b',    ASSETS.exploB,    { frameWidth: 64,  frameHeight: 64  });
    this.load.spritesheet('explo-c',    ASSETS.exploC,    { frameWidth: 80,  frameHeight: 80  });
    this.load.spritesheet('explo-d',    ASSETS.exploD,    { frameWidth: 128, frameHeight: 128 });

    // Boss sprites
    // boss.png       960×144 → 192×144 per frame, 5 frames
    // boss-thrust    256×48  → 128×48  per frame, 2 frames
    // bolt           16×8    →   8×8   per frame, 2 frames
    this.load.spritesheet('boss',        ASSETS.bossSheet,  { frameWidth: 192, frameHeight: 144 });
    this.load.spritesheet('boss-thrust', ASSETS.bossThrust, { frameWidth: 128, frameHeight: 48  });
    this.load.spritesheet('boss-bolt',   ASSETS.bossBolt,   { frameWidth: 8,   frameHeight: 8   });

    // Boss explosions
    // explo-e  4224×192 → 192×192 per frame, 22 frames
    // explo-f   384×48  →  48×48  per frame,  8 frames
    this.load.spritesheet('explo-e', ASSETS.exploE, { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('explo-f', ASSETS.exploF, { frameWidth: 48,  frameHeight: 48  });

    // Audio
    this.load.audio('laserSfx',  ASSETS.laserSfx);
    this.load.audio('pickupSfx', ASSETS.pickupSfx);
  }

  // ─── CREATE ────────────────────────────────────────────────────────────────
  create() {
    this._initState();
    this._createBackground();
    this._createAnims();
    this._createGroups();
    this._createPlayer();
    this._createInput();
    this._createAudio();
    this._createHUD();
    this._createBossHPBar();
    this._createPauseOverlay();
    this._createManagers();
    this._createCollisions();
    this._startPlanetTimer();
  }

  // ─── UPDATE ────────────────────────────────────────────────────────────────
  update() {
    if (this.gameEnding) return;
    if (this.isPaused)   return;

    // Parallax scroll — four layers at increasing speeds
    this.bgLayer.tilePositionY         -= 0.4;
    this.farPlanetsLayer.tilePositionY -= 0.9;
    this.starsLayer.tilePositionY      -= 1.8;

    // Player movement + auto-fire
    const baseSpeed = this.speedBoostActive ? 308 : 220;  // +40 % with boost

    if (this.mobileControls) {
      // Mobile: ship follows finger X; Y is fixed; auto-fire always on
      if (this.shootReady) this._shoot();

      const fx = this.mobileControls.fingerX;
      if (fx !== null) {
        const targetX = Phaser.Math.Clamp(fx, 20, this.scale.width - 20);
        const dx      = targetX - this.player.x;
        // Proportional velocity towards finger — feels snappy but not instant
        const vx = Phaser.Math.Clamp(dx * 12, -baseSpeed, baseSpeed);
        this.player.setVelocityX(vx);
        if (dx < -4)      this.player.setFrame(1);
        else if (dx > 4)  this.player.setFrame(3);
        else              this.player.setFrame(0);
      } else {
        this.player.setVelocityX(0);
        this.player.setFrame(0);
      }
      this.player.setVelocityY(0);

      if (this._debugText) {
        this._debugText.setText(`finger: ${fx !== null ? Math.round(fx) : '—'}  ship: ${Math.round(this.player.x)}`);
      }
    } else {
      // Desktop: keyboard
      const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
      const right = this.cursors.right.isDown || this.wasd.right.isDown;
      const up    = this.cursors.up.isDown    || this.wasd.up.isDown;
      const down  = this.cursors.down.isDown  || this.wasd.down.isDown;

      this.player.setVelocityX(left ? -baseSpeed : right ? baseSpeed : 0);
      this.player.setVelocityY(up   ? -baseSpeed : down  ? baseSpeed : 0);

      // Ship banking frames (0 = straight, 1 = lean left, 3 = lean right)
      if (left)       this.player.setFrame(1);
      else if (right) this.player.setFrame(3);
      else            this.player.setFrame(0);

      if (this.spaceKey.isDown && this.shootReady) this._shoot();
    }

    // Big enemy sine-wave lateral drift
    this.bigEnemies.getChildren().forEach(e => {
      if (!e.active) return;
      const t    = (this.time.now - e.getData('spawnTime')) / 1000;
      const newX = e.getData('spawnX') + Math.sin(t * 1.5) * 72;
      e.setX(Phaser.Math.Clamp(newX, 24, this.scale.width - 24));
    });

    // Sync boss thrust sprite to boss body position
    if (this.boss) this.boss.update();

    // Power-up manager per-frame work (shield position + cull off-screen drops)
    this.powerupManager.update();

    // HUD power-up indicator
    const wave = this.waveManager?.wave || 1;
    const efx  = [];
    if (wave >= 7)             efx.push('[3-WAY]');
    else if (wave >= 4)        efx.push('[TWIN]');
    if (this.spreadActive)     efx.push('[SPREAD]');
    if (this.speedBoostActive) efx.push('[SPEED+]');
    if (this.shieldActive)     efx.push('[SHIELD]');
    this.powerupText.setText(efx.join('  '));

    // Cull off-screen objects
    this.lasers.getChildren().forEach(l => { if (l.y < -40) l.destroy(); });
    [this.smallEnemies, this.mediumEnemies, this.bigEnemies, this.enemyBullets]
      .forEach(grp => grp.getChildren().forEach(e => { if (e.y > this.scale.height + 40) e.destroy(); }));

    // Diagonal spread bolts can also leave left/right
    this.lasers.getChildren().forEach(l => {
      if (l.x < -40 || l.x > this.scale.width + 40) l.destroy();
    });
  }

  // ─── CALLED BY WaveManager ─────────────────────────────────────────────────
  spawnEnemy(type) {
    const x    = Phaser.Math.Between(30, this.scale.width - 30);
    const wave = this.waveManager.wave;

    if (type === 'small') {
      const e = this.smallEnemies.create(x, -24, 'enemy-small');
      e.setScale(3).setFlipY(true);
      e.play('enemy-fly');
      e.setVelocityY(wave <= 3 ? 160 + (wave - 1) * 28 : 216 + (wave - 4) * 10);
      e.body.setSize(12, 12).setOffset(2, 2);
      e.setData({ type: 'small', hp: 1, points: 100, exploKey: 'explo-a', exploScale: 1.2 });

    } else if (type === 'medium') {
      const e = this.mediumEnemies.create(x, -20, 'enemy-med');
      e.setScale(3).setFlipY(true);
      e.play('enemy-med-fly');
      e.setVelocityY(wave <= 3 ? 72 + (wave - 1) * 18 : 126 + (wave - 4) * 7);
      e.body.setSize(14, 10).setOffset(1, 3);
      e.setData({ type: 'medium', hp: 2, points: 250, exploKey: 'explo-b', exploScale: 0.85 });

    } else if (type === 'big') {
      const e = this.bigEnemies.create(x, -36, 'enemy-big');
      e.setScale(3).setFlipY(true);
      e.play('enemy-big-pulse');
      e.setVelocityY(wave <= 3 ? 50 + (wave - 1) * 12 : 74 + (wave - 4) * 5);
      e.body.setSize(28, 26).setOffset(2, 3);
      e.setData({ type: 'big', hp: 5, points: 500, exploKey: 'explo-c', exploScale: 1.1,
                  spawnX: x, spawnTime: this.time.now });
    }
  }

  // ─── PRIVATE — INIT ────────────────────────────────────────────────────────

  _initState() {
    this.score            = 0;
    this.lives            = 3;
    this.gameEnding       = false;
    this.isPaused         = false;
    this.invincible       = false;
    this.shootReady       = true;
    this.spreadActive     = false;
    this.speedBoostActive = false;
    this.shieldActive     = false;
    this.boss             = null;
    this.bossActive       = false;
    this._bossPlanet      = null;
    this.mobileControls   = null;
  }

  _createBackground() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Layer order (back → front): bg → farPlanets → stars
    // Ring planet and big planet are individual sprites spawned on a timer.
    this.bgLayer         = this.add.tileSprite(0, 0, W, H, 'bg').setOrigin(0, 0).setDepth(0);
    this.farPlanetsLayer = this.add.tileSprite(0, 0, W, H, 'farPlanets').setOrigin(0, 0).setDepth(0);
    this.starsLayer      = this.add.tileSprite(0, 0, W, H, 'stars').setOrigin(0, 0).setDepth(0);
  }

  _createAnims() {
    // Guard: animations are global and survive scene restarts
    const anim = (key, texture, start, end, fps, repeat = -1) => {
      if (this.anims.get(key)) return;
      this.anims.create({
        key,
        frames:    this.anims.generateFrameNumbers(texture, { start, end }),
        frameRate: fps,
        repeat
      });
    };

    // Enemy idles
    anim('enemy-fly',      'enemy-small', 0, 1,  6);   // 2 frames
    anim('enemy-med-fly',  'enemy-med',   0, 3,  8);   // 4 frames
    anim('enemy-big-pulse','enemy-big',   0, 1,  4);   // 2 frames

    // Explosions — all play once (repeat: 0)
    anim('explo-ship', 'explo-ship', 0, 4,  20, 0);  // 5 frames — shield hit
    anim('explo-a',    'explo-a',    0, 7,  24, 0);  // 8 frames — small enemy
    anim('explo-b',    'explo-b',    0, 7,  20, 0);  // 8 frames — medium enemy
    anim('explo-c',    'explo-c',    0, 15, 20, 0);  // 16 frames — big enemy
    anim('explo-d',    'explo-d',    0, 11, 18, 0);  // 12 frames — player death
    anim('explo-e',    'explo-e',    0, 21, 22, 0);  // 22 frames — boss death (huge)
    anim('explo-f',    'explo-f',    0, 7,  18, 0);  //  8 frames — boss death (secondary)

    // Boss animations
    anim('boss-idle',       'boss',        0, 4,  6  );  // 5 frames, loops
    anim('boss-thrust-anim','boss-thrust', 0, 1,  12 );  // 2 frames, loops
  }

  _createGroups() {
    this.lasers        = this.physics.add.group();
    this.smallEnemies  = this.physics.add.group();
    this.mediumEnemies = this.physics.add.group();
    this.bigEnemies    = this.physics.add.group();
    this.bosses        = this.physics.add.group();
    this.enemyBullets  = this.physics.add.group();
  }

  _createPlayer() {
    const W = this.scale.width;
    const H = this.scale.height;

    this.player = this.physics.add.sprite(W / 2, H - 80, 'ship', 0);
    this.player.setScale(3);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(10, 18).setOffset(3, 3);
    this.player.setDepth(4);
  }

  _createInput() {
    this.cursors  = this.input.keyboard.createCursorKeys();
    this.wasd     = this.input.keyboard.addKeys({ up: 'W', down: 'S', left: 'A', right: 'D' });
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pKey     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.pKey.on('down', this._togglePause, this);

    // Mobile controls — drag to move + auto-fire (only on touch devices)
    if (MobileControls.isMobile()) {
      this.mobileControls = new MobileControls(this);
      this.mobileControls.init();

      // DEBUG — finger position readout (remove once confirmed working)
      this._debugText = this.add.text(10, 56, '', {
        fontFamily: '"Courier New", monospace', fontSize: '11px', fill: '#00ffcc'
      }).setDepth(20).setScrollFactor(0);
    }
  }

  _createAudio() {
    this.laserSfx = this.sound.add('laserSfx', { volume: 0.25 });
  }

  _createHUD() {
    const W    = this.scale.width;
    const mono = (size, color = '#ffffff') => ({
      fontFamily: '"Courier New", monospace',
      fontSize:   `${size}px`,
      fill:       color
    });

    // Background bar for the HUD
    this.add.rectangle(0, 0, W, 52, 0x000000, 0.6).setOrigin(0, 0).setDepth(10);

    // Row 1: score | wave | lives
    this.scoreText = this.add.text(12,     9, 'SCORE: 0', mono(16)).setDepth(11);
    this.waveText  = this.add.text(W / 2,  9, 'WAVE 1',   mono(16)).setOrigin(0.5, 0).setDepth(11);
    this.livesText = this.add.text(W - 12, 9, '♥ ♥ ♥',   mono(16, '#ff4466')).setOrigin(1, 0).setDepth(11);

    // Health bar — sits below the hearts, right-aligned
    this.healthBarGraphics = this.add.graphics().setDepth(11);
    this._drawHealthBar(3);

    // Row 2: active power-up indicators
    this.powerupText = this.add.text(W / 2, 34, '', mono(11, '#ffdd44')).setOrigin(0.5, 0).setDepth(11);
  }

  _drawHealthBar(lives) {
    const W     = this.scale.width;
    const barW  = 110;
    const barH  = 7;
    const x     = W - 12 - barW;
    const y     = 30;
    const ratio = Math.max(0, lives / 3);

    this.healthBarGraphics.clear();
    // Background track
    this.healthBarGraphics.fillStyle(0x440011);
    this.healthBarGraphics.fillRect(x, y, barW, barH);
    // Filled portion — red → orange → green depending on remaining health
    const colour = ratio > 0.66 ? 0x44ff66 : ratio > 0.33 ? 0xff8800 : 0xff2222;
    this.healthBarGraphics.fillStyle(colour);
    this.healthBarGraphics.fillRect(x, y, Math.round(barW * ratio), barH);
    // Segment dividers at 1/3 and 2/3
    this.healthBarGraphics.fillStyle(0x000000);
    this.healthBarGraphics.fillRect(x + Math.round(barW / 3),     y, 2, barH);
    this.healthBarGraphics.fillRect(x + Math.round(barW * 2 / 3), y, 2, barH);
  }

  _createPauseOverlay() {
    const W = this.scale.width;
    const H = this.scale.height;

    const rect = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.72).setDepth(50);
    const title = this.add.text(W / 2, H / 2 - 30, 'PAUSED', {
      fontFamily: '"Courier New", monospace', fontSize: '40px',
      fill: '#ffffff', stroke: '#000000', strokeThickness: 5
    }).setOrigin(0.5).setDepth(51);
    const sub = this.add.text(W / 2, H / 2 + 30, 'press  P  to resume', {
      fontFamily: '"Courier New", monospace', fontSize: '15px', fill: '#888899'
    }).setOrigin(0.5).setDepth(51);

    // Wrap in a simple object for toggling visibility
    const items = [rect, title, sub];
    this.pauseOverlay = {
      setVisible: (v) => items.forEach(i => i.setVisible(v))
    };
    this.pauseOverlay.setVisible(false);
  }

  _createManagers() {
    // Wave manager
    this.waveManager = new WaveManager(this);
    this.waveManager.onAdvance = (wave) => {
      this.waveText.setText(`WAVE ${wave}`);
      this._showWaveBanner(wave);
      this._resetEnemyFireTimer();
    };
    this.waveManager.onBoss = (wave) => {
      this._showBossWarning(wave);
    };
    this.waveManager.start();

    // Power-up manager — must create powerups group before collision setup
    this.powerupManager = new PowerUpManager(this);

    // Enemy fire timer — speeds up and gains extra shooters each wave
    this._resetEnemyFireTimer();
  }

  _createCollisions() {
    // Lasers vs all enemy types
    this.physics.add.overlap(this.lasers, this.smallEnemies,   this._onLaserHitEnemy,  null, this);
    this.physics.add.overlap(this.lasers, this.mediumEnemies,  this._onLaserHitEnemy,  null, this);
    this.physics.add.overlap(this.lasers, this.bigEnemies,     this._onLaserHitEnemy,  null, this);
    this.physics.add.overlap(this.lasers, this.bosses,         this._onLaserHitBoss,   null, this);

    // Player body vs enemies
    this.physics.add.overlap(this.player, this.smallEnemies,   this._onEnemyHitPlayer, null, this);
    this.physics.add.overlap(this.player, this.mediumEnemies,  this._onEnemyHitPlayer, null, this);
    this.physics.add.overlap(this.player, this.bigEnemies,     this._onEnemyHitPlayer, null, this);
    this.physics.add.overlap(this.player, this.bosses,         this._onBossHitPlayer,  null, this);

    // Enemy bullets vs player
    this.physics.add.overlap(this.player, this.enemyBullets,   this._onBulletHitPlayer, null, this);

    // Power-up collection
    this.physics.add.overlap(
      this.player,
      this.powerupManager.powerups,
      (_player, pu) => this.powerupManager.collect(pu),
      null,
      this
    );
  }

  // Spawn decorative ring-planet and big-planet sprites that drift down the screen
  _startPlanetTimer() {
    this.time.addEvent({
      delay:         10000,
      callback:      this._spawnPlanetDecorator,
      callbackScope: this,
      loop:          true
    });
    // Also spawn one immediately after a short delay for visual impact from the first wave
    this.time.delayedCall(3000, this._spawnPlanetDecorator, [], this);
  }

  _spawnPlanetDecorator() {
    const isRing  = Math.random() < 0.5;
    const key     = isRing ? 'ringPlanet' : 'bigPlanet';
    const scale   = isRing ? 2.5 : 2.2;
    const x       = Phaser.Math.Between(60, this.scale.width - 60);

    const planet = this.add.image(x, -200, key)
      .setScale(scale)
      .setAlpha(0.7)
      .setDepth(1);

    this.tweens.add({
      targets:    planet,
      y:          this.scale.height + 250,
      duration:   22000,
      ease:       'Linear',
      onComplete: () => planet.destroy()
    });
  }

  // ─── PRIVATE — SHOOTING ────────────────────────────────────────────────────

  _shoot() {
    this.shootReady = false;
    const { x, y } = this.player;
    const wave = this.waveManager?.wave || 1;

    // Auto-fire mode escalates with wave:
    //   Wave  1–3 → single shot
    //   Wave  4–6 → twin parallel shots
    //   Wave  7+  → 3-way spread
    // Spread powerup adds 2 extra bolts on top of whatever mode is active.
    const autoMode = wave >= 7 ? 'triple' : wave >= 4 ? 'twin' : 'single';

    if (this.spreadActive) {
      if (autoMode === 'triple') {
        // 5-way
        this._fireBolt(x, y,    0, -500);
        this._fireBolt(x, y, -211, -453);
        this._fireBolt(x, y,  211, -453);
        this._fireBolt(x, y, -383, -321);
        this._fireBolt(x, y,  383, -321);
      } else {
        // 3-way (powerup upgrade from single or twin)
        this._fireBolt(x, y,    0, -500);
        this._fireBolt(x, y, -211, -453);
        this._fireBolt(x, y,  211, -453);
      }
    } else if (autoMode === 'triple') {
      this._fireBolt(x, y,    0, -500);
      this._fireBolt(x, y, -183, -469);  // ±20°
      this._fireBolt(x, y,  183, -469);
    } else if (autoMode === 'twin') {
      this._fireBolt(x - 10, y, 0, -500);
      this._fireBolt(x + 10, y, 0, -500);
    } else {
      this._fireBolt(x, y, 0, -500);
    }

    this.laserSfx.play();
    // Cooldown shrinks as waves increase (220 ms → 150 ms floor)
    const cooldown = Math.max(150, 220 - (wave - 1) * 10);
    this.time.delayedCall(cooldown, () => { this.shootReady = true; });
  }

  _fireBolt(x, y, vx, vy) {
    // Frame 0 = round orb (top-left of 2×2 laser sheet)
    const bolt = this.lasers.create(x, y - 28, 'laser', 0);
    bolt.setScale(2).setDepth(3);
    bolt.setVelocity(vx, vy);
    bolt.body.setSize(6, 12).setOffset(5, 2);
  }

  // ─── PRIVATE — ENEMY FIRE ──────────────────────────────────────────────────

  _resetEnemyFireTimer() {
    if (this.enemyFireTimer) this.enemyFireTimer.remove();
    const wave  = this.waveManager?.wave || 1;
    // Interval: 2000 ms → 500 ms floor, dropping 150 ms per wave
    const delay = Math.max(500, 2000 - (wave - 1) * 150);
    this.enemyFireTimer = this.time.addEvent({
      delay,
      callback:      this._enemyFireStep,
      callbackScope: this,
      loop:          true
    });
  }

  _enemyFireStep() {
    if (this.gameEnding || this.isPaused) return;
    const active = this.mediumEnemies.getChildren().filter(e => e.active && e.y > 0);
    if (active.length === 0) return;

    // Later waves fire from multiple enemies at once
    const wave     = this.waveManager?.wave || 1;
    const count    = wave >= 7 ? 3 : wave >= 4 ? 2 : 1;
    const shooters = Phaser.Utils.Array.Shuffle(active.slice()).slice(0, count);
    shooters.forEach(e => this._fireEnemyBolt(e));
  }

  _fireEnemyBolt(enemy) {
    const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
    const speed = 185;

    // Frame 2 = bottom-left of laser sheet (thin bolt), tinted red so it reads as enemy
    const bolt = this.enemyBullets.create(enemy.x, enemy.y + 16, 'laser', 2);
    bolt.setScale(1.8).setTint(0xff5566).setDepth(3);
    bolt.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    bolt.body.setSize(8, 8).setOffset(4, 4);
  }

  // ─── PRIVATE — COLLISION HANDLERS ──────────────────────────────────────────

  _onLaserHitEnemy(laser, enemy) {
    if (!laser.active || !enemy.active) return;
    laser.destroy();

    const hp = enemy.getData('hp') - 1;
    if (hp <= 0) {
      this._killEnemy(enemy);
    } else {
      enemy.setData('hp', hp);
      this._flashEnemy(enemy);
    }
  }

  _killEnemy(enemy) {
    const { x, y }    = enemy;
    const exploKey    = enemy.getData('exploKey');
    const exploScale  = enemy.getData('exploScale');
    const points      = enemy.getData('points');
    const type        = enemy.getData('type');
    enemy.destroy();

    this._spawnExplosion(x, y, exploKey, exploScale);
    this._showFloatingScore(x, y, points);

    this.score += points;
    this.scoreText.setText(`SCORE: ${this.score}`);

    // Medium and big enemies drop power-ups
    if (type !== 'small') this.powerupManager.trySpawn(x, y);

    this.waveManager.onKill();
  }

  _onEnemyHitPlayer(player, enemy) {
    if (this.invincible || this.gameEnding || !enemy.active) return;
    const { x, y } = enemy;
    enemy.destroy();

    if (this.shieldActive) {
      this.powerupManager.consumeShield();
      // Small shield-impact flash using the M1 ship-pack explosion
      this._spawnExplosion(x, y, 'explo-ship', 2);
      this.cameras.main.shake(120, 0.006);
      return;
    }

    this._spawnExplosion(x, y, 'explo-a', 1);
    this._loseLife();
  }

  _onBulletHitPlayer(player, bullet) {
    if (this.invincible || this.gameEnding || !bullet.active) return;
    const { x, y } = bullet;
    bullet.destroy();

    if (this.shieldActive) {
      this.powerupManager.consumeShield();
      this._spawnExplosion(x, y, 'explo-ship', 1.5);
      this.cameras.main.shake(120, 0.006);
      return;
    }

    this._loseLife();
  }

  // ─── PRIVATE — GAME STATE ──────────────────────────────────────────────────

  _loseLife() {
    this.lives--;
    this.livesText.setText('♥ '.repeat(Math.max(0, this.lives)).trim());
    this._drawHealthBar(this.lives);
    this.cameras.main.shake(200, 0.013);

    if (this.lives <= 0) {
      this._triggerGameOver();
      return;
    }

    // Invincibility window — 7-cycle flash
    this.invincible = true;
    this.tweens.add({
      targets:  this.player,
      alpha:    0,
      duration: 120,
      ease:     'Linear',
      repeat:   7,
      yoyo:     true,
      onComplete: () => {
        if (this.player?.active) this.player.setAlpha(1);
        this.invincible = false;
      }
    });
  }

  _triggerGameOver() {
    this.gameEnding = true;
    this.waveManager.stop();
    this.enemyFireTimer.remove();
    if (this.boss) { this.boss.stop(); this.boss = null; }
    this._showBossHPBar(false);
    if (this._bossPlanet) { this._bossPlanet.destroy(); this._bossPlanet = null; }

    // Dramatic player death — explo-d is the largest explosion
    this._spawnExplosion(this.player.x, this.player.y, 'explo-d', 1.2);
    this.player.setVisible(false);
    this.cameras.main.shake(400, 0.02);

    // Save to top-5 leaderboard
    const scores = JSON.parse(localStorage.getItem('spaceShooter_scores') || '[]');
    scores.push(this.score);
    scores.sort((a, b) => b - a);
    scores.splice(5);
    localStorage.setItem('spaceShooter_scores', JSON.stringify(scores));

    const isNewBest = this.score > 0 && scores[0] === this.score;

    this.time.delayedCall(1400, () => {
      this.scene.start('GameOverScene', { score: this.score, isNewBest });
    });
  }

  _togglePause() {
    if (this.gameEnding) return;

    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.physics.pause();
      this.tweens.pauseAll();
      this.waveManager.pause();
      this.powerupManager.pause();
      if (this.boss) this.boss.pause();
      this.enemyFireTimer.paused = true;
      if (this.mobileControls) this.mobileControls.pause();
      this.pauseOverlay.setVisible(true);
    } else {
      this.physics.resume();
      this.tweens.resumeAll();
      this.waveManager.resume();
      this.powerupManager.resume();
      if (this.boss) this.boss.resume();
      this.enemyFireTimer.paused = false;
      if (this.mobileControls) this.mobileControls.resume();
      this.pauseOverlay.setVisible(false);
    }
  }

  // ─── PRIVATE — VISUALS ─────────────────────────────────────────────────────

  _spawnExplosion(x, y, key, scale = 1) {
    const exp = this.add.sprite(x, y, key).setScale(scale).setDepth(5);
    exp.play(key);
    exp.once('animationcomplete', () => exp.destroy());
  }

  _flashEnemy(enemy) {
    enemy.setTint(0xff4444);
    this.time.delayedCall(120, () => {
      if (enemy?.active) enemy.clearTint();
    });
  }

  _showFloatingScore(x, y, pts) {
    const txt = this.add.text(x, y - 10, `+${pts}`, {
      fontFamily: '"Courier New", monospace',
      fontSize:   '14px',
      fill:       '#ffff88',
      stroke:     '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(10);

    this.tweens.add({
      targets:    txt,
      y:          y - 52,
      alpha:      0,
      duration:   800,
      ease:       'Power2',
      onComplete: () => txt.destroy()
    });
  }

  _showWaveBanner(wave) {
    const banner = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      `— WAVE ${wave} —`,
      {
        fontFamily: '"Courier New", monospace',
        fontSize:   '36px',
        fill:       '#ffff44',
        stroke:     '#000000',
        strokeThickness: 5
      }
    ).setOrigin(0.5).setDepth(20);

    this.tweens.add({
      targets:    banner,
      alpha:      0,
      duration:   1800,
      ease:       'Power2',
      onComplete: () => banner.destroy()
    });
  }

  // ─── BOSS ──────────────────────────────────────────────────────────────────

  // Called by WaveManager.onBoss — shows the warning banner then spawns.
  _showBossWarning(wave) {
    const W = this.scale.width;
    const H = this.scale.height;

    const banner = this.add.text(W / 2, H / 2,
      '⚠  BOSS APPROACHING  ⚠',
      {
        fontFamily: '"Courier New", monospace',
        fontSize:   '26px',
        fill:       '#ff2222',
        stroke:     '#000000',
        strokeThickness: 5
      }
    ).setOrigin(0.5).setDepth(25);

    // Blink 6 times (300 ms on/off), then spawn
    this.tweens.add({
      targets:    banner,
      alpha:      0,
      duration:   300,
      ease:       'Linear',
      repeat:     5,
      yoyo:       true,
      onComplete: () => {
        banner.destroy();
        this.spawnBoss();
      }
    });
  }

  spawnBoss() {
    this.bossActive = true;
    this.boss = new Boss(this);
    this.boss.spawn();
    this._showBossHPBar(true);
    this._spawnBossBackdrop();
  }

  // Called by Boss.takeDamage() when HP reaches 0.
  _onBossDefeated(x, y) {
    this.bossActive = false;
    this.boss       = null;

    // Staggered double explosion — E is huge (192×192), F is secondary (48×48)
    this._spawnExplosion(x, y, 'explo-e', 1.4);
    this.time.delayedCall(250, () => {
      if (!this.gameEnding) this._spawnExplosion(x, y, 'explo-f', 2.5);
    });
    this.cameras.main.shake(700, 0.028);

    // Score
    const pts = 2000;
    this.score += pts;
    this.scoreText.setText(`SCORE: ${this.score}`);
    this._showFloatingScore(x, y, pts);

    // Hide HP bar and fade out the backdrop planet
    this._showBossHPBar(false);
    if (this._bossPlanet) {
      this.tweens.add({
        targets:    this._bossPlanet,
        alpha:      0,
        duration:   2500,
        ease:       'Linear',
        onComplete: () => { this._bossPlanet?.destroy(); this._bossPlanet = null; }
      });
    }

    // Victory banner
    this._showBossDefeatedBanner();

    // Resume normal wave progression
    this.waveManager.onBossDefeated();
  }

  _showBossDefeatedBanner() {
    const banner = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'BOSS DEFEATED!',
      {
        fontFamily: '"Courier New", monospace',
        fontSize:   '38px',
        fill:       '#ffff44',
        stroke:     '#000000',
        strokeThickness: 6
      }
    ).setOrigin(0.5).setDepth(25);

    this.tweens.add({
      targets:    banner,
      alpha:      0,
      y:          banner.y - 70,
      duration:   2200,
      ease:       'Power2',
      onComplete: () => banner.destroy()
    });
  }

  // ─── BOSS HP BAR ───────────────────────────────────────────────────────────

  _createBossHPBar() {
    this.bossHPGraphics = this.add.graphics().setDepth(12);
    this.bossHPLabel    = this.add.text(
      this.scale.width / 2,
      this.scale.height - 40,
      'BOSS',
      {
        fontFamily: '"Courier New", monospace',
        fontSize:   '12px',
        fill:       '#ff4444'
      }
    ).setOrigin(0.5).setDepth(12);
    this._showBossHPBar(false);
  }

  _showBossHPBar(show) {
    this.bossHPGraphics.setVisible(show);
    this.bossHPLabel.setVisible(show);
    if (show) this._updateBossHPBar(20, 20);
  }

  _updateBossHPBar(hp, maxHp) {
    const W     = this.scale.width;
    const H     = this.scale.height;
    const barW  = 280;
    const ratio = Math.max(0, hp / maxHp);

    this.bossHPGraphics.clear();
    // Background track
    this.bossHPGraphics.fillStyle(0x330000);
    this.bossHPGraphics.fillRect(W / 2 - barW / 2, H - 30, barW, 14);
    // Colour shifts red → orange → yellow as HP drains
    const colour = ratio > 0.5 ? 0xff2222 : ratio > 0.25 ? 0xff8800 : 0xffff00;
    this.bossHPGraphics.fillStyle(colour);
    this.bossHPGraphics.fillRect(W / 2 - barW / 2 + 2, H - 28, (barW - 4) * ratio, 10);
  }

  // ─── BOSS BACKDROP ─────────────────────────────────────────────────────────

  _spawnBossBackdrop() {
    const W = this.scale.width;
    const planet = this.add.image(W / 2, -280, 'bigPlanet')
      .setScale(4.2)
      .setAlpha(0.5)
      .setDepth(1);

    this.tweens.add({
      targets:    planet,
      y:          this.scale.height * 0.38,
      duration:   4000,
      ease:       'Power2',
      onComplete: () => { this._bossPlanet = planet; }
    });
  }

  // ─── BOSS COLLISION HANDLERS ───────────────────────────────────────────────

  _onLaserHitBoss(laser, bossSprite) {
    if (!laser.active || !bossSprite.active || this.gameEnding) return;
    laser.destroy();
    if (this.boss) this.boss.takeDamage();
  }

  // Boss body touching player — player takes damage but boss keeps going.
  _onBossHitPlayer(player, bossSprite) {
    if (this.invincible || this.gameEnding || !bossSprite.active) return;

    if (this.shieldActive) {
      this.powerupManager.consumeShield();
      this._spawnExplosion(player.x, player.y, 'explo-ship', 2);
      this.cameras.main.shake(120, 0.006);
      return;
    }
    this._loseLife();
  }
}
