let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

for(let x = 0; x < 800; x+=100){
    for(let y = 0; y < 800; y+=100){
        if(x % 200 == 0 && y % 200 == 0 ||
            x % 200 == 100 && y % 200 == 100){
            ctx.fillRect(x,y,100,100);
            ctx.fillStyle = "black"
        }
    }
}
