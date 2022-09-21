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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure, d) {
    // Write your code here

    const compare_fn = (a, b) => {
        return a - b;
    };

    const binarySearch = (ar, el) => {
        var m = 0;
        var n = ar.length - 1;
        while (m <= n) {
            var k = (n + m) >> 1;
            var cmp = compare_fn(el, ar[k]);
            if (cmp > 0) {
                m = k + 1;
            } else if (cmp < 0) {
                n = k - 1;
            } else {
                return k;
            }
        }
        return -m - 1;
    }

    let pos = Math.trunc(d / 2);
    let notifs = 0;

    var expDays = [...expenditure.slice(0, d)];
    expDays.sort((a, b) => { return a - b; });

    for (let i = d; i < expenditure.length; i++) {
        let median = d % 2 === 0 ? expDays[pos - 1] + expDays[pos] : expDays[pos] * 2;

        if (expenditure[i] >= median) {
            notifs++;
        }

        var index = binarySearch(expDays, expenditure[i - d]);

        expDays.splice(index, 1);

        let val = expenditure[i];

        if (val <= expDays[0]) {
            expDays.unshift(val);
        } else if (val > expDays[expDays.length - 1]) {
            expDays.push(val);
        } else {
            let result = binarySearch(expDays, val);

            if (result >= 0) {
                expDays.splice(result, 0, val);
            } else {
                expDays.splice(-(result + 1), 0, val);
            }
        }
    }

    return notifs;
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const expenditure = readLine().replace(/\s+$/g, '').split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    const result = activityNotifications(expenditure, d);

    ws.write(result + '\n');

    ws.end();
}
