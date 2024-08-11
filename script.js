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
let brush = "black";
let size = 3;

canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Adjust the mouse coordinates
    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;

    // Start a new path and move to the starting position
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    // Set lastX and lastY to the starting position
    [lastX, lastY] = [offsetX, offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Adjust the mouse coordinates
    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;

    ctx.strokeStyle = brush;  // Corrected typo here
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = size;

    ctx.lineTo(offsetX, offsetY);  // Draw a line to the new position
    ctx.stroke();

    [lastX, lastY] = [offsetX, offsetY];  // Update lastX, lastY with adjusted coordinates
});

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