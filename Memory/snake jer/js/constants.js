const CELL_SIZE = 30;
const COLUMNS = 30;
const ROWS = 30;
const GAME = {
    width: COLUMNS * CELL_SIZE,
    height: ROWS * CELL_SIZE,
    gameOver: false,
    loop: 0,
}

function resetGame(){
    GAME.gameOver = false;
    Snake.reset();
    Food.reset();
}