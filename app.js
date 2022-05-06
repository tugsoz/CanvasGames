let myGamePiece;
let myObstacle1top;
let myObstacle1bot;
let myObstacle2top;
let myObstacle2bot;
let up = false;

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keypress', function (e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (){
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    gameOver : function(){
        clearInterval(this.interval);
    }
}

function randomHeight(){
    let a = Math.floor(Math.random()*350);
    if(a < 100){
        a = 100;
    }
    return a;
}

function startGame() {
    myGameArea.start();
    myGamePiece = new Component(25,25, "#6667ab", 100, 250);
    myObstacle1top = new Component (100, randomHeight(), "#7CFC00", 800, 0);
    myObstacle1bot = new Component(100, 450-myObstacle1top.height, "#7CFC00", 800, 150+myObstacle1top.height);
    myObstacle2top = new Component (100, randomHeight(), "#7CFC00", 1250, 0);
    myObstacle2bot = new Component(100, 450-myObstacle2top.height, "#7CFC00", 1250, 150+myObstacle2top.height);
}
  
function Component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.bump = function(obstacle){
        let crash = true;
        if(this.y + this.height < obstacle.y ||
            this.y > obstacle.y + obstacle.height ||
            this.x + this.width < obstacle.x ||
            this.x > obstacle.x + obstacle.width){
                crash = false;
            }
        return crash;
    }

}

function updateGameArea() {
    if(myGamePiece.bump(myObstacle1bot) ||
        myGamePiece.bump(myObstacle2bot) ||
        myGamePiece.bump(myObstacle1top) ||
        myGamePiece.bump(myObstacle2top)){
            myGameArea.gameOver();
        }
    else{
        myGameArea.clear();
        if(myGameArea.key == 32 && myGamePiece.y > 20){
            myGamePiece.y -= 14;
        }
        if(myGamePiece.y <= 575){
            myGamePiece.y += 4;
        }
        myGamePiece.update();
        myObstacle1top.update();
        myObstacle1bot.update();
        myObstacle1top.x -=4;
        myObstacle1bot.x -=4;
        myObstacle2top.update();
        myObstacle2bot.update();
        myObstacle2top.x -=4;
        myObstacle2bot.x -=4;


        if(myObstacle1bot.x < -100){
            myObstacle1bot.x = 800;
            myObstacle1top.x = 800;
            myObstacle1top.height = randomHeight();
            myObstacle1bot.height = 450-myObstacle1top.height;
            myObstacle1bot.y = 150+myObstacle1top.height;
        }
        if(myObstacle2bot.x < -100){
            myObstacle2bot.x = 800;
            myObstacle2top.x = 800;
            myObstacle2top.height = randomHeight();
            myObstacle2bot.height = 450-myObstacle2top.height;
            myObstacle2bot.y = 150+myObstacle2top.height;
        }
    }
}