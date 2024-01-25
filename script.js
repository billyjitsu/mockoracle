const ethers = require('ethers');

const minPrice = ethers.parseUnits('989', 18);
const maxPrice = ethers.parseUnits('1001', 18);

const initialPrice = ethers.parseUnits('1000', 18); // Starting price in ether
const decreaseRate = ethers.parseUnits('0.9999665', 18); 
const increaseRate = ethers.parseUnits('1.0000335', 18); 

let increasing = false; // Flag to track whether the price is increasing or decreasing
let rate = decreaseRate; // Starting rate

// If you want to continuously update the price every second
let elapsedTime = 0;
const updateInterval = 1000; // 1 second in milliseconds

// Function to decrease price over time
function adjustPriceOverTime(price, secondsElapsed) {
    if (price <= minPrice) {
        increasing = true; // Switch to increasing mode
        rate = increaseRate;
    } else if (price >= maxPrice) {
        increasing = false; // Switch to decreasing mode
        rate = decreaseRate;
    }

    let newPrice = price;
    for (let i = 0; i < secondsElapsed; i++) {
        newPrice = (newPrice * rate) / ethers.parseUnits('1', 18);
    }
    return newPrice;
}

const intervalId = setInterval(() => {
    elapsedTime++;
    const currentPrice = adjustPriceOverTime(initialPrice, elapsedTime);
    console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);

    // You can add additional logic here if you need to stop the interval based on other conditions
}, updateInterval);
