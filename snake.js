
const blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;


function Block(x, y, colour) 
{
    this.colour = colour;
    let position = [x, y];

    this.drawme = function(context) {
        context.fillStyle = this.colour;
        context.fillRect(position[0], position[1], blockSize, blockSize);
    };

    Object.defineProperty(this, "position", {
        get: function() {
            return position;
        },
        set: function(new_position) {
            position = new_position;
        }
    })
}

function Snake ()
{
    let head = new Block(blockSize * 5, blockSize * 5, "lime");
    let body = [];
    let velocity = [0, 0];

    this.update = function() {
        for (let i = body.length - 1; i > 0; i--){
            body[i] = body[i - 1];
        }
        if (body.length){
            body[0].position = head.position;
        }

        head.position[0] += velocity[0] * blockSize;
        head.position[1] += velocity[1] * blockSize;
    }

    this.ateFood = function(food) {
        return head.position[0] == food.position[0] && head.position[1] == food.position[1];
    }

    this.addSegment = function(x, y){
        let segment = new Block(x, y, "lime");
        body.push(segment);
    }

    this.drawSnake = function(context) {
        head.drawme(context);

        for (let i = 0; i < body.length; i++){
            body[i].drawme(context);
        }
    }

    Object.defineProperty(this, "velocity", {
        get: function() {
            return velocity;
        },
        set: function(new_velocity){
            velocity = new_velocity;
        }
    })
}


// Snake
let snake = new Snake();

// Food
let food = new Block(blockSize * 10, blockSize * 10, "red");

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

    food.drawme(context);

    snake.drawSnake(context);
    snake.update()
}

function changeDirection(e)
{
    if (e.code == "ArrowUp" && snake.velocity[1] != 1){
        snake.velocity = [0, -1];
    }
    if (e.code == "ArrowDown" && snake.velocity[1] != -1){
        snake.velocity = [0, 1];
    }
    if (e.code == "ArrowRight" && snake.velocity[0] != -1){
        snake.velocity = [1, 0];
    }
    if (e.code == "ArrowLeft" && snake.velocity[0] != 1){
        snake.velocity = [-1, 0];
    }
}

function placeFood(){
    food.position[0] = Math.floor(Math.random() * cols) * blockSize;
    food.position[1] = Math.floor(Math.random() * rows) * blockSize; 
}