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
 * Complete the 'extraLongFactorials' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function extraLongFactorials(n) {
    // Write your code here
    var result = [1];
    
    for (var i = 1; i < n + 1; i++) {
        result = bigMultyply(result, i);
    }
    
    console.log(result.join(''));
}

function bigMultyply(numArray, multiplier) {
    var sum = [];
    
    for (var i = 1; i <= multiplier; i++) {
        sum = bigAdd(sum, numArray);
    }
    
    return sum;
}

function bigAdd(numArray1, numArray2) {
    var longerArray;
    var shorterArray;
    var sum = [];
    
    if ((numArray1.length > numArray2.length)) {
        longerArray = numArray1;
        shorterArray = numArray2;
    } else {
        longerArray = numArray2;
        shorterArray = numArray1;
    }
    
    longerArray.reverse();
    shorterArray.reverse();
    
    var carry = 0;
    
    for (var i = 0; i < longerArray.length; i++) {
        var a = shorterArray[i] || 0;
        var b = longerArray[i];
        var c = a + b + carry;
        
        carry = Math.floor(c / 10);
        var digit = c % 10;
        sum.unshift(digit);    
    }
    
    if (carry > 0) {
        sum.unshift(carry);
    }
    
    longerArray.reverse();
    shorterArray.reverse();
    
    return sum;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    extraLongFactorials(n);
}
