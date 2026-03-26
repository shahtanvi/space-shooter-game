# Space Shooter Game — Project Spec

## Overview

A retro vertical-scrolling 2D space shooter built with **Phaser.js**, playable in any modern browser.
The player pilots a ship through increasingly difficult waves of enemies, collects power-ups, and fights to survive as long as possible. The game uses pixel art assets from the Legacy Collection.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Game framework | Phaser 3 |
| Language | JavaScript (ES6+) |
| Target | Browser (index.html) |
| Scroll direction | Vertical (top-down) |
| Difficulty model | Wave-based (escalating) |

---

## Functional Requirements

### Core Gameplay
- [ ] Player ship moves in all 4 directions with arrow keys or WASD
- [ ] Player fires laser bolts with Spacebar (auto-fire when held)
- [ ] Enemies spawn from the top and move downward
- [ ] Collision detection: laser hits enemy, enemy hits player
- [ ] Player has 3 lives; losing all lives triggers Game Over
- [ ] Score increments per enemy destroyed

### Wave System
- [ ] Enemies spawn in waves; each wave is harder than the last
- [ ] Wave number displayed on screen; brief "Wave X" banner between waves
- [ ] Enemy speed, spawn rate, and formation complexity increase each wave
- [ ] Three enemy tiers: small, medium, big (boss-tier in late waves)

### Power-ups
- [ ] Enemies randomly drop power-ups on death
- [ ] Power-up types: spread shot, shield, speed boost
- [ ] Power-ups expire after a set duration (except shield which absorbs 1 hit)

### Audio
- [ ] Laser fire sound on shoot
- [ ] Pickup sound on power-up collect

### UI & Screens
- [ ] Start screen with title and "Press Space to Start"
- [ ] HUD: score, lives, wave number, active power-up indicator
- [ ] Pause with P key
- [ ] Game Over screen with final score and "Play Again"
- [ ] High score persisted in `localStorage` (top 5)

### Visual
- [ ] Parallax scrolling star field (2–3 layers at different speeds)
- [ ] Planets scroll past in background for depth
- [ ] Explosion animation on enemy death and player death
- [ ] Screen shake on player hit

---

## Pixel Art Asset Inventory

All paths are relative to `Legacy Collection/Assets/`.

### Player & Enemies

| Asset | Purpose | Path |
|---|---|---|
| Ship | Player ship spritesheet | [`Packs/SpaceShipShooter/spritesheets/ship.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/ship.png) |
| Enemy Small | Small enemy spritesheet | [`Packs/SpaceShipShooter/spritesheets/enemy-small.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-small.png) |
| Enemy Medium | Medium enemy spritesheet | [`Packs/SpaceShipShooter/spritesheets/enemy-medium.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-medium.png) |
| Enemy Big | Large / boss-tier enemy | [`Packs/SpaceShipShooter/spritesheets/enemy-big.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/enemy-big.png) |

### Weapons & Power-ups

| Asset | Purpose | Path |
|---|---|---|
| Laser Bolts | Projectile spritesheet | [`Packs/SpaceShipShooter/spritesheets/laser-bolts.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/laser-bolts.png) |
| Power-up | Power-up drop spritesheet | [`Packs/SpaceShipShooter/spritesheets/power-up.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/power-up.png) |

### Explosions

