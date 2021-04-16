//Create Ball
class Ball {
    constructor(game, settings) {
        this.game = game;
        this.x = this.game.halfWidth;
        this.y = this.game.halfHeight;
        this.velX = settings.velocityX;
        this.velY = settings.velocityY;
        this.speed = settings.ballSpeed;
        this.size = settings.ballSize;
    }

    update() {
        console.log(this.x);
        this.x += this.velX * this.speed;
        this.y += this.velY * this.speed;

        if (this.y + this.size > this.game.height) {
            this.velY *= -1;
        } else if (this.y - this.size <= 0) {
            this.velY *= -1;
        }
    }

    isOut() {
        if (this.x < 0) {
            return "LEFT";
        } else if (this.x + this.size > this.game.width) {
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
            this.x < player.x + player.width / 2 &&
            this.y > player.y &&
            this.y < player.y + player.height
        ) {
            return true;
        } else if (
            !player.left &&
            this.x > player.x - player.width / 2 &&
            this.y > player.y &&
            this.y < player.y + player.height
        ) {
            return true;
        }
        return false;
    }
    reset() {
        this.x = this.game.halfWidth;
        this.y = this.game.halfWidth;
        this.velY = Math.floor(Math.random() * 20 - 10) / 10;
    }
}

export { Ball };
