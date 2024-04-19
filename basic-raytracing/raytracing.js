function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

class Canvas {
    constructor(canvasElementId) {
        this.htmlElement = document.getElementById(canvasElementId);
        this.context = this.htmlElement.getContext('2d');

        this.width = this.htmlElement.width;
        this.height = this.htmlElement.height;
        this.minX = -this.width/2;
        this.maxX = this.width/2;
        this.minY = -this.height/2;
        this.maxY = this.height/2;
    }
    
    putPixel(x, y, rgb) {
        // color
        this.context.fillStyle = rgb;

        // position
        this.context.fillRect(
            this.width/2 + x,
            this.height/2 - y,
            1,
            1
        );
    }
    
    toViewport(viewport, canvasX, canvasY) {
        return [
            canvasX * viewport.width / this.width,
            canvasY * viewport.height/ this.height,
            viewport.pos.z
        ] 
    } 
}

function render() {
    let canvas = new Canvas('canvas');

    let camera = {
        pos: {
            X: 0,
            y: 0,
            z: 0
        }
    };

    let viewport = {
        // perpendicular to Z axis
        width: 1,
        height: 1,
        pos: {
            z: 1
        }
    };

    for(let canvasX = canvas.minX; canvasX <= canvas.maxX; canvasX++) {
        for(let canvasY = canvas.minY; canvasY <= canvas.maxY; canvasY++) {
            let viewportPos = canvas.toViewport(viewport, canvasX, canvasY); 
            console.log(`${canvasX}, ${canvasY} | ${viewportPos}`);
        }
    }
}

render();
