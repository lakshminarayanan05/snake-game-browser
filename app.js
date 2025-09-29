let board = document.querySelector('#board');
let context = board.getContext('2d');
let scoreVal = document.querySelector('#scoreVal');

const WIDTH = 500;
const HEIGHT = 500;
let foodX;
let foodY;
const UNIT = 20;

let snake = [
    {x: UNIT*2, y: 0},
    {x: UNIT, y: 0},
    {x: 0, y: 0}
];

let xVel = 20;
let yVel = 0;
let head = {x: 0, y: 0};

let out = false;
let gameStart = false;
let pause = false;

let score = 0;

window.addEventListener('keydown', keyPress)

startGame();

function startGame(){
    clearBoard();
    createFood();
    displayFood();
    createSnake();
}

function nextTurn(){
    if(!out && gameStart){
        setTimeout(() => {
            if(!pause){
                clearBoard();
                moveSnake();
                if(head.x == foodX && head.y == foodY){
                    createFood();
                    addScore();
                }
                else{
                    snake.pop();
                }
                displayFood();
                createSnake();
                checkGameOver();
            }
            else{
                context.font = '20px serif';
                context.fillStyle = 'yellow';
                context.textAlign = 'center';
                context.fillText("Press SPACE to Continue", WIDTH/2, 30);
            }
            nextTurn();
        }, 100);
    }
    else{
        clearBoard();
        context.font = 'bold 50px serif';
        context.fillStyle = '#fc345cff';
        context.textAlign = 'center';
        context.fillText("GAME OVER!", WIDTH/2, HEIGHT/2 - 20);
        context.font = '20px serif';
        context.fillStyle = 'white';
        context.fillText("Press SPACE to Restart", WIDTH/2, HEIGHT/2 + 20);

    }
}

function clearBoard(){
    context.fillStyle = '#2d2d44';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = '#f93e3eff';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function createSnake(){
    context.strokeStyle = '#212121';
    snake.forEach((box, index)=>{
        context.fillStyle = index === 0 ? '#5bb55eff' : '#3e9342ff';
        context.fillRect(box.x, box.y, UNIT, UNIT);
        context.strokeRect(box.x, box.y, UNIT, UNIT);
    });
}

function addScore(){
    score++;
    scoreVal.innerText = score;
}

function moveSnake(){
    head = {
        x: (snake[0].x + xVel + WIDTH) % WIDTH, 
        y: (snake[0].y + yVel + HEIGHT) % HEIGHT
    };
    snake.unshift(head);
}

function keyPress(event){
    if (!gameStart) {
        gameStart = true;
        nextTurn();
    }

    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, SPACE = 32;

    switch (event.keyCode) {
        case LEFT:
            if (xVel !== UNIT) { xVel = -UNIT; yVel = 0; }
            break;
        case RIGHT:
            if (xVel !== -UNIT) { xVel = UNIT; yVel = 0; }
            break;
        case UP:
            if (yVel !== UNIT) { xVel = 0; yVel = -UNIT; }
            break;
        case DOWN:
            if (yVel !== -UNIT) { xVel = 0; yVel = UNIT; }
            break;
        case SPACE:
            if(!out)
                pause = !pause;
            else
                restartGame();
    }
}

function restartGame(){
    snake = [
        {x: UNIT*2, y: 0},
        {x: UNIT, y: 0},
        {x: 0, y: 0}
    ];
    xVel = UNIT;
    yVel = 0;
    head = {x: 0, y: 0};
    out = false;
    gameStart = false;
    pause = false;
    score = 0;
    scoreVal.innerText = 0;

    clearBoard();
    createFood();
    displayFood();
    createSnake();
}

function checkGameOver(){
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            out = true;
        }
    }
}