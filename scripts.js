document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll('.box');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const boundaryX = screenWidth * 0.6; 
    let boxPositions = []; 

   
    function generateRandomSize() 
    {
        const width = Math.floor(Math.random() * 100) + 100; 
        const height = Math.floor(Math.random() * 100) + 100; 
        return { width, height };
    }

    
    function checkOverlap(newLeft, newBottom, newWidth, newHeight) 
    {
        for (let box of boxPositions) 
        {
            if (
                newLeft < box.left + box.width &&
                newLeft + newWidth > box.left &&
                newBottom < box.bottom + box.height &&
                newBottom + newHeight > box.bottom
            ) {
                return true; 
            }
        }
        return false; 
    }

    
    function getValidPosition(newWidth, newHeight) 
    {
        let attempts = 0;
        while (attempts < 100) { 
            const left = Math.floor(Math.random() * (boundaryX - newWidth)); 
            const bottom = Math.floor(Math.random() * (screenHeight - newHeight));

            if (!checkOverlap(left, bottom, newWidth, newHeight)) {
                return { left, bottom };
            }
            attempts++;
        }
        return { left: 0, bottom: 0 }; 
    }

    
    boxes.forEach((box) => {
        const { width, height } = generateRandomSize();
        const validPosition = getValidPosition(width, height);

        box.style.width = `${width}px`;
        box.style.height = `${height}px`;
        box.style.left = `${validPosition.left}px`;
        box.style.bottom = `${validPosition.bottom}px`;

       
        boxPositions.push({
            left: validPosition.left,
            bottom: validPosition.bottom,
            width: width,
            height: height
        });

        
        setTimeout(() => {
            box.style.opacity = "0.6";
            box.style.transform = "scale(1)";
        }, 100);
    });
});

