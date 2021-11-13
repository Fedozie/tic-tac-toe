const boxes = document.querySelectorAll('.box');
const heading = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartBtn = document.querySelector('#restart');

const spaces = [];
const tick_cross = 'X';
const tick_nought = 'O'
let currentPlayer = tick_nought;

boxes.forEach((box, i) => {
    box.addEventListener('click', (e) => {
        const id = e.target.id;
        if(!spaces[id]){
            spaces[id] = currentPlayer;
            box.innerHTML = currentPlayer;
        }

        if(playerWon()){
            heading.innerHTML = `Player ${currentPlayer} has won this round.`
            restart();
            return;
        }
        if(playerDraw()){
            return
        }

        currentPlayer = currentPlayer === tick_nought ? tick_cross : tick_nought;
    })
})

const playerWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won on the top row.`
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won along the diagonal.`
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won the left column.`
            return true;
        }
    }

    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won on the middle column.`
            return true;
        }
        if(spaces[2] === currentPlayer && spaces[6] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won along the diagonal.`
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won on the middle row.`
            return true;
        }
    }

    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won on the right column.`
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            strategy.innerHTML = `${currentPlayer} has won on the bottom row.`
            return true;
        }
    }
}

const playerDraw = () => {
    let draw = 0;
    spaces.forEach((space, i) => {
        if(space[i] !== null){
            draw++;
        }
        if(draw === 9){
            heading.innerHTML = `This round was a draw.`;
            strategy.innerHTML = `Draw`;
            restart();
        }
    })

}

const restart = () => {
    setTimeout(() => {
        spaces.forEach((space, i) => {
            space[i] === null
        })
        boxes.forEach((box) => {
            box.innerHTML = '' 
        })
        heading.innerHTML = 'Play Again';
        
        setTimeout(() => {
            heading.innerHTML = 'Play'
        }, 2000);
        strategy.innerHTML = '';
    }, 1800);
}

