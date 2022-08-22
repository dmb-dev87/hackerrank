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
 * Complete the 'formingMagicSquare' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY s as parameter.
 */

function formingMagicSquare(s) {
    // Write your code here   
    var perm = [[[8, 1, 6], [3, 5, 7], [4, 9, 2]],
                [[6, 1, 8], [7, 5, 3], [2, 9, 4]],
                [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
                [[2, 9, 4], [7, 5, 3], [6, 1, 8]],
                [[8, 3, 4], [1, 5, 9], [6, 7, 2]],
                [[4, 3, 8], [9, 5, 1], [2, 7, 6]],
                [[6, 7, 2], [1, 5, 9], [8, 3, 4]],
                [[2, 7, 6], [9, 5, 1], [4, 3, 8]]];
                
    var min = 1000;
    
    for (var i = 0; i < 8; i++) {
        var sum = 0;
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                sum += Math.abs(perm[i][x][y] - s[x][y]);
            }
        }
        
        if (sum < min) {
            min = sum;
        }
    }
    
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
