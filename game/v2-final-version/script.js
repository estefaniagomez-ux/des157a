(function () {
    'use strict';

    const startGame   = document.querySelector('#startgame');
    const gameControl = document.querySelector('#gamecontrol');
    const game        = document.querySelector('#game');
    const score       = document.querySelector('#score');
    const actionArea  = document.querySelector('#actions');

    // sounds
    const buttonSound = new Audio('sounds/buttonsound.mp3');
    const meowSound   = new Audio('sounds/meow.mp3');

    const gameData = {
        dice:    ['dice1.png', 'dice2.png', 'dice3.png', 'dice4.png', 'dice5.png', 'dice6.png'],
        players: ['Alice', 'The Queen of Hearts'],
        score:   [0, 0],
        roll1:   0,
        roll2:   0,
        rollSum: 0,
        index:   0,
        gameEnd: 29
    };

    // update scores
    function showCurrentScore() {
        document.querySelector('#score-p1').textContent = gameData.score[0];
        document.querySelector('#score-p2').textContent = gameData.score[1];

        score.innerHTML = `<p>Score — <strong>Alice: ${gameData.score[0]}</strong>
            &nbsp;|&nbsp; <strong>Queen: ${gameData.score[1]}</strong></p>`;
    }

    // highlight active player
    function updateActivePlayer() {
        document.querySelector('#player-alice').classList.toggle('active', gameData.index === 0);
        document.querySelector('#player-queen').classList.toggle('active', gameData.index === 1);
    }

    function switchPlayer() {
        gameData.index = gameData.index ? 0 : 1;
    }

    // setUpTurn
    function setUpTurn() {
        updateActivePlayer();
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}!</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';

        document.querySelector('#roll').addEventListener('mousedown', function () {
            buttonSound.currentTime = 0;
            buttonSound.play();
            throwDice();
        });
    }

    // throwDice
    function throwDice() {
        actionArea.innerHTML = '';

        gameData.roll1   = Math.floor(Math.random() * 6) + 1;
        gameData.roll2   = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<div class="dice-row">
            <img src="images/${gameData.dice[gameData.roll1 - 1]}" width="84" height="84" alt="Die showing ${gameData.roll1}">
            <img src="images/${gameData.dice[gameData.roll2 - 1]}" width="84" height="84" alt="Die showing ${gameData.roll2}">
        </div>`;

        // both 1s — Caterpillar eyes: wipe score
        if (gameData.rollSum === 2) {
            gameData.score[gameData.index] = 0;
            game.innerHTML += `<p>Caterpillar eyes! ${gameData.players[gameData.index]}'s score is wiped to zero!</p>`;
            showCurrentScore();
            switchPlayer();
            setTimeout(setUpTurn, 3000);

        // one die is 1 — Cheshire Cat steals the turn
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            game.innerHTML += `<p>A one! The Cheshire Cat steals the turn from ${gameData.players[gameData.index]}.</p>`;
            switchPlayer();
            game.innerHTML += `<p>It's now ${gameData.players[gameData.index]}'s turn.</p>`;
            showCurrentScore();
            setTimeout(setUpTurn, 3000);

        // no ones — add to score, offer roll again / pass
        } else {
            gameData.score[gameData.index] += gameData.rollSum;
            showCurrentScore();

            actionArea.innerHTML = `
                <button id="rollagain">Roll Again</button>
                <button id="pass">Pass</button>`;

            document.querySelector('#rollagain').addEventListener('mousedown', function () {
                throwDice();
            });

            document.querySelector('#pass').addEventListener('mousedown', function () {
                switchPlayer();
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    //  checkWinningCondition
    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with
                ${gameData.score[gameData.index]} points!</h2>`;
            actionArea.innerHTML = '';
            document.querySelector('#quit').textContent = 'Play Again?';
        }
    }

    //  start
    startGame.addEventListener('mousedown', function () {
        meowSound.currentTime = 0;
        meowSound.play();
        gameData.index    = Math.round(Math.random());
        gameData.score    = [0, 0];

        gameControl.innerHTML = `<h2>The game has started!</h2>
            <button id="quit">Quit</button>`;

        document.querySelector('#quit').addEventListener('click', function () {
            location.reload();
        });

        showCurrentScore();
        setUpTurn();
    });

})();