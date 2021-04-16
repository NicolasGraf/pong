class Player {
    constructor(game, isHuman, keyboard) {
        this.left = isHuman;
        this.keyboard = keyboard;
        this.game = game;
        this.height = 70;
        this.width = 10;
        this.score = 0;

        if (this.left) {
            this.x = 50;
            this.y = this.game.halfHeight - this.height / 2;
            this.speed = 6;
        } else {
            this.x = canvas.width - 50;
            this.y = this.game.halfHeight - this.height / 2;
            this.speed = 8;
        }
    }

    update(ball) {
        this.left ? this.checkInput() : this.followBall(ball);
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkInput() {
        if (
            this.keyboard.currentPressed === "DOWN" &&
            this.y <= this.game.height - this.height - this.game.offset
        ) {
            this.y += this.speed;
        } else if (
            this.keyboard.currentPressed === "UP" &&
            this.y >= 0 + this.game.offset
        ) {
            this.y -= this.speed;
        }
    }

    followBall(ball) {
        if (this.y + this.height / 2 - ball.y > 0 && this.y >= 0) {
            this.y -= this.speed;
        } else if (
            this.y + this.height / 2 - ball.y < 0 &&
            this.y <= this.game.height - this.height
        ) {
            this.y += this.speed;
        }
    }

    reset() {
        this.y = this.game.halfHeight - this.height / 2;
    }
}

export { Player };
