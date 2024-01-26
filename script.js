const ethers = require('ethers');

const minPrice = ethers.parseUnits('989', 18);
const maxPrice = ethers.parseUnits('1001', 18);

let currentPrice = ethers.parseUnits('1000', 18); // Starting price in ether
const decreaseRate = ethers.parseUnits('0.9999665', 18); // Rate to decreae price 1% every 300 seconds
const increaseRate = ethers.parseUnits('1.0000335', 18); // Rate to increase price 1% every 300 seconds

let increasing = false; // Flag to track whether the price is increasing or decreasing
let rate = decreaseRate; // Starting rate

let elapsedTime = 1706248040;  //0;
const updateInterval = 1000; // 1 second in milliseconds

// Function to decrease price over time
function adjustPriceOverTime(price, secondsElapsed) {
    // Check within bounds or switch
    if (price <= minPrice) {
        increasing = true; // Switch to increasing mode
        rate = increaseRate;
    } else if (price >= maxPrice) {
        increasing = false; // Switch to decreasing mode
        rate = decreaseRate;
    }

    let newPrice = price;
        console.log("Rate: ", rate);
        newPrice = (newPrice * rate) / ethers.parseUnits('1', 18);
    return newPrice;
}

/*********************
    * Random Fucnctions *   
 *******************/
let seed = 123456789; // Initial seed

// Linear Congruential Generator function
function lcgRandom() {
    // Constants for the generator - these are common values used for LCGs
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // Equivalent to 2^32

    // Update the seed and return a pseudo-random number
    seed = (a * seed + c) % m;
    return seed / m;
}
/* End Random Functions */

const intervalId = setInterval(() => {
    elapsedTime++;
    currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
    console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);
    console.log(`Random: ${lcgRandom()}`);
}, updateInterval);
