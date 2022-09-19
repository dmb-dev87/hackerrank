'use strict';

const fs = require('fs');
const https = require('https');

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

async function getTeams(year, k) {

  const fetch = (url) => {
    return new Promise((resolve, reject) => {
      https
        .get(url, (resp) => {
          let data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            resolve(JSON.parse(data));
          });
        })
        .on('error', (err) => {
          reject(err.message);
        });
    });
  };

  const getFootballMatches = (year, page) => {
    const url = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${page}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((jsonResponse) => resolve(jsonResponse))
        .catch((e) => reject(e.message));
    });
  };

  const matchesPerTeam = {};
  let initialPage = 1;
  let totalPages = 1;

  while (initialPage <= totalPages) {
    const { total_pages, data: matches } = await getFootballMatches(year, initialPage);

    matches.forEach(({ team1, team2 }) => {
      matchesPerTeam[team1] = (matchesPerTeam[team1] || 0) + 1;
      matchesPerTeam[team2] = (matchesPerTeam[team2] || 0) + 1;
    });

    totalPages = total_pages;
    initialPage += 1;
  }

  return Object.entries(matchesPerTeam)
    .filter(([, numOfMatches]) => numOfMatches >= k)
    .map(([team]) => team)
    .sort();
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim());
  const k = parseInt(readLine().trim());

  const teams = await getTeams(year, k);

  for (const team of teams) {
    ws.write(`${team}\n`);
  }
}
