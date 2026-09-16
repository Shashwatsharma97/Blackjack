const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const DEAL_STAGGER = 350;
const CONFETTI_COLORS = ["#f5af19", "#f12711", "#4ade80", "#00c6ff", "#e0b039", "#ff416c", "#a78bfa"];

const subhed = document.getElementById("subhed");
const message = document.getElementById("message");
const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");
const dealerScoreEl = document.getElementById("dealer-score");
const playerScoreEl = document.getElementById("player-score");
const startBtn = document.getElementById("start-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const confettiContainer = document.getElementById("confetti-container");

let deck = [];
let playerHand = [];
let dealerHand = [];
let dealerHoleInner = null;
let roundOver = true;

function buildDeck() {
    const newDeck = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            newDeck.push({ rank, suit });
        }
    }
    return newDeck;
}

function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

function drawCard() {
    if (deck.length === 0) {
        deck = shuffle(buildDeck());
    }
    return deck.pop();
}

function handValue(hand) {
    let total = 0;
    let aces = 0;
    for (const card of hand) {
        if (card.rank === "A") {
            aces++;
            total += 11;
        } else if (["J", "Q", "K"].includes(card.rank)) {
            total += 10;
        } else {
            total += Number(card.rank);
        }
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }
    return total;
}

function cardFrontHTML(card) {
    return `
        <span class="corner top">${card.rank}<br>${card.suit}</span>
        <span class="pip">${card.suit}</span>
        <span class="corner bottom">${card.rank}<br>${card.suit}</span>
    `;
}

function createCardSlot(card) {
    const slot = document.createElement("div");
    slot.className = "card-slot";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const back = document.createElement("div");
    back.className = "card-face card-back";

    const front = document.createElement("div");
    front.className = "card-face card-front";
    front.innerHTML = cardFrontHTML(card);

    inner.append(back, front);
    slot.appendChild(inner);
    return { slot, inner };
}

function dealCard(hand, container, faceDown, delay) {
    const card = drawCard();
    hand.push(card);

    const { slot, inner } = createCardSlot(card);
    slot.style.animationDelay = `${delay}ms`;
    slot.classList.add("dealt");
    container.appendChild(slot);

    if (!faceDown) {
        setTimeout(() => inner.classList.add("flipped"), delay + 300);
    }

    return inner;
}

function updateScores(revealDealer) {
    playerScoreEl.textContent = playerHand.length ? `(${handValue(playerHand)})` : "";
    dealerScoreEl.textContent = revealDealer
        ? `(${handValue(dealerHand)})`
        : dealerHand.length
        ? `(${handValue([dealerHand[0]])} + ?)`
        : "";
}

function setControls({ start, hit, stand }) {
    startBtn.classList.toggle("hidden", !start);
    hitBtn.classList.toggle("hidden", !hit);
    standBtn.classList.toggle("hidden", !stand);
}

function launchConfetti(count = 120) {
    confettiContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.width = `${6 + Math.random() * 6}px`;
        piece.style.height = `${10 + Math.random() * 8}px`;
        piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        const duration = 2.2 + Math.random() * 1.6;
        piece.style.animationDuration = `${duration}s`;
        piece.style.animationDelay = `${Math.random() * 0.4}s`;
        confettiContainer.appendChild(piece);
        setTimeout(() => piece.remove(), (duration + 0.5) * 1000);
    }
}

function celebrateWin() {
    subhed.textContent = "You win!";
    subhed.classList.add("win-text");
    launchConfetti();
}

function setMessage(text, kind) {
    message.textContent = text;
    message.classList.remove("show", "win", "lose", "push");
    void message.offsetWidth;
    if (kind) message.classList.add(kind);
    message.classList.add("show");
}

