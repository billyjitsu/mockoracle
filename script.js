/*** Formula takes 15 hours to flow through at 3,000 value */
/*** Formula takes 21 hours to flow through at 6,000 value */

const ethers = require("ethers");

const fs = require('fs');

const minimumPrice = 500;
const maximumPrice = 4000;
//convert minimumPrice and maximumPrice to wei
const minPrice = ethers.parseUnits(minimumPrice.toString(), 18);
const maxPrice = ethers.parseUnits(maximumPrice.toString(), 18);

const decreaseRate = 0.9999665;
const increaseRate = 1.01;
// const increaseRate = 1.0000335;
let rate = decreaseRate; // Starting rate
let increasing = false; // Starting mode

let elapsedTime = 0;
const updateInterval = 1000; // 1 second in milliseconds

// Constants for sinusoidal wave
const amplitude = 20.19966832574505 / 2; // Amplitude of the sinusoidal wave
const pi =  Math.PI; //3.141592653589793238; // π to 18 decimal places
    //adjust this (1.1) value to change the price fluctation range
const frequency = (1.2 * pi) / 300; // Frequency for a 300-second cycle

// Function to adjust price over time
function adjustPriceOverTime(secondsElapsed) {

  let exponentialComponent;
  // Calculate the new price using the formula based on starting price of 1000
  if(increasing){
    exponentialComponent = increasePrice(secondsElapsed);
    
  } else {
    exponentialComponent = decreasePrice(secondsElapsed);
  }

  let sinusoidalComponent =
    amplitude * (Math.sin(frequency * secondsElapsed - pi / 2) + 1);
  let newPrice = exponentialComponent + sinusoidalComponent;

  // Convert new price to BigNumber for comparison
  let newPriceBN = ethers.parseUnits(newPrice.toString(), 18);

  if (newPriceBN <= minPrice) {
    increasing = true; // Switch to increasing mode
    rate = increaseRate;
    elapsedTime = 0;
    fs.appendFileSync(outputFile, "***************** Increasing *******************\n");
  } else if (newPriceBN >= maxPrice) {
    increasing = false; // Switch to decreasing mode
    rate = decreaseRate;
    elapsedTime = 0;
    fs.appendFileSync(outputFile, "****************** Decreasing ******************\n");
  }

  return newPriceBN;
}

function decreasePrice(secondsElapsed) {
  let exponentialComponent = maximumPrice * Math.pow(decreaseRate, secondsElapsed);
  return exponentialComponent;
}

function increasePrice(secondsElapsed) {
  let exponentialComponent = minimumPrice * Math.pow(increaseRate, (secondsElapsed/300));
  return exponentialComponent;
}

// File to output the data
const outputFile = 'output.txt';
// Clear the file before starting the simulation
fs.writeFileSync(outputFile, '');

// Simulate the script for a given number of seconds
const simulateSeconds = 700000; // For example, simulate for 1000 seconds
for (let i = 0; i < simulateSeconds; i++) {
  
  let currentPrice = adjustPriceOverTime(elapsedTime);
  elapsedTime++;
  //const outputString = `Price at ${elapsedTime} seconds: ${currentPrice}\n`;
  const outputString = `Price at ${elapsedTime} seconds: ${ethers.formatUnits(currentPrice, 18)}\n`;
  fs.appendFileSync(outputFile, outputString);
}

console.log(`Simulation complete. Data written to ${outputFile}`);

// const intervalId = setInterval(() => {
//   elapsedTime++;
//   currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
//   console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);
// }, updateInterval);
