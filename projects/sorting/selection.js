// Max Sayer
// http://max.lat
// Sorting Algorithms - Selection Sort

function selection(list) {
    let i = 0;

    const loop = setInterval(() => {
        if(i > list.length - 2) {
            clearInterval(loop);
        }

        let minIndex = i;

        // Find minimum element's index
        for(let j = i+1; j < list.length; j++) {
            if(list[j].value < list[minIndex].value) {
                minIndex = j;
            }
        }

        // Swap minimum element with first element
        let temp = list[minIndex];
        list[minIndex] = list[i];
        list[i] = temp;
        incrementSwaps();
        drawWheel();

        i++;
    }, 0)
}
