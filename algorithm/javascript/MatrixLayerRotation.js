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
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
  // Write your code here
  const valueAt = (matrix, x, y, rot) => {
    let level, limits = { x: 0, y: 0 }, levels = { x: 0, y: 0 };

    levels.x = (x < matrix[y].length / 2) ? x : matrix[y].length - x - 1;
    levels.y = (y < matrix.length / 2) ? y : matrix.length - y - 1;

    level = Math.min(levels.x, levels.y);

    limits.x = matrix[y].length - level - 1;
    limits.y = matrix.length - level - 1;

    var max = (matrix.length - level * 2) * 2 + (matrix[y].length - level * 2) * 2 - 4;

    rot = rot % max;

    for (; rot > 0; rot--)
      if (y == level && x < limits.x) x += 1;
      else if (x == limits.x && y < limits.y) y += 1;
      else if (y == limits.y && x > level) x -= 1;
      else if (x == level && y > level) y -= 1;

    return matrix[y][x];
  }

  for (let y = 0; y < matrix.length; y++) {
    let row = [];
    for (let x = 0; x < matrix[y].length; x++) {
      row.push(valueAt(matrix, x, y, r));
    }
    console.log(row.join(' '));
  }
}

function main() {
  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const m = parseInt(firstMultipleInput[0], 10);

  const n = parseInt(firstMultipleInput[1], 10);

  const r = parseInt(firstMultipleInput[2], 10);

  let matrix = Array(m);

  for (let i = 0; i < m; i++) {
    matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
  }

  matrixRotation(matrix, r);
}
