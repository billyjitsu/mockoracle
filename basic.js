const ethers = require('ethers');
const fs = require('fs');
const util = require('util');

const minPrice = ethers.parseUnits('500', 18);
const maxPrice = ethers.parseUnits('3000', 18);

let currentPrice = ethers.parseUnits('2000', 18); // Starting price in ether
const decreaseRate = ethers.parseUnits('0.9999665', 18); 
const increaseRate = ethers.parseUnits('1.0000335', 18); 

// let increasing = false; // Flag to track whether the price is increasing or decreasing
let rate = decreaseRate; // Starting rate

let elapsedTime = 0;

const appendFile = util.promisify(fs.appendFile);

// Function to decrease price over time
async function adjustPriceOverTime(price, secondsElapsed) {
    if (price <= minPrice) {
        // increasing = true; // Switch to increasing mode
        rate = increaseRate;
    } else if (price >= maxPrice) {
        // increasing = false; // Switch to decreasing mode
        rate = decreaseRate;
    }

    let newPrice = (price * rate) / ethers.parseUnits('1', 18);
    return newPrice;
}

// File to output the data
const outputFile = 'outputbasic.txt';

// Clear the file before starting the simulation
fs.writeFileSync(outputFile, '');

// Function to run the simulation
async function runSimulation() {
    const simulateSeconds = 120000; // For example, simulate for 50000 seconds

    for (let i = 0; i < simulateSeconds; i++) {
        elapsedTime++;
        currentPrice = await adjustPriceOverTime(currentPrice, elapsedTime);
        const outputString = `Price at ${elapsedTime} seconds: ${ethers.formatUnits(currentPrice, 18)}\n`;
        await appendFile(outputFile, outputString);
    }

    console.log(`Simulation complete. Data written to ${outputFile}`);
}

// Run the simulation
runSimulation();

// // const intervalId = setInterval(() => {
// //     elapsedTime++;
// //     currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
// //     console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);

// //     // You can add additional logic here if you need to stop the interval based on other conditions
// // }, updateInterval);
