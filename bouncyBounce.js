const ball = document.getElementById("ball");
const letters = document.querySelectorAll("#intro span");

let x = window.innerWidth * 0.6; 
let y = 100; 
let angle = 0;

let xSpeed = 3;
let ySpeed = 2;

const lineX = window.innerWidth * 0.6; 

function animate() 
{
    x += xSpeed;
    y += ySpeed;
    angle += 5;

    
    if (x + ball.offsetWidth >= window.innerWidth) 
    {
        xSpeed = -xSpeed;
    }

    
    if (x <= lineX) 
    {
        xSpeed = -xSpeed;
    }

    
    if (y <= 0 || y + ball.offsetHeight >= window.innerHeight)
    {
        ySpeed = -ySpeed;
    }

    
    letters.forEach(letter => {
        if (!letter.classList.contains("broken")) {
            let rect = letter.getBoundingClientRect();
            let ballRect = ball.getBoundingClientRect();

            if (
                ballRect.left < rect.right &&
                ballRect.right > rect.left &&
                ballRect.top < rect.bottom &&
                ballRect.bottom > rect.top
            ) {
                letter.classList.add("broken");
                letter.style.opacity = "0"; // Hide letter
                letter.style.transform = "scale(0.5) rotate(30deg)";
            }
        }
    });

    ball.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    requestAnimationFrame(animate);
}

animate();