| Asset | Purpose | Path |
|---|---|---|
| Explosion (ship pack) | Primary explosion animation | [`Packs/SpaceShipShooter/spritesheets/explosion.png`](Legacy%20Collection/Assets/Packs/SpaceShipShooter/spritesheets/explosion.png) |
| Explosion A | Extra explosion variant | [`Misc/Explosions pack/explosion-1-a/spritesheet.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-a/spritesheet.png) |
| Explosion B | Extra explosion variant | [`Misc/Explosions pack/explosion-1-b/spritesheet.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-b/spritesheet.png) |
| Explosion C | Extra explosion variant | [`Misc/Explosions pack/explosion-1-c/spritesheet.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-c/spritesheet.png) |
| Explosion D | Extra explosion variant | [`Misc/Explosions pack/explosion-1-d/spritsheet.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-d/spritsheet.png) |
| Explosion E | Large explosion variant | [`Misc/Explosions pack/explosion-1-e/explosion-5.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-e/explosion-5.png) |
| Explosion F | Large explosion variant | [`Misc/Explosions pack/explosion-1-f/Sprites.png`](Legacy%20Collection/Assets/Misc/Explosions%20pack/explosion-1-f/Sprites.png) |

### Backgrounds (Parallax Layers)

| Asset | Purpose | Path |
|---|---|---|
| Space background | Solid deep-space BG | [`Environments/space_background_pack/Old Version/layers/parallax-space-backgound.png`](Legacy%20Collection/Assets/Environments/space_background_pack/Old%20Version/layers/parallax-space-backgound.png) |
| Stars layer | Slow-moving star field | [`Environments/space_background_pack/Old Version/layers/parallax-space-stars.png`](Legacy%20Collection/Assets/Environments/space_background_pack/Old%20Version/layers/parallax-space-stars.png) |
| Far planets | Mid-speed distant planets | [`Environments/space_background_pack/Old Version/layers/parallax-space-far-planets.png`](Legacy%20Collection/Assets/Environments/space_background_pack/Old%20Version/layers/parallax-space-far-planets.png) |
| Ring planet | Scenic ring planet layer | [`Environments/space_background_pack/Old Version/layers/parallax-space-ring-planet.png`](Legacy%20Collection/Assets/Environments/space_background_pack/Old%20Version/layers/parallax-space-ring-planet.png) |
| Big planet | Foreground planet layer | [`Environments/space_background_pack/Old Version/layers/parallax-space-big-planet.png`](Legacy%20Collection/Assets/Environments/space_background_pack/Old%20Version/layers/parallax-space-big-planet.png) |

### Audio

| Asset | Purpose | Path |
|---|---|---|
| Laser | Laser fire sound | [`Packs/grotto_escape_pack/Base pack/sounds/laser.wav`](Legacy%20Collection/Assets/Packs/grotto_escape_pack/Base%20pack/sounds/laser.wav) |
| Pickup | Power-up collect sound | [`Packs/grotto_escape_pack/Base pack/sounds/pickup.wav`](Legacy%20Collection/Assets/Packs/grotto_escape_pack/Base%20pack/sounds/pickup.wav) |

---

## Milestones

---

### Milestone 1 — Core Loop (Playable MVP)

**Goal:** A fully playable game loop with one enemy type, one weapon, and basic scoring.

**Assets used:** `ship.png`, `enemy-small.png`, `laser-bolts.png`, `explosion.png` (ship pack), `parallax-space-backgound.png`, `parallax-space-stars.png`, `laser.wav`

**Deliverables:**

- `index.html` — boots Phaser 3 from CDN
- `src/scenes/GameScene.js` — main game scene
- `src/scenes/GameOverScene.js` — game over screen

**Features:**

1. **Background** — two-layer parallax scroll: solid space BG + slow-moving stars
2. **Player ship** — spawns at bottom center; moves with arrow keys / WASD; constrained to screen bounds
3. **Laser** — fires upward on Spacebar hold (0.25s cooldown); laser fire sound plays
4. **Enemies (small)** — spawn at random X across the top every 1.5s; move straight down; despawn if they reach the bottom
5. **Collision** — laser destroys enemy (explosion animation + score +100); enemy reaching or touching player costs 1 life + explosion
6. **HUD** — top bar: Score (left), Lives as ship icons (right)
7. **Wave progression** — every 10 enemies destroyed = next wave; enemy spawn rate increases by 15% per wave
8. **Game Over** — shows final score; "Play Again" restarts the game

**Definition of done:** You can launch `index.html`, shoot enemies, die, and start again.

---

### Milestone 2 — Waves, Power-ups & Polish

**Goal:** Add enemy variety, power-ups, parallax depth, and audio. The game feels like a real shooter.

**New assets:** `enemy-medium.png`, `enemy-big.png`, `power-up.png`, `explosion-1-a` through `explosion-1-d`, `parallax-space-far-planets.png`, `parallax-space-ring-planet.png`, `parallax-space-big-planet.png`, `pickup.wav`

**New scenes/files:**

- `src/scenes/StartScene.js` — title screen
- `src/managers/WaveManager.js` — controls wave composition and enemy spawning
- `src/managers/PowerUpManager.js` — spawns and applies power-ups

**Features:**

1. **Start screen** — pixel art title, "Press Space to Start", shows high score
2. **Full parallax** — 4 background layers (BG, stars, far planets, ring planet) scrolling at different speeds
3. **Enemy tiers:**
   - Small — fast, 1 hit, worth 100 pts
   - Medium — slower, 2 hits, worth 250 pts, fires back at player
   - Big — slow, 5 hits, worth 500 pts, moves in sine-wave pattern
4. **Wave compositions** — WaveManager defines enemy mix per wave (e.g. Wave 1: all small; Wave 3: small + medium; Wave 5: all three types)
5. **Power-ups** — 20% drop chance from medium/big enemies:
   - Spread Shot — fires 3 bolts in a cone for 8s
   - Shield — absorbs next hit (visual ring around ship)
   - Speed Boost — +40% movement speed for 6s
6. **Explosion variety** — different explosion spritesheets used for small vs large enemy deaths
7. **Screen shake** — camera shake (magnitude 8, duration 200ms) on player hit
8. **Pause** — P key pauses/unpauses; dims screen and shows "PAUSED"
9. **High score** — top 5 scores saved to `localStorage`; shown on start and game over screens

**Definition of done:** Game has a start screen, 5+ distinct waves with escalating difficulty, power-ups work, parallax background is scrolling, and high scores persist.

---

### Milestone 3 — Boss, Mobile & Final Polish

**Goal:** Complete, shippable game with a boss fight, mobile touch controls, and full visual polish.

**New assets:** `explosion-1-e` and `explosion-1-f` (large explosions for boss), `parallax-space-big-planet.png` as boss-fight backdrop layer

**New files:**

- `src/scenes/PauseScene.js` — overlay pause scene
- `src/enemies/Boss.js` — boss enemy logic
- `src/ui/TouchControls.js` — on-screen D-pad and fire button

**Features:**

1. **Boss fight** — every 10 waves a boss spawns using `enemy-big.png`:
   - 20 HP, fires burst patterns at the player
   - "WARNING — BOSS APPROACHING" banner before spawn
   - Large explosion (variants E & F) on defeat; bonus 2000 pts
   - Big planet layer scrolls in as a dramatic backdrop during boss fight
2. **Weapon upgrade system** — collecting 3 of the same power-up upgrades it permanently for the run (e.g. triple spread → 5-way spread)
3. **Touch controls** — virtual joystick (left side) + fire button (right side) for mobile browsers; auto-detected based on `navigator.maxTouchPoints`
4. **Particle effects** — Phaser particle emitter for engine exhaust trail on the player ship
5. **Visual polish:**
   - Enemy entry animations (slide in from off-screen)
   - Hit-flash (white tint) on enemy damage
   - Score pop-up floating text on kill
6. **Sound improvements:**
   - Different laser pitch for spread shot vs single shot
   - Boss music (swap background track if a music file is available)
7. **Responsive canvas** — game scales to fill the browser window while maintaining 480×640 aspect ratio

**Definition of done:** Game includes boss fights, works on mobile, feels polished, and is ready to deploy as a static site.

---

### Milestone 4 — Mobile (Gyroscope + Portrait)

**Goal:** Make the game fully playable on a mobile browser using gyroscope tilt for movement and a hold-to-fire touch button. No virtual joystick — the screen stays clean.

**New files:**

- `src/ui/MobileControls.js` — gyroscope input handler and fire button overlay

**Changes to existing files:**

- `index.html` — disable pinch-to-zoom, prevent scroll/pull-to-refresh, add portrait orientation lock via Web App Manifest or `<meta>` tag
- `src/scenes/StartScene.js` — add iOS motion permission request (triggered by the "Play" tap); skip on Android/desktop
- `src/scenes/GameScene.js` — integrate `MobileControls`; lock player Y position on mobile; detect mobile vs desktop and switch input source accordingly

**Features:**

1. **Gyroscope movement** — left/right tilt (`gamma` axis from `DeviceOrientation` API) controls the ship's horizontal position
   - Auto-calibrates on game start: the tilt angle at the moment "Play" is tapped becomes neutral center
   - Dead zone of ±5° around center to prevent drift from minor wobble
   - Player Y is fixed at the bottom of the screen on mobile (no vertical movement)
2. **Hold-to-fire button** — large translucent button on the right half of the screen; auto-fires while held, matching spacebar behavior on desktop
3. **Pause button** — small button in the top-right corner of the screen
4. **iOS permission flow** — on iOS 13+, `DeviceOrientationEvent.requestPermission()` is called on the "Play" tap; if denied, game falls back to showing a message asking the player to enable motion access in Safari settings
5. **Portrait lock** — game forces portrait orientation; landscape shows a "Rotate your device" overlay until the player rotates back
6. **Touch hygiene** — canvas disables pinch-to-zoom, pull-to-refresh, and long-press context menu
7. **Auto-detect** — mobile controls activate only when `navigator.maxTouchPoints > 0`; desktop keyboard controls remain unchanged

**Definition of done:** Game is fully playable on an iPhone or Android phone in portrait mode using tilt-to-move and tap-to-fire, with no keyboard required.

---

## File Structure (target end state)

```
space-shooter-game/
├── index.html
├── SPEC.md
├── src/
│   ├── main.js              # Phaser config, scene registry
│   ├── scenes/
│   │   ├── StartScene.js
│   │   ├── GameScene.js
│   │   ├── GameOverScene.js
│   │   └── PauseScene.js
│   ├── enemies/
│   │   ├── EnemySmall.js
│   │   ├── EnemyMedium.js
│   │   ├── EnemyBig.js
│   │   └── Boss.js
│   ├── managers/
│   │   ├── WaveManager.js
│   │   └── PowerUpManager.js
│   └── ui/
│       └── MobileControls.js
└── Legacy Collection/       # pixel art assets (read-only)
```
