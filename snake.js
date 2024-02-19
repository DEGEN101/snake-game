
const blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// Snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocity = [0, 0];
let snakeBody = [];

// Food
let foodX = blockSize * 10;
let foodY = blockSize * 10;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8); //1000 milliseconds
}

function update() {
    if (gameOver){
        return;
    }

    context.fillStyle = "#000";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocity[0] * blockSize;
    snakeY += velocity[1] * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game Over Conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
            break;
        }
    }
}

function changeDirection(e)
{
    if (e.code == "ArrowUp" && velocity[1] != 1){
        velocity = [0, -1];
    }
    if (e.code == "ArrowDown" && velocity[1] != -1){
        velocity = [0, 1];
    }
    if (e.code == "ArrowRight" && velocity[0] != -1){
        velocity = [1, 0];
    }
    if (e.code == "ArrowLeft" && velocity[0] != 1){
        velocity = [-1, 0];
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize; 
}