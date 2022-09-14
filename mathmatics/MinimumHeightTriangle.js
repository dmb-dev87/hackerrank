'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'lowestTriangle' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER trianglebase
 *  2. INTEGER area
 */

function lowestTriangle(trianglebase, area) {
    // Write your code here
    return Math.ceil(area * 2 / trianglebase);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const trianglebase = parseInt(firstMultipleInput[0], 10);

    const area = parseInt(firstMultipleInput[1], 10);

    const height = lowestTriangle(trianglebase, area);

    ws.write(height + '\n');

    ws.end();
}
