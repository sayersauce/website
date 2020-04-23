// Max Sayer
// http://max.lat
// Sorting Algorithms

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cx = canvas.width / 2;
const cy = canvas.width / 2;
const dx = canvas.width / 2;
const dy = canvas.width / 2;
let bars = [];

class Bar {
    constructor(value, style) {
        // Sorting is based on the bar's value
        this.value = value;
        this.style = style;
    }

    draw(position) {
        // Angle is determined by position in the list, multiple angles used to make a cone shape
        const angles = [position - 0.4, position - 0.3, position - 0.2, position - 0.1, position, position + 0.1, position + 0.2, position + 0.4, position + 0.4];

        for(let angle of angles) {
            let rad = angle * 360/bars.length * 2 * Math.PI /360;
            ctx.strokeStyle = this.style;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + dx * Math.cos(rad), cy + dy * Math.sin(rad));
            ctx.stroke();
        }
    }
}

function incrementSwaps() {
    const swaps = document.getElementById("swaps");
    swaps.innerText = parseInt(swaps.innerText) + 1;
}

function shuffle() {
    const length = bars.length;
    const tempBars = bars;
    bars = [];
    for(let i = 0; i < length; i += 1) {
        const index = Math.floor(Math.random() * tempBars.length);
        const bar = tempBars[index];
        bars.push(bar);
        tempBars.splice(index, 1);
    }

    drawWheel();
}

function drawWheel() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < bars.length; i++) {
        bars[i].draw(i);
    }
}

(function init() {
    // Make and draw Bars
    bars = [];
    const numberOfBars = 360;

    for(let i = 0; i < numberOfBars; i += 1) {
        const bar = new Bar(i, "hsla(" + (i * 360/numberOfBars) + ", 100%, 50%, 1.0)");
        bars.push(bar);
    }

    drawWheel();
})();
