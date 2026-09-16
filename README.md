# Blackjack

A single-player Blackjack game that runs entirely in the browser — plain HTML, CSS, and JavaScript, no frameworks, no build step, no backend.

## Demo

<!--
  Add your demo video here after uploading it (see "Recording & adding a demo video" below).
  Once uploaded through the GitHub web UI, GitHub gives you a link that looks like:
  https://github.com/Shashwatsharma97/Blackjack/assets/xxxxxx/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.mp4
  Paste that link on its own line right here — GitHub automatically renders it as a
  playable inline video on the repo page.
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

## Recording & adding a demo video (macOS)

1. Run the game locally (see "Getting started" above).
2. Press **Cmd+Shift+5** to open the macOS screenshot/recording toolbar.
3. Choose **Record Selected Portion**, drag a box around the browser window, then click **Record**.
4. Play a round of the game (deal, hit/stand, and a win to show the confetti).
5. Click the stop icon in the menu bar to end the recording — it saves to your Desktop as a `.mov` file.
6. (Optional, keeps the file small) Convert it to `.mp4`:
   ```bash
   ffmpeg -i ~/Desktop/your-recording.mov -vcodec h264 -acodec aac ~/Desktop/blackjack-demo.mp4
   ```
   (Install ffmpeg first if needed: `brew install ffmpeg`.)
7. Upload it to GitHub so it plays inline in this README:
   - Go to this repo on github.com and open `README.md` for editing (pencil icon), or open a new Issue — either editor works.
   - Drag and drop your `.mp4` file into the text box.
   - GitHub uploads it and inserts a link like `https://github.com/Shashwatsharma97/Blackjack/assets/.../xxxxxxx.mp4`.
   - Copy that link into the **Demo** section at the top of this file, then commit.

## Author

Shashwat Sharma
