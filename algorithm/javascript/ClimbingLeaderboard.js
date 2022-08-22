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
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    // Write your code here
    let map = rankScores(ranked);
    let index = ranked.length - 1;
    let result = [];
    
    for (let score of player) {
        if (ranked.length === 0) {
            result.push(1);
        } else {
            for (let i = index; i >= 0; i--) {
                index = i;
                if (score < ranked[i]) {
                    result.push(map.get(ranked[i]) + 1);
                    break;
                } else if (score === ranked[i]) {
                    result.push(map.get(ranked[i]));
                    break;
                } else if (i === 0) {
                    result.push(1);
                }
            }
        }        
    }    
    return result;
}

function rankScores(scores) {
    let map = new Map();
    let rank = 1;
    
    for (let leaderScor of scores) {
        if (!map.has(leaderScor)) {
            map.set(leaderScor, rank++);
        }
    }
    
    return map;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
