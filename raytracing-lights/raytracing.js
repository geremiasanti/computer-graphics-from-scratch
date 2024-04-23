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
    
    toViewport(viewport, camera, canvasX, canvasY) {
        return [
            (canvasX * viewport.width / this.width) - camera.pos.x,
            (canvasY * viewport.height / this.height) - camera.pos.y,
            viewport.center.z - camera.pos.z
        ];
    } 
}

function rgb(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

function dotProduct(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]; 
}

// p1 and p2 are 2 different points along the ray
function intersectRaySphere(cameraPos, cameraToViewportVector, sphere) {
    let cameraToSphereCenterVector = [
        cameraPos.x - sphere.center.x,
        cameraPos.y - sphere.center.y,
        cameraPos.z - sphere.center.z
    ]

    let a = dotProduct(cameraToViewportVector, cameraToViewportVector); 
    let b = 2 * dotProduct(cameraToSphereCenterVector, cameraToViewportVector); 
    let c = dotProduct(cameraToSphereCenterVector, cameraToSphereCenterVector)
        - sphere.radius * sphere.radius; 

    let discriminant = b * b - 4 * a * c;
    if(discriminant < 0)
        return [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];

    return [
        (-b + Math.sqrt(discriminant)) / 2 * a, 
        (-b - Math.sqrt(discriminant)) / 2 * a, 
    ]; 
}

function traceRay(cameraPos, cameraToViewportVector, minT, maxT, spheres) {
    let closestT = Number.MAX_SAFE_INTEGER;
    let closestSphere = null;
    spheres.forEach((sphere) => {
        [t1, t2] = intersectRaySphere(cameraPos, cameraToViewportVector, sphere);
        if(minT < t1 && t1 < maxT && t1 < closestT) {
            closestT = t1;
            closestSphere = sphere;
        }
        if(minT < t2 && t2 < maxT && t2 < closestT) {
            closestT = t2;
            closestSphere = sphere;
        }
    });

    if(closestSphere == null) 
    // background
    return rgb(255, 255, 255);

    return closestSphere.color;
}

function render() {
    // canvas
    let canvas = new Canvas('canvas');

    // scene
    let camera = {
        pos: {
            x: 0,
            y: 0,
            z: 0
        }
    };
    let viewport = {
        // perpendicular to Z axis
        width: 1,
        height: 1,
        center: {
            x: 0,
            y: 0,
            z: 1
        }
    };
    let spheres = [
        {
            center: {
                x: 0,
                y: -1,
                z: 3
            },
            radius: 1,
            color: rgb(255, 0, 0) // red
        }, {
            center: {
                x: 2,
                y: 0,
                z: 4
            },
            radius: 1,
            color: rgb(0, 0, 255) // blue
        }, {
            center: {
                x: -1,
                y: 0,
                z: 4
            },
            radius: 1,
            color: rgb(0, 255, 0) // green
        }
    ];
;

    // rendering
    for(let canvasX = canvas.minX; canvasX <= canvas.maxX; canvasX++) {
        for(let canvasY = canvas.minY; canvasY <= canvas.maxY; canvasY++) {
            let cameraToViewportVector = canvas.toViewport(viewport, camera, canvasX, canvasY); 
            let color = traceRay(
                camera.pos, 
                cameraToViewportVector, 
                viewport.center.z,
                1000,
                spheres
            );
            canvas.putPixel(canvasX, canvasY, color);
        }
    }
}

render();
