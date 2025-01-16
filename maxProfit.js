import * as readline from "readline";

const buildings = [
  { name: "T", buildTime: 5, earning: 1500 }, // Theatre
  { name: "P", buildTime: 4, earning: 1000 }, // Pub
  { name: "C", buildTime: 10, earning: 3000 }, // Commercial Park
];

function maxProfit(timeUnits) {
  const dp = Array(timeUnits + 1).fill(0);
  const choices = Array(timeUnits + 1)
    .fill(null)
    .map(() => []);

  for (let time = 1; time <= timeUnits; time++) {
    for (const building of buildings) {
      if (time >= building.buildTime) {
        const remainingTime = time - building.buildTime;
        const profit =
          dp[remainingTime] + building.earning * (time - building.buildTime);

        if (profit > dp[time]) {
          dp[time] = profit;
          choices[time] = choices[remainingTime].map((seq) => [
            ...seq,
            building.name,
          ]);
          if (choices[time].length === 0) choices[time].push([building.name]);
        } else if (profit === dp[time]) {
          const newSequences = choices[remainingTime].map((seq) => [
            ...seq,
            building.name,
          ]);
          if (newSequences.length === 0) newSequences.push([building.name]);
          choices[time].push(...newSequences);
        }
      }
    }
  }

  const results = choices[timeUnits].map((sequence) => {
    const counts = { T: 0, P: 0, C: 0 };
    sequence.forEach((building) => counts[building]++);
    return counts;
  });

  return { maxEarnings: dp[timeUnits], possibilities: results };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the number of time units: ", (answer) => {
  const timeUnits = parseInt(answer);
  if (isNaN(timeUnits) || timeUnits <= 0 || timeUnits > 200) {
    console.log(
      "Please enter a valid positive integer for time units between 1 and 200."
    );
  } else {
    const result = maxProfit(timeUnits);
    console.log(`Max Earnings: $${result.maxEarnings}`);
    console.log("Possible Optimal Solutions:");
    result.possibilities.forEach((combo, index) => {
      console.log(`${index + 1}: T: ${combo.T}, P: ${combo.P}, C: ${combo.C}`);
    });
  }
  rl.close();
});
