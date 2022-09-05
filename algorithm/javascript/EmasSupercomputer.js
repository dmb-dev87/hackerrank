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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid, n, m) {
    // Write your code here
    var board = grid.map((line) => {
        return line.split('').map((gb) => {
            return gb === 'G';
        });
    });
    
    var lengthsThatFit = (brd, row, col) => {
        if (!brd[row][col]) return [];
        var result = [1];
        
        var bordermax = Math.min(row, col);
        bordermax = Math.min(bordermax, n - row - 1);
        bordermax = Math.min(bordermax, m - col - 1);
        
        for (var l = 1; l <= bordermax; l++) {
            if (brd[row - l][col] && brd[row + l][col] && brd[row][col - l] && brd[row][col + l]) {
                result.push(2*l + 1);
            } else {
                return result;
            }
        }
        return result;
    }
    
    var makeWorkboard = (brd, workbrd, row, col, size) => {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < m; j++) {
                workbrd[i][j] = brd[i][j];
            }
        }
        workbrd[row][col] = false;
        for (var l = 1; l <= (size - 1) / 2; l++) {
            workbrd[row + l][col] = workbrd[row-l][col] = workbrd[row][col+l] = workbrd[row][col-l] = false;
        }
    }
    
    var workboard = new Array(n);
    
    for (var i = 0; i < n; i++) workboard[i] = new Array(m);
    
    var maxProduct = 1;
    
    var productOfLengths = (length1, length2) => {
        return (2*length1 - 1)*(2*length2 - 1);
    };
    
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            var lengths = lengthsThatFit(board, i, j);
            for (var k = 0; k < lengths.length; k++) {
                makeWorkboard(board, workboard, i, j, lengths[k]);
                for (var p = 0; p < n; p++) {
                    for (var q = 0; q < m; q++) {
                        var otherLengths = lengthsThatFit(workboard, p, q);
                        if (otherLengths.length > 0) {
                            var maxLength = otherLengths[otherLengths.length - 1];
                            maxProduct = Math.max(maxProduct, productOfLengths(lengths[k], maxLength));
                        }
                    }
                }
            }
        }
    }
    
    return maxProduct;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid, n, m);

    ws.write(result + '\n');

    ws.end();
}
