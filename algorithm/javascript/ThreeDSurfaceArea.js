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
 * Complete the 'surfaceArea' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY A as parameter.
 */

function surfaceArea(A, H, W) {
    // Write your code here
    let sum = 0;

    for (var i = 0; i < H; i++) {
        for (var j = 0; j < W; j++) {
            sum += 2;
            var L = A[i][j];

            if (!i) {
                sum += L;
            } else if (L > A[i - 1][j]) {
                sum += L - A[i - 1][j];
            }
            if (i === H - 1) {
                sum += L;
            } else if (L > A[i + 1][j]) {
                sum += L - A[i + 1][j];
            }

            if (!j) {
                sum += L;
            } else if (L > A[i][j - 1]) {
                sum += L - A[i][j - 1];
            }
            if (j === W - 1) {
                sum += L;
            } else if (L > A[i][j + 1]) {
                sum += L - A[i][j + 1];
            }
        }
    }

    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const H = parseInt(firstMultipleInput[0], 10);

    const W = parseInt(firstMultipleInput[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    const result = surfaceArea(A, H, W);

    ws.write(result + '\n');

    ws.end();
}
