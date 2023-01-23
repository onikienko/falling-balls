import {ballRadiusMeters, g, interval, screenHeightInMeters, startXMeters, startYMeters} from './consts';


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
const startYPixels = transformYToCanvasY(metersToPixels(startYMeters));
const startXPixels = metersToPixels(startXMeters);


const ctx = canvas.getContext('2d');

let time = 0;
const getYMetersForTime = (time) => {
    return startYMeters - (g * (1 / 2) * Math.pow(time / 1000, 2));
};

const yMetersToCanvasY = (meters) => {
    const pixelsY = metersToPixels(meters);
    return transformYToCanvasY(pixelsY);
};

let animationInterval;
const updateCanvas = () => {
    const newYMeters = getYMetersForTime(time);
    const newCenterY = yMetersToCanvasY(newYMeters);
    console.log('time:', time, 'y meters', newYMeters, 'y pixels', newCenterY, 'start x pixels', startXPixels);
    ctx.clearRect(0, 0, windowWidth, windowHeight);
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(startXPixels, newCenterY, ballRadiusPixels, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    if (newCenterY + ballRadiusPixels >= windowHeight) {
        time = 0;
        return clearInterval(animationInterval);
    }
    time += interval;
};

document.querySelector('#launch-button').addEventListener('click', () => {
    time = 0;
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
        updateCanvas();
    }, interval);
});


