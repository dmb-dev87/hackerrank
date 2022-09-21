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
 * Complete the 'absolutePermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 */

function absolutePermutation(n, k) {
    // Write your code here
    let ret;

    if (k == 0) {
        ret = Array(n).fill(0).map((e, i) => i + 1);
    }
    else if ((n / k) % 2 == 0) {
        ret = Array(n).fill(0).map((e, i) => i + 1);
        for (let i = 0; i < n; i += 2 * k) {
            let j = i + k;
            let L = ret.slice(i, i + k);
            let R = ret.slice(j, j + k);
            ret.splice(i, k, ...R);
            ret.splice(j, k, ...L);
        }
    }
    else {
        ret = [-1];
    }

    return ret;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const k = parseInt(firstMultipleInput[1], 10);

        const result = absolutePermutation(n, k);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
