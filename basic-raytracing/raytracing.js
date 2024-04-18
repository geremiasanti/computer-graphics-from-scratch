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
}

function render() {
    let canvas = new Canvas('canvas');
    for(let x = canvas.minX; x <= canvas.maxX; x++) {
        for(let y = canvas.minY; y <= canvas.maxY; y++) {
            // quadrants
            if(x == 0 || y == 0) 
                canvas.putPixel(x, y, rgb(0, 0, 0));

            // square in positive quadrant
            if(0 < x && x < canvas.width/7 && 0 < y && y < canvas.height/7)
                canvas.putPixel(x, y, rgb(255, 0, 0));
        }
    }
}


render();
