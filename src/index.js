import {ballRadiusMeters, g, screenHeightInMeters, startXMeters, startYMeters} from './consts';


const canvas = document.getElementById('canvas');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
canvas.width = windowWidth;
canvas.height = windowHeight;
const metersToPixels = (meters) => {
    return meters * windowHeight / screenHeightInMeters;
};
const transformYToCanvasY = (y) => {
    return canvas.height - y;
};

const ballRadiusPixels = metersToPixels(ballRadiusMeters);
const startXPixels = metersToPixels(startXMeters);


const ctx = canvas.getContext('2d');

const getYMetersForTime = (time) => {
    return startYMeters - (g * (1 / 2) * Math.pow(time / 1000, 2));
};

const yMetersToCanvasY = (meters) => {
    const pixelsY = metersToPixels(meters);
    return transformYToCanvasY(pixelsY);
};

let start;

const loop = (timestamp) => {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;
    let newYMeters = getYMetersForTime(elapsed);
    let newCenterY = yMetersToCanvasY(newYMeters);
    if (newCenterY + ballRadiusPixels >= windowHeight) {
        newCenterY = windowHeight - ballRadiusPixels;
    }
    ctx.clearRect(0, 0, windowWidth, windowHeight);
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(startXPixels, newCenterY, ballRadiusPixels, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    if (newCenterY + ballRadiusPixels < windowHeight) {
        requestAnimationFrame(loop);
    }
};

document.querySelector('#launch-button').addEventListener('click', () => {
    requestAnimationFrame(loop);
});


