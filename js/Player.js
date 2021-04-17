class Player {
    constructor(game, left, isHuman, keyboard) {
        this.game = game;
        this.left = left;
        this.width = 15;
        this.height = 70;

        this.x = this.left ? 50 : canvas.width - 50;
        this.y = this.game.halfHeight - this.height / 2;

        this.isHuman = isHuman;
        this.keyboard = keyboard;

        this.score = 0;
        this.speed = isHuman ? 6 : 8;
        this.computerAccuracy = 25;
    }

    update(ball) {
        this.isHuman ? this.checkInput() : this.followBall(ball);
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkInput() {
        const key = this.keyboard.currentPressed;
        if (key === "DOWN") {
            this.moveDown();
        } else if (key === "UP") {
            this.moveUp();
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.speed;
        }
    }

    moveDown() {
        if (this.y <= this.game.height - this.height) {
            this.y += this.speed;
        }
    }

    followBall(ball) {
        if (this.y + this.height / 2 - ball.y - this.computerAccuracy > 0) {
            this.moveUp();
        } else if (
            this.y + this.height / 2 - ball.y + this.computerAccuracy <
            0
        ) {
            this.moveDown();
        }
    }

    resetPosition() {
        this.y = this.game.halfHeight - this.height / 2;
    }
}

export { Player };
