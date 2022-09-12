'use strict';

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
 * Complete the 'countSort' function below.
 *
 * The function accepts 2D_STRING_ARRAY arr as parameter.
 */

function countSort(arr) {
    // Write your code here
    var sorted = [];
    
    for(let i = 0; i < arr.length; i++) {
        var char = i < arr.length / 2 ? "-" : arr[i][1];
        var pos = arr[i][0];
        sorted[pos] = (sorted[pos] || []);
        sorted[pos].push(char);
    }
    
    var out = [];
    for(let key in sorted) {
        out.push(sorted[key].join(' '));
    }
    
    console.log(out.join(' '));
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
