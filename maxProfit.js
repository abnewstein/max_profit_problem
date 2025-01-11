import * as readline from "readline";

const buildings = [
  { name: "T", buildTime: 5, earning: 1500 }, // Theatre
  { name: "P", buildTime: 4, earning: 1000 }, // Pub
  { name: "C", buildTime: 10, earning: 3000 }, // Commercial Park
];

function maxProfit(timeUnits) {
  const dp = Array(timeUnits + 1).fill(0);
  const choice = Array(timeUnits + 1).fill("");

  for (let time = 1; time <= timeUnits; time++) {
    for (const building of buildings) {
      if (time >= building.buildTime) {
        const profit =
          dp[time - building.buildTime] +
          building.earning * (time - building.buildTime + 1);
        if (profit > dp[time]) {
          dp[time] = profit;
          choice[time] = building.name;
        }
      }
    }
  }

  let T = 0,
    P = 0,
    C = 0;
  let t = timeUnits;
  while (t > 0 && choice[t]) {
    const building = choice[t];
    if (building === "T") T++;
    else if (building === "P") P++;
    else if (building === "C") C++;
    t -= buildings.find((b) => b.name === building).buildTime;
  }

  return { T, P, C, earnings: dp[timeUnits] };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the number of time units: ", (answer) => {
  const timeUnits = parseInt(answer);
  if (isNaN(timeUnits) || timeUnits <= 0) {
    console.log("Please enter a valid positive integer for time units.");
  } else {
    const result = maxProfit(timeUnits);
    console.log(`Optimal Plan for ${timeUnits} time units:`);
    console.log(
      `Theatres: ${result.T}, Pubs: ${result.P}, Commercial Parks: ${result.C}, Earnings: $${result.earnings}`
    );
  }
  rl.close();
});
