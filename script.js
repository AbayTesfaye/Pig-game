'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

let player = true;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (player) {
    // generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  score[activePlayer] += currentScore;
  console.log(score[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 20) {
    player = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
