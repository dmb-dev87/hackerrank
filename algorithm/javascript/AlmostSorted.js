'use strict';

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
 * Complete the 'almostSorted' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function almostSorted(arr) {
    // Write your code here
    const countDownMarks = (array) => {
        var downMarks = [];

        for (var i = 0; i < array.length; i++) {
            if (array[i + 1] < array[i]) {
                downMarks.push(i);
            }
        }

        return downMarks;
    }

    const swap = (array, idx1, idx2) => {
        var tmp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = tmp;
    }

    const reverse = (array, idx1, idx2) => {
        return array.slice(0, idx1).concat(array.slice(idx1, idx2 + 1).reverse()).concat(array.slice(idx2 + 1));
    }

    var downMarks = countDownMarks(arr);
    var newArray, newDownMarks, start, end;

    if (downMarks.length === 1 || downMarks.length === 2) {
        newArray = arr.slice(0);

        start = downMarks.shift();
        end = (downMarks.length) ? downMarks.shift() + 1 : start + 1;

        swap(newArray, start, end);

        newDownMarks = countDownMarks(newArray);

        if (!newDownMarks.length) {
            process.stdout.write("yes" + "\n");
            process.stdout.write(["swap", start + 1, end + 1].join(" "));
            return;
        }
    }

    if (downMarks.length > 2 &&
        downMarks.length == downMarks[downMarks.length - 1] - downMarks[0] + 1) {

        start = downMarks.shift();
        end = downMarks.pop() + 1;
        newArray = reverse(arr, start, end);
        newDownMarks = countDownMarks(newArray);

        if (!newDownMarks.length) {
            process.stdout.write("yes" + "\n");
            process.stdout.write(["reverse", start + 1, end + 1].join(" "));
            return;
        }
    }

    process.stdout.write("no" + "\n");
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
