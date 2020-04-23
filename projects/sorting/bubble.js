// Max Sayer
// http://max.lat
// Sorting Algorithms - Bubble Sort

function bubble(list) {
    let finished = false;
    let sorted = true;
    let index = 0;

    // Loop has to be an interval to avoid blocking and to draw to canvas
    const loop = setInterval(() => {
        if(finished) {
            clearInterval(loop);
        }

        if(index < list.length - 1) {
            if(check(list, index) === false) sorted = false;
            index++;
        } else {
            if(sorted) {
                finished = true;
            }
            index = 0;
        }

    }, 0)
}

function check(list, index) {
    let current = list[index];
    let next = list[index + 1];

    if(current.value > next.value) {
        swap(list, index);
        return false;
    }
}

function swap(list, index) {
    let x = list[index];
    list[index] = list[index + 1];
    list[index + 1] = x;
    incrementSwaps();
    drawWheel();
}
