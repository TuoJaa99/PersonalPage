//create the player 
const ball = document.createElement("img");
ball.src = "pics/moonazoomed.jpg"
ball.style.width = "40px";
ball.style.height = "40px";
ball.style.borderRadius = "50%";
ball.style.backgroundColor = "white";
ball.style.position = "absolute";
ball.style.left = "50%";
ball.style.top = "50%";
ball.style.transform = "translate(-50%, -50%)";
ball.style.display = "none"; 
document.body.appendChild(ball);

// Movement
let velocityY = 0;
let velocityX = 0;
let gravity = 0.6;
let jumpPower = -20;
let moveSpeed = 5;
let isJumping = false;
let ballX = window.innerWidth / 2;
let ballY = window.innerHeight / 2;
let gameActive = false; 


const cards = document.querySelectorAll(".card, .card2, .card3, .card4");


function resetGame() 
{
    let startCard = cards[Math.floor(Math.random() * cards.length)];
    let cardRect = startCard.getBoundingClientRect();
    ballX = cardRect.left + cardRect.width / 2 - 10;
    ballY = cardRect.top - 20;
    velocityY = 0;
    velocityX = 0;
    isJumping = false;
    gameActive = true;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    ball.style.display = "block";

    if (!gameLoopRunning) 
    {
        gameLoopRunning = true;
        gameLoop();
    }
}

let gameLoopRunning = false;


function gameLoop()
{
    if (!gameActive) 
    {
        gameLoopRunning = false;
        return;
    }

    velocityY += gravity;
    ballY += velocityY;
    ballX += velocityX;

    let ballRect = ball.getBoundingClientRect();
    let onCard = false;


    for (let card of cards) 
    {
        let cardRect = card.getBoundingClientRect();


        if (
            ballRect.bottom >= cardRect.top && 
            ballRect.top <= cardRect.bottom && 
            ballRect.right >= cardRect.left &&
            ballRect.left <= cardRect.right && 
            velocityY >= 0 
        ) {
            
            ballY = cardRect.top - ballRect.height;
            velocityY = 0; 
            isJumping = false;
            onCard = true;

            
            ball.style.transform = "scale(1.2, 0.8)"; 
            setTimeout(() => {
                ball.style.transform = "scale(1, 1)"; 
            }, 100); 
            break;
        }
    }

    
    if (!onCard && ballY + ballRect.height >= window.innerHeight)
    {
        gameActive = false;
        resetGame(); 
    }

    
    if (ballX <= 0) ballX = 0;
    if (ballX + ballRect.width >= window.innerWidth) ballX = window.innerWidth - ballRect.width;

    
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    
    requestAnimationFrame(gameLoop);
}


document.addEventListener("keydown", (e) => {
    if (e.code === "Space") 
    {
        if (!gameActive) 
        {
            resetGame(); 
        } 
        else if (!isJumping) 
        {
            velocityY = jumpPower; 
            isJumping = true;
        }
    }
    if (e.code === "ArrowLeft") 
    {
        velocityX = -moveSpeed;
    }
    if (e.code === "ArrowRight") 
    {
        velocityX = moveSpeed;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        velocityX = 0;
    }
});
