//setting up players
const newPlayer = function(name)
    {
        let _wins = 0;
        const won = () => _wins++;
        const showScore = () => _wins;
        const showName = () => name;
        const resetScore = () => {
            _wins = 0;
        };
    
        return {
            showName,
            showScore,
            won,
            resetScore
        };
    };
    
(function newPlayerButtons()
{
    const p1Input = document.getElementById('p1');
    const p1NameBtn = document.getElementById('p1-btn');
    const p1Div = document.getElementById('player-1');
    const p1Label = document.getElementById('p1-label');
    
    const p2Input = document.getElementById('p2');
    const p2NameBtn = document.getElementById('p2-btn');
    const p2Div = document.getElementById('player-2');
    const p2Label = document.getElementById('p2-label');
    
    p1NameBtn.addEventListener('click', () => {
        p1NameBtn.classList.toggle('hidden');
        p1Input.classList.toggle('hidden');
        p1Label.classList.toggle('hidden');
        
        player1 = newPlayer(p1Input.value);
        
        p1Div.insertAdjacentHTML("beforeend", `<p class="name">${p1Input.value}</p>
        <p class="name">Player 1: X</p> 
        <p id="p1-score">Score: 0</p>`);
        
        gameboard();
    });
   
    p2NameBtn.addEventListener('click', () => {
        p2NameBtn.classList.toggle('hidden');
        p2Input.classList.toggle('hidden');
        p2Label.classList.toggle('hidden');
        
        player2 = newPlayer(p2Input.value);
        
        p2Div.insertAdjacentHTML("beforeend", `<p class="name">${p2Input.value}</p> 
        <p class ="name">Player 2: O</p>
        <p id="p2-score">Score: 0</p>`);
        
        gameboard();
    });
})();



function gameboard() 
{
    let board = [];
    
    const showBoard = function() 
    {   
        for (let i=0; i < board.length; i++) 
        {
            const square = document.getElementById(`square${i}`);
            if (board[i][0] == 'X' || board[i][0] == 'O')
            {
            square.innerHTML = `<p>${board[i][0]}</p>`
            
                if (board[i][0] == 'X') {
                    square.style.backgroundColor = "var(--dark-purple)";  
                }
                else if (board[i][0] == 'O')
                {
                    square.style.backgroundColor = "var(--dark-blue)";   
                }
            
            }
            else {
                square.innerHTML = ``;
            }
            ;
        }
        
    };
    
    const newBoard = function() 
    {
        board = [];
        
        for (let i=0; i < 9; i++)
        {
            board.push([i]);
            const square = document.getElementById(`square${i}`);
            square.style.backgroundColor = "var(--neutral)";
            
        };
        
        showBoard();
    };
    
    
    if (typeof player1 != "undefined" && typeof player2 != "undefined") 
    {
         newBoard();
         const resetBtn = document.getElementById('new-game-btn');
         resetBtn.classList.toggle('hidden');
    };
    
    const winConditions = function() {
        
        //row win conditions
        if (board[0][0] == board[1][0] && board[0][0] == board[2][0]){
            return true;
        }
        else if (board[3][0] == board[4][0] && board[3][0] == board[5][0])
        {
         return true;   
        }
        else if (board[6][0] == board[7][0] && board[6][0] == board[8][0])
        {
            return true;
        }
        //column win conditions
        else if (board[0][0] == board[3][0] && board[0][0] == board[6][0])
        {
            return true;
        }
        else if (board[1][0] == board[4][0] && board[1][0] == board[7][0])
        {
            return true;
        }
        else if (board[2][0] == board[5][0] && board[2][0] == board[8][0])
        {
            return true;
        }
        //diagonal win conditions
        else if (board[0][0] == board[4][0] && board[0][0] == board[8][0])
        {
            return true;
        }
        else if (board[2][0] == board[4][0] && board[2][0] == board[6][0])
        {
            return true;
        }
        else {
            return false;
        }
    };
     
    let toggle = true;
    
    const turnToggle = function() {
        toggle = !toggle;
    };
    
    const updateScore = function() {
        const p1Score = document.getElementById('p1-score');
        p1Score.innerText = `Score: ${player1.showScore()}`;
        
        const p2Score = document.getElementById('p2-score');
        p2Score.innerText = `Score: ${player2.showScore()}`;
    };
    
    const play = function(space, player) 
    {
        if (!winConditions() && (board[space][0] !== 'X' && board[space][0] !== 'O'))
        {
            board[space] = [player];
            
            if (winConditions()) {
                if (player === 'X') {
                    const dialog = document.getElementById("p1-dialog");
                    const dialogP = document.getElementById("dialog-p1-p");
                    const closeButton = document.getElementById("p1-dialog-btn");
                    dialogP.innerText = "Player 1 Wins!"
                    dialog.showModal();
                    
                    player1.won();
                    
                    closeButton.addEventListener("click", () => {
                        updateScore();
                        newBoard();
                        dialog.close();
                    });
                }
                else {
                    const dialog = document.getElementById("p2-dialog");
                    const dialogP = document.getElementById("dialog-p2-p");
                    const closeButton = document.getElementById("p2-dialog-btn");
                    dialogP.innerText = "Player 2 Wins!"
                    dialog.showModal();
                    
                    player2.won();
                    
                    closeButton.addEventListener("click", () => {                  
                        updateScore();
                        newBoard();
                        dialog.close();
                    });
                };
            };
            turnToggle();
            showBoard();
        };
    };
    
    //event listeners for spaces
    const spaces = document.getElementsByClassName('square');
    
    for (let i=0; i < spaces.length; i++)
    {
        spaces[i].addEventListener('click', () => {
            if (toggle) {
                play(i, 'X');
            }
            else {
                play(i, 'O');
            }
        });
    };
    
    const resetGame = () => {
        window.location.reload();
    };
    
    const newGameBtn = document.getElementById('new-game-btn');
    newGameBtn.addEventListener('click', resetGame);

};