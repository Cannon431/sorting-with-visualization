function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function draw(colors, row) {
    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i].color;
        ctx.fillRect(width * i, row * height, width, height);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sortingNow(table) {
    for (let i = 0; i < table.length; i++) {
        if (!table[i].sorted) {
            return true;
        }
    }

    return false;
}

let sortAlgorithms = {
    async bubble(array, row) {
        array.sorted = false;

        let colors = array.colors;
        for (let i = 0; i < colors.length; i++) {
            for (let j = 0; j < colors.length - i - 1; j++) {
                if (colors[j].value > colors[j + 1].value) {
                    [colors[j], colors[j + 1]] = [colors[j + 1], colors[j]];

                    draw(colors, row);
                    await sleep(sleepMilliseconds);
                }
            }
        }

        array.sorted = true;
    },

    async cocktail(array, row) {
        array.sorted = false;

        let colors = array.colors;

        let left = 0, right = colors.length - 1;
        while (left < right) {
            for (let i = left; i < right; i++) {
                if (colors[i].value > colors[i + 1].value) {
                    [colors[i], colors[i + 1]] = [colors[i + 1], colors[i]];

                    draw(colors, row);
                    await sleep(sleepMilliseconds);
                }
            }

            right--;

            for (let i = right; i > left; i--) {
                if (colors[i].value < colors[i - 1].value) {
                    [colors[i], colors[i - 1]] = [colors[i - 1], colors[i]];

                    draw(colors, row);
                    await sleep(sleepMilliseconds);
                }
            }

            left++;
        }

        array.sorted = true;
    },

    async selection(array, row) {
        array.sorted = false;

        let colors = array.colors;
        for (let i = 0; i < colors.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < colors.length; j++) {
                if (colors[j].value < colors[minIndex].value) {
                    minIndex = j;
                }
            }

            [colors[i], colors[minIndex]] = [colors[minIndex], colors[i]];

            draw(colors, row);
            await sleep(sleepMilliseconds);
        }

        array.sorted = true;
    },

    async selection2(array, row) {
        array.sorted = false;

        let colors = array.colors;
        for (let i = 0; i < colors.length - 1; i++) {
            for (let j = i + 1; j < colors.length; j++) {
                if (colors[i].value > colors[j].value) {
                    [colors[i], colors[j]] = [colors[j], colors[i]];

                    draw(colors, row);
                    await sleep(sleepMilliseconds);
                }
            }
        }

        array.sorted = true;
    },

    async insertion(array, row) {
        array.sorted = false;

        let colors = array.colors;
        for (let i = 1; i < colors.length; i++) {
            let j = i - 1, temp = colors[i];
            while (j >= 0 && colors[j].value > temp.value) {
                colors[j + 1] = colors[j];
                j--;

                draw(colors, row);
                await sleep(sleepMilliseconds);
            }

            colors[j + 1] = temp;

            draw(colors, row);
            await sleep(sleepMilliseconds);
        }

        array.sorted = true;
    }
};

let colors = [
    {color: '#EE1013', value: 1},
    {color: '#FC1A1C', value: 2},
    {color: '#F82819', value: 3},
    {color: '#F92F1C', value: 4},
    {color: '#F84A2F', value: 5},
    {color: '#F96537', value: 6},
    {color: '#F69536', value: 7},
    {color: '#F8B02A', value: 8},
    {color: '#FBCF24', value: 9},
    {color: '#F8EA1C', value: 10},
    {color: '#DDE91D', value: 11},
    {color: '#A8D020', value: 12},
    {color: '#81C729', value: 13},
    {color: '#5AB333', value: 14},
    {color: '#359C29', value: 15},
    {color: '#187A47', value: 16},
    {color: '#145460', value: 17},
    {color: '#114864', value: 18},
    {color: '#11316C', value: 19},
    {color: '#230C7E', value: 20},
    {color: '#420D79', value: 21},
    {color: '#4E087D', value: 22},
    {color: '#640A7B', value: 23},
    {color: '#720B80', value: 24},
    {color: '#8F0982', value: 25},
    {color: '#780F73', value: 26},
    {color: '#6D0D78', value: 27},
    {color: '#600E7C', value: 28},
];

let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');

const width = 25, height = 25, rows = 20,
    sleepMilliseconds = 50;

let table = [];
for (let i = 0; i < rows; i++) {
    table.push({colors: colors.slice(), sorted: true});
    draw(table[i].colors, i);
}

document.querySelector('#shuffle').addEventListener('click', () => {
    if (sortingNow(table)) {
        return;
    }

    for (let i = 0; i < table.length; i++) {
        shuffle(table[i].colors);
        draw(table[i].colors, i);
    }
});

document.querySelector('#sort').addEventListener('click', () => {
    if (sortingNow(table)) {
        return;
    }

    let algorithms = document.querySelector('#algorithms');
    for (let i = 0; i < table.length; i++) {
        sortAlgorithms[algorithms.options[algorithms.selectedIndex].value](table[i], i);
    }
});
