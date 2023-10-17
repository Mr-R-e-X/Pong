let userpaddle = document.getElementById('userpaddle');
let aipaddle = document.getElementById('aipaddle');
let ball = document.getElementById('ball');
let gameBox = document.getElementById('gameBox');
let upArrowPressed = false;
let downArrowPresed = false;

//user score
let userscore = document.getElementById('userscore');
let aiscore = document.getElementById('aiscore')

document.addEventListener("keydown", keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e){
    if(e.key== 'ArrowUp'){
        upArrowPressed = true;
        // console.log('arrow up pressed')
    }else if(e.key =='ArrowDown'){
        downArrowPresed = true;
        // console.log('dow arrow pressed');
    }
}

function keyUpHandler(e){
    if(e.key== 'ArrowUp'){
        upArrowPressed = false;
        // console.log('arrow up released')
    }else if(e.key =='ArrowDown'){
        downArrowPresed = false;
        // console.log('dow arrow released');
    }
}

// Ball Movement
let Vx = Math.floor(Math.random() * 4) + 3;
let Vy = Math.floor(Math.random() * 4) + 3;
let w = Math.sqrt(Math.pow(Vx,2) + Math.pow(Vy,2));


function reset(){
    ball.style.left = "50%";
    ball.style.top = "50%";
    let Vx = -2;
    let Vy = -4;
    let w = Math.sqrt(Math.pow(Vx,2) + Math.pow(Vy,2));
}

function checkcollision(activepaddle) {
    
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop + ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft + ball.offsetWidth;

    let paddletop = activepaddle.offsetTop;
    let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
    let padleleft = activepaddle.offsetLeft;
    let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;

    // console.log(balltop, ballbottom, ballleft, ballright);
    // console.log(paddletop, paddlebottom, padleleft, paddleright);
    if(ballbottom > paddletop && balltop < paddlebottom && 
        ballright > padleleft && ballleft < paddleright){
            // console.log("collision detected");
            return true;
    }else{
        return false;
    }
}


function gameloop(){
    if(ball.offsetLeft < 0){
        // alert("AI wins!!!!!!!!")
        aiscore.innerHTML = parseInt(aiscore.innerHTML) + 1;
        reset();
        // Vx = -Vx;
    }
    if(ball.offsetLeft > gameBox.offsetWidth - ball.offsetWidth){
        // alert("You Win!!!!!!!!")
        userscore = parseInt(userscore.innerHTML) + 1;
        reset();
        // Vx = -Vx
    }
    if(ball.offsetTop < 0){
        Vy = - Vy;
    }
    if(ball.offsetTop > gameBox.offsetHeight - ball.offsetHeight){
        Vy = -Vy;
    }

    /////////////////////////////////////////////////////////////////
    let paddle = ball.offsetLeft < gameBox.offsetWidth / 2 ? userpaddle : aipaddle;
    let ballcenterYaxis = ball.offsetTop + ball.offsetHeight/2;
    let paddlecenterYaxis = paddle.offsetTop + paddle.offsetHeight/2;
    
    let angle = 0;
    
    if(checkcollision (paddle)){
        if(paddle == userpaddle){
            if(ballcenterYaxis < paddlecenterYaxis){
                angle = -Math.PI/4;
            }else if(ballcenterYaxis > paddlecenterYaxis){
                angle = Math.PI/4;
            }else{
                angle = 0;
            }
        }else if(paddle == aipaddle){
            if(ballcenterYaxis < paddlecenterYaxis){
                angle = -3*Math.PI/4;
            }else if(ballcenterYaxis > paddlecenterYaxis){
                angle = 3*Math.PI/4;
            }else{
                angle = 0;
            }
        }
        w = w + 0.3;
        Vx = w * Math.cos(angle);
        Vy = w * Math.sin(angle);
    }

    let aidelay = 0.2;
    aipaddle.style.top = aipaddle.offsetTop + (ball.offsetTop - aipaddle.offsetTop - aipaddle.offsetHeight/2) * aidelay + "px"; 
    ////////////////////////////////////////////////////////////////
    ball.style.left = ball.offsetLeft + Vx + "px";
    ball.style.top = ball.offsetTop + Vy + "px"
    
    if(upArrowPressed && userpaddle.offsetTop > 40){
        userpaddle.style.top = userpaddle.offsetTop - 15 + "px";
    }
    if(downArrowPresed && userpaddle.offsetTop < gameBox.offsetHeight - userpaddle.offsetHeight +40){
        userpaddle.style.top = userpaddle.offsetTop + 15 + "px";
    }
    requestAnimationFrame(gameloop);
}
gameloop();