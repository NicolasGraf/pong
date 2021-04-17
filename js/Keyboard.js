class Keyboard {
    constructor(playerOne) {
        this.currentPressed = null;
        this.playerOne = playerOne;
    }

    onKeyDown(e) {
        const c = e.keyCode;
        console.log(c);
        if (this.playerOne) {
            switch (c) {
                case 38: // Up
                    this.currentPressed = "UP";
                    break;
                case 40: // Down
                    this.currentPressed = "DOWN";
                    break;
                case 13: // Enter
                    this.currentPressed = "ENTER";
                    break;
                case 27: // ESC
                    this.currentPressed = "ESC";
                    break;
                case 70:
                    this.currentPressed = "F";
            }
        } else if (!this.playerOne) {
            switch (c) {
                case 87: // W
                    this.currentPressed = "UP";
                    break;
                case 83: // S
                    this.currentPressed = "DOWN";
                    break;
            }
        }
    }

    onKeyUp(e) {
        const c = e.keyCode;
        if (this.playerOne) {
            switch (c) {
                case 38: // Up
                    this.currentPressed =
                        this.currentPressed === "DOWN" ? "DOWN" : null;
                    break;
                case 40: // Down
                    this.currentPressed =
                        this.currentPressed === "UP" ? "UP" : null;
                    break;
            }
        } else if (!this.playerOne) {
            switch (c) {
                case 87: // W
                    this.currentPressed =
                        this.currentPressed === "DOWN" ? "DOWN" : null;
                    break;
                case 83: // S
                    this.currentPressed =
                        this.currentPressed === "UP" ? "UP" : null;
                    break;
            }
        }
    }
}

export { Keyboard };
