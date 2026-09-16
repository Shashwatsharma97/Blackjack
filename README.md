# Blackjack

A single-player Blackjack game that runs entirely in the browser — plain HTML, CSS, and JavaScript, no frameworks, no build step, no backend.

## Demo

🎥 [Watch the demo video](demo/blackjack-demo.mp4)

<!--
  This links to the video committed in the repo — click it to open GitHub's built-in
  video player. If you want the video to preview inline directly on this README page
  instead of requiring a click, drag-and-drop the mp4 into the README/Issue editor on
  github.com — that generates a github.com/.../assets/... link which GitHub renders as
  an inline playable video when pasted here.
-->

## Features

- Classic blackjack rules — dealer stands on 17, aces count as 1 or 11 automatically
- Animated card dealing with a 3D flip reveal for the dealer's hole card
- Win / lose / push detection, including the double-blackjack tie-break rule
- Confetti burst and an enlarged "You win!" message on a win
- Responsive layout that works down to phone-sized screens

## Tech stack

- HTML5
- CSS3 (flexbox, 3D transforms, keyframe animations)
- Vanilla JavaScript (ES6+) — zero dependencies

## Getting started (macOS)

### Option 1 — Quickest (no server needed)

```bash
git clone https://github.com/Shashwatsharma97/Blackjack.git
cd Blackjack
open index.html
```

`open index.html` launches it directly in your default browser.

### Option 2 — Local server (recommended if you plan to keep developing)

```bash
git clone https://github.com/Shashwatsharma97/Blackjack.git
cd Blackjack
python3 -m http.server 8000
open http://localhost:8000
```

macOS ships with Python 3 pre-installed, so no extra setup is required.

## How to play

1. Click **Start** to get dealt two cards; the dealer gets one face up and one face down.
2. Click **Hit** to take another card, or **Stand** to hold your total.
3. Get closer to 21 than the dealer without going over. The dealer reveals its hidden card and draws until it reaches 17 or busts.
4. Click **Restart** to play again.

## Project structure

```
Blackjack/
├── index.html    # page structure
├── style.css     # layout, theming, and animations
└── index.js      # game rules, state, and DOM updates
```

## Author

Shashwat Sharma
