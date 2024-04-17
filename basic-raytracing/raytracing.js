class Canvas {
    constructor(canvasElementId) {
        this.htmlElement = document.getElementById(canvasElementId);
        this.width = this.htmlElement.width;
        this.height = this.htmlElement.height;
        this.context = this.htmlElement.getContext('2d');
    }
    
    putPixel(x, y) {
        this.context.fillRect(
            this.width/2 + x,
            this.height/2 - y,
            1,
            1
        );
    }
}

let canvas = new Canvas('canvas');
canvas.putPixel(0, 0);
