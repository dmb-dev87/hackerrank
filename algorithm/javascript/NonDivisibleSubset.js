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
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    // Write your code here
    const n = s.length;

    var factoryArray = Array(k).fill(0);

    for (let i = 0; i < n; i += 1) {
        factoryArray[s[i] % k] += 1;
    }

    let size = 0;

    for (let i = 0; i < Math.floor(k / 2) + 1; i += 1) {
        if (i == 0 || k == i * 2) {
            size += (factoryArray[i] != 0) ? 1 : 0;
        } else {
            size += Math.max(factoryArray[i], factoryArray[k - i]);
        }
    }

    return size;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
