//GAME CONSTANTS 
let inputDir  = {x: 0, y: 0};
const food_sound = new Audio("../Snake-Game/music/food.mp3");
const game_over_sound = new Audio("../Snake-Game/music/gameover.mp3");
const move_sound = new Audio("../Snake-Game/music/move.mp3");
const music = new Audio("../Snake-Game/music/primitive-snake-charmer-melody-104216.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]

food = {x: 6, y: 7};

// GAME FUNCTIONS
// Here requestAnimationFrame is used instead od setInterval as it is more efficient (High FPS, less Flicker)
function main(ctime){
    window.requestAnimationFrame(main);
    // This if condition will prevent the redering of Frames (through requestAnimationFrame) by checking if the difference between lastPaintTime and current time is less than the specified speed. 
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if the Snake bumps into a wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;
}

function gameEngine(){
    //Part-1 : Updating the Snake Array and Food Array
    if(isCollide(snakeArr)){
        game_over_sound.play();
        music.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over Press Any Key To Play Again...");
        snakeArr = [{x: 13, y: 15}]
        music.play();
        score = 0;
    }

    // if the food has been eaten increment the score and relocate the food
    if (snakeArr[0].y ===  food.y && snakeArr[0].x === food.x){
        food_sound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
    }

    //Moving the Snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y

    //Part-2 : Display snake and food
    // Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


// LOGIC
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} // Game Starts
    move_sound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x  = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x  = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x  = -1;
            inputDir.y = 0;
            break;
    
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x  = 1;
            inputDir.y = 0;
            break;

        default:
            break;    
    }
})