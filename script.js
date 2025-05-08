const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ['X', 'O'];
let currentPlayer = players[0];

const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage);

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check the win status of the game 
function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i]
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
         return true;   
        }
    }
    return false;
}

// Function to check draw status
function checkTie() {
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

// Functions to reset the actions when the game is restarted
function restartButton() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
    }
    endMessage.textContent = `X's turn!`;
    currentPlayer = players[0];
}

// In this loop, when each frame is clicked, the game state will be printed on the screen with the endMessage variable, provided that certain conditions are met
for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        if(checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            return;
        }
        if(checkTie()) {
            endMessage.textContent = `Game is tied!`;
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        if(currentPlayer == players[0]) {
            endMessage.textContent = `X's turn!`;
        }else {
            endMessage.textContent = `O's turn!`;
        }
    })
}

// Matrix effect in background
document.addEventListener("DOMContentLoaded", function () {
    const matrixContainer = document.createElement("div");
    matrixContainer.classList.add("matrix-container");
    document.body.appendChild(matrixContainer);

    const numCharacters = 100; // Adjust for density
    for (let i = 0; i < numCharacters; i++) {
        const character = document.createElement("span");
        character.textContent = Math.random() > 0.5 ? "X" : "O";
        character.style.left = `${Math.random() * 100}vw`;
        character.style.animationDuration = `${Math.random() * 3 + 2}s`; // Different speeds
        character.style.animationDelay = `${Math.random() * 5}s`; // Different start times
        matrixContainer.appendChild(character);
    }
});
