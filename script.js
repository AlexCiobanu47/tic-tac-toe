const currentPlayerText = document.querySelector('.current-player-text');
currentPlayerText.innerHTML = 'current player: player 1';
const resultText = document.querySelector('.result-text');
const replayContainer = document.querySelector('.replay-container');
const gameBoardModule = (() =>{
    //generate board as an array
    let gameBoard = [];
    for(i = 0; i < 9; i++){
        gameBoard.push('');
    }

    //display grid boxes
    let boxContainer = document.querySelector('.grid-container');
    gameBoard.forEach((item, index) =>{
        const box = document.createElement('div')
        box.className = 'grid-box';
        boxContainer.appendChild(box);
    })
    Array.from(boxContainer.children).forEach((box, index) =>{
        box.addEventListener('click', () =>{
            if(game.gameWon === false){
                //display player symbol
                box.classList.add(game.currentPlayer.symbol);
                box.innerHTML = game.currentPlayer.symbol;
                //update gameBoard
                gameBoard[index] = game.currentPlayer.symbol;
                //decrement moves left
                game.movesLeft--;
                //check winner
                game.checkWinner();
                //check if there are any remaining free spots
                game.checkStatus();
            }
        })
    });
    return{
        gameBoard
    };
})();

//player factory function
const createPlayer = (name, symbol) =>{
    return {name, symbol};
}

const game = (() =>{
    //player declaration
    const playerOne = createPlayer('player 1', 'X');
    const playerTwo = createPlayer('player 2', 'O');

    //initial variables
    let currentPlayer = playerOne;
    let gameWon = false;
    let movesLeft = 9;

    //win conditions
    const winCombinations = [
        //rows
        [0,1,2],
        [3,4,5],
        [6,7,8],
        //collumns
        [0,3,6],
        [1,4,7],
        [2,5,8],
        //diagonals
        [0,4,8],
        [2,4,6],
    ];
    //next player
    function nextPlayer(){
        if(this.currentPlayer === playerOne){
            this.currentPlayer = playerTwo;
        }
        else{
            this.currentPlayer = playerOne;
        }
        currentPlayerText.innerHTML = 'current player: ' + this.currentPlayer.name;
    }


    //check for winner
    function checkWinner(){
        winCombinations.forEach((item,index) =>{
            if( gameBoardModule.gameBoard[item[0]] === this.currentPlayer.symbol && 
                gameBoardModule.gameBoard[item[1]] === this.currentPlayer.symbol && 
                gameBoardModule.gameBoard[item[2]] === this.currentPlayer.symbol){
                resultText.innerHTML = `${this.currentPlayer.name} won`;
                this.gameWon = true;
                replayGame();
            }
        })
    }
    function gameTie(){
        resultText.innerHTML = 'Game tie';
    }
    //
    function checkStatus(){
        if(this.gameWon === false){
            if(this.movesLeft > 0){
                this.nextPlayer();
            }
            else if(this.movesLeft === 0){
                this.gameTie();
            }
        }
        
    }
    return{
        currentPlayer,
        checkStatus,
        movesLeft,
        checkWinner,
        nextPlayer,
        gameTie,
        gameWon,
    };
})();
