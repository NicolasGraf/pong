//Create Ball
class Ball {
    constructor(game, settings) {
        this.game = game;
        this.x = this.game.halfWidth;
        this.y = this.game.halfHeight;
        this.velX = settings.velocityX;
        this.velY = settings.velocityY;
        this.playingSpeed = settings.ballSpeed;
        this.speed = 3; // starting speed
        this.size = settings.ballSize;
    }

    update(player1, player2) {
        this.x += this.velX * this.speed;
        this.y += this.velY * this.speed;

        // bounce off the wall
        if (this.y <= 0 || this.y >= this.game.height - this.size) {
            this.velY *= -1;
        } else if (this.collidedWith(player1)) {
            this.rebound(player1);
        } else if (this.collidedWith(player2)) {
            this.rebound(player2);
        }
    }

    isOut() {
        if (this.x <= 0) {
            return "LEFT";
        } else if (this.x > this.game.width - this.size) {
            return "RIGHT";
        } else {
            return null;
        }
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    collidedWith(player) {
        if (
            player.left &&
            this.x < player.x + player.width &&
            this.x > player.x &&
            this.y >= player.y - this.size &&
            this.y <= player.y + player.height
        ) {
            return true;
        } else if (
            !player.left &&
            this.x > player.x - this.size &&
            this.x < player.x + player.width &&
            this.y >= player.y - this.size &&
            this.y <= player.y + player.height
        ) {
            return true;
        }
        return false;
    }

    rebound(player) {
        var paddleY = this.y - player.y - this.size / 2 - player.height / 2;
        this.velY = paddleY * 0.05;
        this.velX *= -1;
        this.speed = this.playingSpeed;
    }

    reset() {
        this.x = this.game.halfWidth;
        this.y = this.game.halfWidth;
        this.velY = Math.floor(Math.random() * 20 - 10) / 20;
        this.speed = 3;
    }
}

export { Ball };
