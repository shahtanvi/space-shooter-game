// WaveManager — controls wave number, enemy type selection, and spawn timing.
// GameScene calls waveManager.onKill() after each enemy death and sets
// waveManager.onAdvance = (wave) => { ... } to react to wave changes.

class WaveManager {
  constructor(scene) {
    this.scene          = scene;
    this.wave           = 1;
    this.killCount      = 0;
    this.spawnTimer     = null;
    this.bossWaveActive = false;
    this.onAdvance      = null; // set by GameScene — called with new wave number
    this.onBoss         = null; // set by GameScene — called when a boss wave begins
  }

  start()  { this._resetTimer(); }

  stop()   {
    if (this.spawnTimer) { this.spawnTimer.remove(); this.spawnTimer = null; }
  }

  pause()  { if (this.spawnTimer) this.spawnTimer.paused = true;  }
  resume() { if (this.spawnTimer) this.spawnTimer.paused = false; }

  // Called by GameScene after each confirmed enemy kill
  onKill() {
    if (this.bossWaveActive) return; // boss wave advances only on boss death

    this.killCount++;
    if (this.killCount >= this._killsForWave()) {
      this.killCount = 0;
      this.wave++;

      if (this.wave % 8 === 0) {
        // Boss wave: stop regular spawning and trigger the boss
        this.stop();
        this.bossWaveActive = true;
        if (this.onAdvance) this.onAdvance(this.wave);
        if (this.onBoss)    this.onBoss(this.wave);
      } else {
        this._resetTimer();
        if (this.onAdvance) this.onAdvance(this.wave);
      }
    }
  }

  // Called by GameScene after the boss is defeated
  onBossDefeated() {
    this.bossWaveActive = false;
    this.wave++;
    this._resetTimer();
    if (this.onAdvance) this.onAdvance(this.wave);
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  // Kills needed to complete the current wave.
  // Scaling formula: 8 + (wave × 2)  →  wave 1 = 10, wave 7 = 22
  // To revert to flat waves, replace the return with: return 10;
  _killsForWave() {
    return 8 + this.wave * 2;
  }

  _spawnDelay() {
    // Each wave is 18% faster; floor at 180 ms
    return Math.max(180, 1400 * Math.pow(0.82, this.wave - 1));
  }

  // Enemy type probability by wave tier:
  // Wave 1–2: all small
  // Wave 3–4: 70 % small / 30 % medium
  // Wave 5–6: 50 % small / 35 % medium / 15 % big
  // Wave 7+:  30 % small / 40 % medium / 30 % big
  _pickType() {
    const w = this.wave;
    if (w <= 2) return 'small';

    const r = Math.random();
    if (w <= 4) return r < 0.70 ? 'small' : 'medium';
    if (w <= 6) return r < 0.50 ? 'small' : r < 0.85 ? 'medium' : 'big';
    return r < 0.30 ? 'small' : r < 0.70 ? 'medium' : 'big';
  }

  _resetTimer() {
    this.stop();
    this.spawnTimer = this.scene.time.addEvent({
      delay:    this._spawnDelay(),
      callback: () => this.scene.spawnEnemy(this._pickType()),
      loop:     true
    });
  }
}
