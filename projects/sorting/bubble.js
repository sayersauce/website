// Max Sayer
// http://max.lat
// Sorting Algorithms - Bubble Sort

function bubble(list) {
    let sorted = false;

    const loop = setInterval(() => {
        if(sorted) {
            clearInterval(loop);
        }

        sorted = true;

        for(let i = 0; i < list.length - 1; i++) {
            let current = list[i];
            let next = list[i + 1];
    
            if(current.value > next.value) {
                swap(list, i);
                sorted = false;
            }
        }

    }, 0)
}

function swap(list, index) {
    let x = list[index];
    list[index] = list[index + 1];
    list[index + 1] = x;
    incrementSwaps();
    drawWheel();
}
