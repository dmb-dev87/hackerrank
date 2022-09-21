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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
  // Write your code here
  let hash = {};

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length + 1; j++) {
      let key = s.slice(i, j).split('').sort().join('');
      hash[key] = hash[key] ? hash[key] + 1 : 1;
    }

  }

  let count = 0;

  for (let key in hash) {
    if (key !== s) {
      //  n * n-1 /2
      count += hash[key] * (hash[key] - 1) / 2;
    };
  }

  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = sherlockAndAnagrams(s);

    ws.write(result + '\n');
  }

  ws.end();
}
