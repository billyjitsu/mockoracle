const fs = require('fs');

let x = 0; // Initialize time step
let increasing = true; // Start with increasing price

function updatePrice() {
    let price;
    if (increasing) {
        // Use the increasing formula
        price = 500 * Math.pow(1.01, x / 300) + (20.19966832574505 / 2) * (Math.sin((2 * Math.PI / 300) * x - Math.PI / 2) + 1);
        if (price >= 3000) {
            increasing = false; // Switch to decreasing once the upper limit is reached
            x = 0; // Reset time step for decreasing phase
        }
    } else {
        // Use the decreasing formula
        price = 3000 * Math.pow(0.9999665, x) + (20.19966832574505 / 2) * (Math.sin((2 * Math.PI / 300) * x - Math.PI / 2) + 1);
        if (price <= 500) {
            increasing = true; // Switch to increasing once the lower limit is reached
            x = 0; // Reset time step for increasing phase
        }
    }

    x++; // Increment time step
    return price;
}

// Simulate and write to file
let output = "";
for (let i = 0; i < 150000; i++) {
    output += `Time Step ${i}: Price = ${updatePrice()}\n`;
}

fs.writeFileSync('priceSimulation.txt', output);
console.log("Done!");
