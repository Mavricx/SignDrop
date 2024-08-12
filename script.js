let brush = "black";
let size = 3;
const panel = document.getElementById('scale').children;
const tips = document.querySelectorAll('#point');
console.log(tips[3].className[3]);

for (let i = 0; i < panel.length; i++) {
    panel[i].addEventListener('click', () => {

        brush = panel[i].style.backgroundColor;
        tips.forEach((tip) => { tip.style.backgroundColor = brush });
    })
}

tips.forEach(function (tip) {
    tip.addEventListener('click', function () {
        size = parseInt(this.className[3]);
        console.log(size);
    })
});

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height);

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.putImageData(imageDate, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(x, y) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    [lastX, lastY] = [x, y];
}

function draw(x, y) {
    if (!isDrawing) return;

    ctx.strokeStyle = brush;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = size;

    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

function endDrawing() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', function (e) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const offsetY = (e.clientY - rect.top) * (canvas.height / rect.height);
    startDrawing(offsetX, offsetY);
});

canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const offsetY = (e.clientY - rect.top) * (canvas.height / rect.height);
    draw(offsetX, offsetY);
});

canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);

// Touch events for touchscreens
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const offsetX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const offsetY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    startDrawing(offsetX, offsetY);
});

canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const offsetX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const offsetY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    draw(offsetX, offsetY);
});

canvas.addEventListener('touchend', endDrawing);

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('download').addEventListener('click', () => {
    canvas.toBlob((blob) => {
        saveAs(blob, "signature.png");
    });
});




//some basic function calls in canvas api to remember

// ctx.strokeStyle = '#010101';//this means ink color
// ctx.lineJoin = 'round';//this means how the lines join
// ctx.lineCap = 'round';//this means how the line ends
// ctx.lineWidth = 100;//this means the width of the line
// ctx.globalCompositeOperation = 'multiply';//this means how the lines overlap
// ctx.globalAlpha = 0.5;//this means how transparent the lines are
// ctx.beginPath();//this means start drawing
// ctx.moveTo(x, y);//this means where to start drawing
// ctx.lineTo(x, y);//this means where to end drawing
// ctx.stroke();//this means draw the line
// ctx.closePath();//this means stop drawing
// ctx.clearRect(0, 0, canvas.width, canvas.height);//this means clear the canvas
// ctx.fillRect(x, y, width, height);//this means draw a rectangle