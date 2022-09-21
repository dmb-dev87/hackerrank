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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
    // Write your code here
    var left = c_q - 1;
    var right = n - c_q;
    var above = n - r_q;
    var below = r_q - 1;
    var above_left = Math.min(left, above);
    var above_right = Math.min(right, above);
    var below_left = Math.min(left, below);
    var below_right = Math.min(right, below);

    for (var i = 0; i < k; i++) {
        if (obstacles[i][0] === r_q) {
            if (obstacles[i][1] < c_q) {
                left = Math.min(left, c_q - obstacles[i][1] - 1);
            } else {
                right = Math.min(right, obstacles[i][1] - c_q - 1);
            }
        } else if (obstacles[i][1] === c_q) {
            if (obstacles[i][0] < r_q) {
                below = Math.min(below, r_q - obstacles[i][0] - 1);
            } else {
                above = Math.min(above, obstacles[i][0] - r_q - 1);
            }
        } else if (obstacles[i][0] - obstacles[i][1] === r_q - c_q) {
            if (obstacles[i][1] < c_q) {
                below_left = Math.min(below_left, c_q - obstacles[i][1] - 1);
            } else {
                above_right = Math.min(above_right, obstacles[i][1] - c_q - 1);
            }
        } else if (obstacles[i][0] + obstacles[i][1] === r_q + c_q) {
            if (obstacles[i][1] < c_q) {
                above_left = Math.min(above_left, c_q - obstacles[i][1] - 1);
            } else {
                below_right = Math.min(below_right, obstacles[i][1] - c_q - 1);
            }
        }
    }

    return left + right + below + above + below_right + below_left + above_left + above_right;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r_q = parseInt(secondMultipleInput[0], 10);

    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
