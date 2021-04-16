class Keyboard {
    constructor() {
        this.currentPressed = null;
    }

    onKeyDown(e) {
        const c = e.keyCode;
        switch (c) {
            case 38: // Up
            case 87: // W
                this.currentPressed = "UP";
                break;
            case 40: // Down
            case 83: // S
                this.currentPressed = "DOWN";
                break;
        }
    }

    onKeyUp(e) {
        const c = e.keyCode;
        switch (c) {
            case 38: // Up
            case 87: // W
                this.currentPressed =
                    this.currentPressed === "DOWN" ? "DOWN" : null;
                break;
            case 40: // Down
            case 83: // S
                this.currentPressed =
                    this.currentPressed === "UP" ? "UP" : null;
                break;
        }
    }
}

export { Keyboard };
