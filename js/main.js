import { Player } from "./Player.js";
import { Keyboard } from "./Keyboard.js";
import { Ball } from "./Ball.js";

const init = () => {
    const SETTINGS = {
        canvasWidth: 600,
        canvasHeight: 600,
        velocityX: 1.0,
        velocityY: 1.0,
        ballSpeed: 5,
        ballSize: 7.5,
        middlelineSize: 10,
    };

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = SETTINGS.canvasWidth;
    canvas.height = SETTINGS.canvasHeight;

    ctx.fillStyle = "white";

    const game = {
        canvas: canvas,
        ctx: ctx,
        width: SETTINGS.canvasWidth,
        height: SETTINGS.canvasHeight,
        halfWidth: SETTINGS.canvasWidth / 2,
        halfHeight: SETTINGS.canvasHeight / 2,
        offset: 5,
        paused: false,
    };

    const keyboard = new Keyboard();
    const player1 = new Player(game, true, keyboard);
    const player2 = new Player(game, false, keyboard);
    const ball = new Ball(game, SETTINGS);

    const drawMiddleline = () => {
        let y = 0,
            size = SETTINGS.middlelineSize;

        ctx.save();
        ctx.fillStyle = "#aaa";

        for (var i = 0; i < Math.ceil(game.halfHeight / size); i++) {
            ctx.fillRect(game.halfWidth, y, size, size);
            y += size * 2 + 10;
        }

        ctx.restore();
    };

    const rebound = (ball, player) => {
        var paddleY = ball.y - player.y - 50;
        ball.velY = paddleY * 0.02;
        ball.velX *= -1;
    };

    const reset = () => {
        player1.reset();
        player2.reset();
        ball.reset();
    };

    const scored = (playerScored) => {
        game.paused = true;
        playerScored.score += 1;
        reset();
    };

    const update = () => {
        if (!game.paused) {
            ball.update();
            player1.update();
            player2.update(ball);

            if (ball.collidedWith(player1)) {
                rebound(ball, player1);
            } else if (ball.collidedWith(player2)) {
                rebound(ball, player2);
            }

            if (ball.isOut() === "LEFT") {
                scored(player1);
            } else if (ball.isOut() === "RIGHT") {
                scored(player2);
            }
        }

        render();
    };

    const render = () => {
        ctx.clearRect(0, 0, game.width, game.height);
        drawMiddleline(ctx);
        ball.draw(ctx);
        player1.draw(ctx);
        player2.draw(ctx);
        window.requestAnimationFrame(update);
    };

    // Keyboard key down
    const onKeydown = (e) => {
        if (game.paused) {
            game.paused = false;
        }
        keyboard.onKeyDown(e);
    };

    // Keyboard key up
    const onKeyup = (e) => {
        keyboard.onKeyUp(e);
    };

    window.addEventListener("keydown", onKeydown, false);
    window.addEventListener("keyup", onKeyup, false);

    update();
};

init();
