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

canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;



    ctx.stokeStyle = "#010101";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

});

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('download').addEventListener('click', () => {
    canvas.toBlob((blob) => {
        saveAs(blob, "signature.png");
    });
})





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