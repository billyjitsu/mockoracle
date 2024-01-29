## Mock Oracle

**This script generates a new price within a certain random range.  When the deviation surpases 1%, a notification will log out**

- Choose your min price and maximum price to alternate through
- `decreaseRate` and `increaseRate` dictate the rate in which they may go up or down in value over time.
- Changing the first value in the `frequency` will change the sinusoidal amplitude in which the price will fluctuate between "waves"

```shell
$ node script.js
```
