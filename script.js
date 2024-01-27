const ethers = require("ethers");

const fs = require('fs');

const minPrice = ethers.parseUnits("900", 18);
const maxPrice = ethers.parseUnits("1100", 18);

let currentPrice = ethers.parseUnits("1000", 18); // Starting price in ether
// const decreaseRate = ethers.parseUnits('0.9999665', 18); // Rate to decreae price 1% every 300 seconds
// const increaseRate = ethers.parseUnits('1.0000335', 18); // Rate to increase price 1% every 300 seconds
const decreaseRate = 0.9999665;
const increaseRate = 1.0000335;
let rate = decreaseRate; // Starting rate

let elapsedTime = 0; //0;
const updateInterval = 1000; // 1 second in milliseconds

// Constants for sinusoidal wave
const amplitude = 20.19966832574505 / 2; // Amplitude of the sinusoidal wave
const pi = 3.141592653589793238; // π to 18 decimal places
const frequency = (2 * pi) / 300; // Frequency for a 300-second cycle

// Function to adjust price over time
function adjustPriceOverTime(price, secondsElapsed) {
  if (price <= minPrice) {
    increasing = true; // Switch to increasing mode
    rate = increaseRate;
    console.log("****Increasing****");
    fs.appendFileSync(outputFile, "****Increasing****\n");
  } else if (price >= maxPrice) {
    increasing = false; // Switch to decreasing mode
    rate = decreaseRate;
    console.log("****Decreasing****");
    fs.appendFileSync(outputFile, "****Decreasing****\n");
  }

  // Calculate the new price using the formula
  let exponentialComponent = 1000 * Math.pow(rate, secondsElapsed);
  let sinusoidalComponent =
    amplitude * (Math.sin(frequency * secondsElapsed - pi / 2) + 1);
  let newPrice = exponentialComponent + sinusoidalComponent;

  // Convert new price to BigNumber for comparison
  let newPriceBN = ethers.parseUnits(newPrice.toString(), 18);

  // Check within bounds
  if (newPriceBN <= minPrice) {
    newPriceBN = minPrice;
  } else if (newPriceBN >= maxPrice) {
    newPriceBN = maxPrice;
  }

  return newPriceBN;
}

// File to output the data
const outputFile = 'output.txt';

// Clear the file before starting the simulation
fs.writeFileSync(outputFile, '');

// Simulate the script for a given number of seconds
const simulateSeconds = 20000; // For example, simulate for 1000 seconds
for (let i = 0; i < simulateSeconds; i++) {
  elapsedTime++;
  currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
  const outputString = `Price at ${elapsedTime} seconds: ${currentPrice}\n`;
  fs.appendFileSync(outputFile, outputString);
}

console.log(`Simulation complete. Data written to ${outputFile}`);

// const intervalId = setInterval(() => {
//   elapsedTime++;
//   currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
//   console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);
// }, updateInterval);


/*
const ethers = require("ethers");
const fs = require('fs');

const minPrice = ethers.parseUnits("900", 18);
const maxPrice = ethers.parseUnits("1100", 18);

let elapsedTime = 0; //0;

// Constants for the new formula
const baseValue = 500;
const increaseRate = 1.01;
const amplitude = 20.19966832574505 / 2;
const pi = 3.141592653589793238; // π to 18 decimal places
const frequency = (2 * pi) / 300; // Frequency for a 300-second cycle

// New function f(x) for price calculation
function f(x) {
    const exponentialComponent = baseValue * Math.pow(increaseRate, (x / 300));
    const sinusoidalComponent = amplitude * (Math.sin(frequency * x - pi / 2) + 1);
    return exponentialComponent + sinusoidalComponent;
}

// Function to adjust price over time
function adjustPriceOverTime(secondsElapsed) {
  let newPrice = f(secondsElapsed);

  // Convert new price to BigNumber for comparison
  let newPriceBN = ethers.parseUnits(newPrice.toString(), 18);

  // Check within bounds and adjust if necessary
  if (newPriceBN.lte(minPrice)) {
    newPriceBN = minPrice;
  } else if (newPriceBN.gte(maxPrice)) {
    newPriceBN = maxPrice;
  }

  return newPriceBN;
}

// File to output the data
const outputFile = 'output.txt';

// Clear the file before starting the simulation
fs.writeFileSync(outputFile, '');

// Simulate the script for a given number of seconds
const simulateSeconds = 20000; // For example, simulate for 20000 seconds
for (let i = 0; i < simulateSeconds; i++) {
  elapsedTime++;
  let currentPrice = adjustPriceOverTime(elapsedTime);
  const outputString = `Price at ${elapsedTime} seconds: ${currentPrice}\n`;
  fs.appendFileSync(outputFile, outputString);
}

console.log(`Simulation complete. Data written to ${outputFile}`);
*/