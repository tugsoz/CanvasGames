let myGamePiece;
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
    }
}

function startGame() {
    myGameArea.start();
    myGamePiece = new component(50,50,"#6667ab", 50, 250);
}
  
function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    // this.speed = 3;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    // this.newPos = function() {
    //     this.y += this.speed;
    //   }
}

function updateGameArea() {
    myGameArea.clear();
    if(myGameArea.key == 32 && myGamePiece.y > 20){
        myGamePiece.y -= 20;
    }
    if(myGamePiece.y <= 550){
        myGamePiece.y += 2;
    }
    myGamePiece.update();
}









// function ascend(){
//     if(up){
//         myGamePiece.y += myGamePiece.speed;
//     }
// }

// document.onkeydown = function (space){
//     if(space.keyCode == 32){
//         up = true;
//     }
// }

// document.onkeyup = function (space){
//     if(space.keyCode == 32){
//         up = false;
//     }
// }

// function clearCanvas(){
//     ctx.clearRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height);
// }

// function drawBird(){
//     let x = myGamePiece.x;
//     let y = myGamePiece.y;
//     ctx.beginPath();
//     ctx.moveTo(x,y);
//     ctx.fillRect(50,50,"#6667ab", 50, 250)
// }

// setInterval (update, 2000);

// function update() {
// 	clearCanvas();
// 	drawBird();
//     ascend();
// }