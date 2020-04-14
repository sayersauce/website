// Max Sayer
// http://max.lat
// Maze Generation using Recursive Backtracking

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const wallThickness = 1;
let cellSize;
let columns;
let rows;
let delay;

// Maze Generation

class Cell {
    constructor(index) {
        // Indexing begins at 0
        this.index = index;
        this.x = (this.index % columns) * cellSize;
        this.y = Math.floor(this.index / columns) * cellSize;

        // Walls are stored clockwise in format [up, right, down, left]
        this.walls = [true, true, true, true];

        // Neighbours are the surrounding cells' indexes
        this.neighbours = this.getNeighbours();

        // When the algorithm pushes this cell onto the stack, it becomes visited
        this.visited = false;
        
        // When this cell is at the top of the stack, it is the current cell
        this.current = false;
    }

    draw(ctx) {
        // Draw the Cell and its Walls
        if(this.current) {
            ctx.fillStyle = "darkviolet";
        } else if(this.visited) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(this.x, this.y, cellSize, cellSize);

        ctx.fillStyle = "black";

        if(this.walls[0]) {
            // Up
            ctx.fillRect(this.x, this.y, cellSize, wallThickness);
        }
        
        if(this.walls[1]) {
            // Right
            ctx.fillRect(this.x + cellSize - wallThickness, this.y, wallThickness, cellSize);
        }

        if(this.walls[2]) {
            // Down
            ctx.fillRect(this.x, this.y + cellSize - wallThickness, cellSize, wallThickness);
        }

        if(this.walls[3]) {
            // Left
            ctx.fillRect(this.x, this.y, wallThickness, cellSize);
        }
    }

    getNeighbours() {
        // Returns an array of the indexes of this Cell's neighbours
        const neighbours = [];

        // Above
        neighbours.push(this.index - columns);
        // Below
        neighbours.push(this.index + columns);
        // Right
        if(this.index % columns != columns - 1) {
            neighbours.push(this.index + 1);
        }
        // Left
        if(this.index % columns != 0) {
            neighbours.push(this.index - 1);
        }

        const neighboursInBounds = [];

        for(let i = 0; i < neighbours.length; i++) {
            if(neighbours[i] > -1 && neighbours[i] < columns * rows) {
                neighboursInBounds.push(neighbours[i]);
            }
        }

        return neighboursInBounds;
    }
}

function generateMaze(cells, start = 0) {
    // This function uses Recursive Backtracking to generate a maze
    const stack = [cells[start]];

    // setInterval() is used in place of a while loop, so that the canvas can update 
    const loop = setInterval(() => {
        if(stack.length == 0) {
            clearInterval(loop);

            // Draw final maze
            for(let c of cells) {
                c.draw(ctx);
            }

            // Allow maze to be downoaded
            addImageDownload();
        } else {
            // Get top of stack and set as visited
            let current = stack[stack.length - 1];
            current.visited = true;
            current.current = true;

            // Draw maze
            for(let c of cells) {
                c.draw(ctx);
            }
            
            // Get all unvisited neighbours
            let unvisited = [];
            for(let neighbour of current.neighbours) {
                if(cells[neighbour].visited == false) {
                    unvisited.push(cells[neighbour]);
                }
            }

            // If there are unvisited neighbour cells, choose a random one and push it to the stack
            if(unvisited.length > 0) {
                let newCell = unvisited[Math.floor(Math.random() * unvisited.length)];
                stack.push(newCell);

                // Remove walls between the two cells, the current cell and the new cell at the top of the stack
                if(current.index - columns == newCell.index) {
                    // New cell is above
                    current.walls[0] = false;
                    newCell.walls[2] = false;
                } else if(current.index + 1 == newCell.index) {
                    // New cell is right
                    current.walls[1] = false;
                    newCell.walls[3] = false;
                } else if(current.index + columns == newCell.index) {
                    // New cell is below
                    current.walls[2] = false;
                    newCell.walls[0] = false;
                } else {
                    // New cell is left
                    current.walls[3] = false;
                    newCell.walls[1] = false;
                }

                current.current = false;
            } else {
                // Otherwise move backwards by popping the top of the stack
                stack.pop();
                current.current = false;
            }
        }
    }, delay);
}

// Page handling

function getUserInput() {
    cellSize = Number(document.getElementById("cell-size").value);
    columns = Number(document.getElementById("columns").value);
    rows = Number(document.getElementById("rows").value);
    delay = Number(document.getElementById("delay").value);
    
    if(cellSize != null && columns != null && rows != null && delay != null) {
        init();
        let div = document.getElementById("input-div");
        div.parentNode.removeChild(div);
    }
}

function addImageDownload() {
    const download = document.createElement("a");
    download.href = canvas.toDataURL();
    download.download = "Maze.png";
    download.innerText = "Download Maze";
    document.getElementById("container").appendChild(download);
}

function init() {
    const cells = [];

    canvas.width = columns * cellSize;
    canvas.height = rows * cellSize;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < rows * columns; i++) {
        cells.push(new Cell(i));
    }

    generateMaze(cells);
}
