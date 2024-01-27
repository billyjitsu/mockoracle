const ethers = require('ethers');

const minPrice = ethers.parseUnits('989', 18);
const maxPrice = ethers.parseUnits('10001', 18);

let currentPrice = ethers.parseUnits('1000', 18); // Starting price in ether

let elapsedTime = 0; //0;
const updateInterval = 1000; // 1 second in milliseconds

// Constants for sinusoidal wave
const amplitude = 20.19966832574505 / 2; // Amplitude of the sinusoidal wave
const frequency = 2 * Math.PI / 300; // Frequency for a 300-second cycle

// Function to adjust price over time
function adjustPriceOverTime(price, secondsElapsed) {
    // Calculate the new price using the formula
    let exponentialComponent = 1000 * Math.pow(0.9999665, secondsElapsed);
    let sinusoidalComponent = amplitude * (Math.sin(frequency * secondsElapsed - Math.PI / 2) + 1);
    let newPrice = exponentialComponent + sinusoidalComponent;

    // Convert new price to BigNumber for comparison
    let newPriceBN = ethers.parseUnits(newPrice.toString(), 18);

    // Check within bounds
    if (newPriceBN <= (minPrice)) {
        newPriceBN = minPrice;
    } else if (newPriceBN >= (maxPrice)) {
        newPriceBN = maxPrice;
    }

    return newPriceBN;
}

const intervalId = setInterval(() => {
    elapsedTime++;
    currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
    console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);
}, updateInterval);




// const ethers = require('ethers');

// const minPrice = ethers.parseUnits('989', 18);
// const maxPrice = ethers.parseUnits('1001', 18);

// let currentPrice = ethers.parseUnits('1000', 18); // Starting price in ether
// const decreaseRate = ethers.parseUnits('0.9999665', 18); // Rate to decreae price 1% every 300 seconds
// const increaseRate = ethers.parseUnits('1.0000335', 18); // Rate to increase price 1% every 300 seconds

// let increasing = false; // Flag to track whether the price is increasing or decreasing
// let rate = decreaseRate; // Starting rate

// let elapsedTime = 0;  //0;
// const updateInterval = 1000; // 1 second in milliseconds

// // Constants for sinusoidal wave
// const amplitude = ethers.parseUnits('11', 18); // Amplitude of the sinusoidal wave
// const frequency = 2 * Math.PI / 300; // Frequency for a 300-second cycle

// // Function to decrease price over time
// function adjustPriceOverTime(price, secondsElapsed) {
//     // Check within bounds or switch
//     if (price <= minPrice) {
//         increasing = true; // Switch to increasing mode
//         rate = increaseRate;
//     } else if (price >= maxPrice) {
//         increasing = false; // Switch to decreasing mode
//         rate = decreaseRate;
//     }

//     let newPrice = price;
//         // console.log("Rate: ", rate);
//         newPrice = (newPrice * rate) / ethers.parseUnits('1', 18);

    

//     // Apply sinusoidal wave
//     let sinusoidalValue = Math.sin(frequency * secondsElapsed);
//    // console.log("Sinusoidal Value: ", sinusoidalValue);
//     let formattedSinusoidalValue = sinusoidalValue.toFixed(18);

//     let sinExtended = ethers.parseUnits(formattedSinusoidalValue.toString(), 18);
//    // console.log("Sinusoidal Extended: ", sinExtended);

//     let sinusoidalComponent = amplitude * sinExtended /  ethers.parseUnits('1', 18);;

//     newPrice = increasing ? newPrice + (sinusoidalComponent) : newPrice - (sinusoidalComponent);
//     return newPrice;
// }


// const intervalId = setInterval(() => {
//     elapsedTime++;
//     currentPrice = adjustPriceOverTime(currentPrice, elapsedTime);
//     console.log(`Price at ${elapsedTime} seconds: ${currentPrice}`);
//     // console.log(`Random: ${lcgRandom()}`);
// }, updateInterval);