function startGame() {
    deck = shuffle(buildDeck());
    playerHand = [];
    dealerHand = [];
    dealerHoleInner = null;
    roundOver = false;

    playerCardsEl.innerHTML = "";
    dealerCardsEl.innerHTML = "";
    playerScoreEl.textContent = "";
    dealerScoreEl.textContent = "";

    subhed.classList.remove("win-text");
    confettiContainer.innerHTML = "";
    subhed.textContent = "Dealing...";
    setMessage("");
    startBtn.textContent = "Restart";
    setControls({ start: false, hit: false, stand: false });

    let delay = 0;
    dealCard(playerHand, playerCardsEl, false, delay);
    delay += DEAL_STAGGER;
    dealCard(dealerHand, dealerCardsEl, false, delay);
    delay += DEAL_STAGGER;
    dealCard(playerHand, playerCardsEl, false, delay);
    delay += DEAL_STAGGER;
    dealerHoleInner = dealCard(dealerHand, dealerCardsEl, true, delay);
    delay += DEAL_STAGGER;

    setTimeout(() => {
        updateScores(false);
        if (handValue(playerHand) === 21) {
            endRound();
        } else {
            subhed.textContent = "Your move";
            setControls({ start: false, hit: true, stand: true });
        }
    }, delay + 350);
}

function hit() {
    if (roundOver) return;
    setControls({ start: false, hit: false, stand: false });
    dealCard(playerHand, playerCardsEl, false, 0);

    setTimeout(() => {
        updateScores(false);
        const total = handValue(playerHand);
        if (total > 21) {
            endRound();
        } else if (total === 21) {
            subhed.textContent = "21! No more cards for you.";
            setTimeout(stand, 600);
        } else {
            setControls({ start: false, hit: true, stand: true });
        }
    }, 700);
}

function stand() {
    if (roundOver) return;
    setControls({ start: false, hit: false, stand: false });
    subhed.textContent = "Dealer's turn";
    revealDealerHole();
    setTimeout(dealerPlay, 750);
}

function revealDealerHole() {
    if (dealerHoleInner && !dealerHoleInner.classList.contains("flipped")) {
        dealerHoleInner.classList.add("flipped");
    }
    updateScores(true);
}

function dealerPlay() {
    if (handValue(dealerHand) < 17) {
        dealCard(dealerHand, dealerCardsEl, false, 0);
        setTimeout(() => {
            updateScores(true);
            dealerPlay();
        }, 700);
    } else {
        endRound();
    }
}

function endRound() {
    roundOver = true;
    revealDealerHole();

    const playerTotal = handValue(playerHand);
    const dealerTotal = handValue(dealerHand);

    if (playerTotal === 21 && dealerTotal === 21) {
        setControls({ start: false, hit: false, stand: false });
        subhed.textContent = "Both have 21! One tie-break card each...";
        setMessage("");
        setTimeout(tieBreak, 750);
        return;
    }

    finishRound(playerTotal, dealerTotal);
}

function tieBreak() {
    let delay = 0;
    dealCard(playerHand, playerCardsEl, false, delay);
    delay += DEAL_STAGGER;
    dealCard(dealerHand, dealerCardsEl, false, delay);
    delay += DEAL_STAGGER;

    setTimeout(() => {
        updateScores(true);
        finishRound(handValue(playerHand), handValue(dealerHand));
    }, delay + 400);
}

function finishRound(playerTotal, dealerTotal) {
    setControls({ start: true, hit: false, stand: false });
    subhed.classList.remove("win-text");

    if (playerTotal > 21 && dealerTotal > 21) {
        subhed.textContent = "Push";
        setMessage("Both busted on the tie-break. It's a tie.", "push");
    } else if (playerTotal > 21) {
        subhed.textContent = "Bust!";
        setMessage("You went over 21. Dealer wins.", "lose");
    } else if (dealerTotal > 21) {
        celebrateWin();
        setMessage("Dealer busts.", "win");
    } else if (playerTotal === dealerTotal) {
        subhed.textContent = "Push";
        setMessage("It's a tie.", "push");
    } else if (playerTotal > dealerTotal) {
        celebrateWin();
        setMessage(playerTotal === 21 ? "Blackjack!" : "You beat the dealer.", "win");
    } else {
        subhed.textContent = "You lose";
        setMessage("Dealer has the better hand.", "lose");
    }
}

startBtn.addEventListener("click", startGame);
hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);
