'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function bomberMan(r, c, n, grid) {
    // Write your code here
    let map = [];

    var repeat;

    if (n < 2) {
        repeat = 0;
    } else if (n % 2 === 0) {
        repeat = 2;
    } else if ((n + 1) % 4 === 0) {
        repeat = 3;
    } else if ((n - 1) % 4 === 0) {
        repeat = 5;
    }

    for (let i = 0; i < r; i++) {
        var tRow = grid[i].split('');
        var row = [];
        for (let j = 0; j < c; j++) {
            row.push(tRow[j] === 'O' ? 3 : -1);
        }
        map.push(row);
    }

    for (var i = 2; i <= repeat; i++) {
        for (var j = 0; j < r; j++) {
            for (var k = 0; k < c; k++) {
                if (i === map[j][k] && i % 2 === 1) {
                    map[j][k] = -1;
                    if (j !== 0 && map[j - 1][k] < i + 3 && map[j - 1][k] !== i) {
                        map[j - 1][k] = -1;
                    }
                    if (j !== r - 1 && map[j + 1][k] < i + 3 && map[j + 1][k] !== i) {
                        map[j + 1][k] = -1;
                    }
                    if (k !== 0 && map[j][k - 1] < i + 3 && map[j][k - 1] !== i) {
                        map[j][k - 1] = -1;
                    }
                    if (k !== c - 1 && map[j][k + 1] < i + 3 && map[j][k + 1] !== i) {
                        map[j][k + 1] = -1;
                    }
                } else if (i % 2 === 0 && map[j][k] === -1) {
                    map[j][k] = i + 3;
                }
            }
        }
    }

    for (var i = 0; i < r; i++) {
        var line = "";
        for (var j = 0; j < c; j++) {
            if (map[i][j] > -1) {
                line += "O";
            } else {
                line += ".";
            }
        }
        grid[i] = line;
    }

    return grid;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r = parseInt(firstMultipleInput[0], 10);

    const c = parseInt(firstMultipleInput[1], 10);

    const n = parseInt(firstMultipleInput[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = bomberMan(r, c, n, grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
