import { Player } from "./Player.js";
import { Keyboard } from "./Keyboard.js";
import { Ball } from "./Ball.js";

const keyboard1 = new Keyboard(true);
const keyboard2 = new Keyboard(false);
const UI = document.getElementById("ui");

let game = {};

const onKeydown = (e) => {
    keyboard1.onKeyDown(e);
    keyboard2.onKeyDown(e);

    if (UI.classList.contains("visible")) {
        const buttons = document.querySelectorAll("#ui button");
        const selectedButton = document.querySelector("#ui button.selected");
        switch (keyboard1.currentPressed) {
            case "UP":
                buttons.item(0).classList.add("selected");
                buttons.item(1).classList.remove("selected");
                break;
            case "DOWN":
                buttons.item(1).classList.add("selected");
                buttons.item(0).classList.remove("selected");
                break;
            case "ENTER":
                selectedButton.click();
                break;
        }
    }

    if (keyboard1.currentPressed === "ESC") {
        game.state = "INITIAL";
        UI.classList.add("visible");
    } else if (keyboard1.currentPressed === "F") {
        //document.querySelector("body").classList.toggle("fullscreen");
        //game.toggleFullScreen();
    }
};

const onKeyup = (e) => {
    keyboard1.onKeyUp(e);
    keyboard2.onKeyUp(e);
};

window.addEventListener("keydown", onKeydown, false);
window.addEventListener("keyup", onKeyup, false);

document.querySelectorAll("#ui button").forEach((button) => {
    button.addEventListener("click", (e) => {
        const button = e.currentTarget;
        if (button.classList.contains("selected")) {
            const isMultiplayer = button.value === "player";
            game = init(isMultiplayer, keyboard1, keyboard2);
            game.state = "RUNNING";
            UI.classList.remove("visible");
        }
    });
});

const init = (isMultiplayer, keyboard1, keyboard2, fullscreen) => {
    const SETTINGS = {
        canvasWidth: 720,
        canvasHeight: 600,
        velocityX: 1.0,
        velocityY: 1.0,
        ballSpeed: 5,
        ballSize: 10,
        middlelineSize: 10,
    };

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

    const drawScore = (player) => {
        ctx.font = "50px VT323";
        let posX = player.left
            ? game.halfWidth / 2
            : game.width - game.halfWidth / 2;
        ctx.fillText(player.score.toString(), posX, 50);
    };

    // TODO
    const toggleFullScreen = () => {};

    const reset = () => {
        player1.resetPosition();
        player2.resetPosition();
        ball.reset();
    };

    const scored = (playerScored) => {
        playerScored.score += 1;
        reset();
    };

    const update = () => {
        if (game.state === "RUNNING") {
            ball.update(player1, player2);
            player1.update();
            player2.update(ball);

            if (ball.isOut() === "RIGHT") {
                scored(player1);
            } else if (ball.isOut() === "LEFT") {
                scored(player2);
            }
        }

        render();
    };

    const render = () => {
        ctx.clearRect(0, 0, game.width, game.height);
        if (game.state !== "INITIAL") {
            ball.draw(ctx);
            player1.draw(ctx);
            player2.draw(ctx);
            drawMiddleline(ctx);
            drawScore(player1);
            drawScore(player2);
        }

        window.requestAnimationFrame(update);
    };

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = SETTINGS.canvasWidth;
    canvas.height = SETTINGS.canvasHeight;

    ctx.fillStyle = "white";

    const game = {
        width: SETTINGS.canvasWidth,
        height: SETTINGS.canvasHeight,
        halfWidth: SETTINGS.canvasWidth / 2,
        halfHeight: SETTINGS.canvasHeight / 2,
        offset: 0,
        state: "RUNNING",
        isMultiplayer: isMultiplayer,
    };

    const player1 = new Player(game, true, true, keyboard1);
    const player2 = new Player(game, false, isMultiplayer, keyboard2);
    const ball = new Ball(game, SETTINGS);

    update();
    return game;
};
