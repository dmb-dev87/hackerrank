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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
  // Write your code here
  if (s.length === 1)
    return "YES";
  let obj = {};
  for (let i = 0; i < s.length; i++) {
    if (typeof obj[s[i]] === 'undefined') {
      obj[s[i]] = 1;
    } else {
      obj[s[i]] = obj[s[i]] + 1;
    }
  }

  let obj1 = {};

  for (let o in obj) {
    let x = obj[o];

    if (typeof obj1[x] === 'undefined') {
      obj1[x] = 1;
    } else {
      obj1[x] = obj1[x] + 1;
    }
  }

  let flag = 0;
  let keys = Object.keys(obj1).map(x => parseInt(x));


  if (keys.length === 1)
    return "YES";

  if (keys.length != 2)
    return "NO";

  for (let o in obj1) {
    if (obj1[o] === 1 && parseInt(o) - 1 === 0) {
      flag = 1;
      break;
    }
    if (obj1[o] === 1 && keys.indexOf(parseInt(o) - 1) != -1)
      flag = 1;
  }

  return flag == 0 ? "NO" : "YES";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = isValid(s);

  ws.write(result + '\n');

  ws.end();
}
