function init(){
  var canvas = document.getElementById("myCanvas"),
      ctx = canvas.getContext("2d"),
      cWidth = canvas.width,
      cHeight = canvas.height,
      cHalfX = cWidth/2,
      cHalfY = cHeight/2,
      offset = 5,
      player1,
      player2,
      ball,
      keys,
      paused = false;


  //Create Ball
  ball = {
    x: cHalfX,
    y: cHalfY,
    velX: 1.0,
    velY: 1.0,
    speed: 5,
    size: 7.5,

    update: function(){
      this.x += this.velX * this.speed;
      this.y += this.velY * this.speed;

      if(this.y + this.size > cHeight){
        this.velY *= -1;
      } else if(this.y - this.size <= 0){
        this.velY *= -1;
      }
      if(this.x < 0){
        scored(player1);
      } else if(this.x + this.size > cWidth){
        scored(player2);
      }
    },
    draw: function(ctx){
      ctx.fillRect(this.x, this.y, this.size, this.size);
    },
    collidedWith(player){
        if(player.human && this.x < player.x + player.width/2 && this.y > player.y && this.y < player.y+player.height){
          return true;
        } else if(!player.human && this.x > player.x - player.width/2 && this.y > player.y && this.y < player.y+player.height){
          return true;
        } else {
          return false;
        }
    },
    reset: function(){
      this.x = cHalfX;
      this.y = cHalfY;
      this.velY = Math.floor((Math.random() * 20) -10)/ 10;
    }
  };
  //Draw the line
  middleLine = {
    size: 10,
    x: cHalfX,
    y: 0,
    color: "#aaa",
    draw: function(){
      ctx.save();
      ctx.fillStyle = this.color;
      for(var i = 0; i<Math.ceil(cHeight/this.size); i++){
        ctx.fillRect(this.x, this.y, this.size, this.size);
        this.y += this.size*2 + 10;
      }
      ctx.restore();
      this.y = 0;
    }
  };

  //Player Class
  function Player(isHuman){
    this.init = function(){
      this.human = isHuman;
      this.height = 70;
      this.width = 10;
      this.score = 0;
      if(this.human){
        this.x = 50;
        this.y = cHalfY-this.height/2;
        this.speed = 6;
      } else {
        this.x = canvas.width - 50;
        this.y = cHalfY-this.height/2;
        this.speed = 8;
      }
    };
    this.update = function(ball){
        isHuman ? this.checkInput() : this.play(ball);
    };
    this.draw = function(ctx){
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.checkInput = function(){
      if(keys.down && this.y <= cHeight - this.height - offset){
        this.y += this.speed;
      } else if(keys.up && this.y >= 0 + offset){
        this.y -= this.speed;
      }
    };
    this.play = function(ball){
      if(this.y+this.height/2 - ball.y > 0 && this.y >= 0){
        this.y -= this.speed;
      } else if(this.y+this.height/2 - ball.y < 0 && this.y <= cHeight - this.height){
        this.y += this.speed;
      }
    };
    this.reset = function(){
      this.y = cHalfY-this.height/2;
    }
  };

  ctx.fillStyle = "white";

  function update(){
    if(!paused){
      ball.update();
      player1.update();
      player2.update(ball);

      if(ball.collidedWith(player1)){
        rebound(ball, player1);
      } else if(ball.collidedWith(player2)){
        rebound(ball, player2);
      }
    }
    render();
  }

  function rebound(ball, player){
    var paddleY = (ball.y - player.y)-50;
    ball.velY = paddleY * 0.02;
    ball.velX *= -1;
  }

  function render(){
    clear();
    middleLine.draw(ctx);
    ball.draw(ctx);
    player1.draw(ctx);
    player2.draw(ctx);
    window.requestAnimationFrame(update);
  }

  function clear(){
    ctx.clearRect(0, 0, cWidth, cHeight);
  }

  function debug(){
    //console.log(middleLine);
  }

  // Keyboard key down
  function onKeydown(e) {
    if(paused){
      paused = false;
    }
  	keys.onKeyDown(e);
  }
  // Keyboard key up
  function onKeyup(e) {
  		keys.onKeyUp(e);
  }

  function reset(){
    player1.reset();
    player2.reset();
    ball.reset();
  }

  function scored(playerScored){
    paused = true;
    playerScored.score += 1;
    reset();
  }

  player1 = new Player(true);
  player2 = new Player(false);
  player1.init();
  player2.init();
  keys = new Keys();
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);

  update();
  window.setInterval(debug, 500);
}
