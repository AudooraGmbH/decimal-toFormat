# toFormat

Adds a `toFormat` function to format [decimal.js](https://github.com/MikeMcl/decimal.js/) values.

## Install

Node.js

```bash
$ npm install decimal-toformat
```

## Use

### Node.js

```js
const Decimal = require("decimal.js");
const { toFormat } = require("decimal-toformat");

x = new Decimal(9876.54321);
toFormat(x, 2) ;                      // '9,876.54'

// Set some format properties
toFormat(x, 1, {
  decimalSeparator: ',',
  groupSeparator: ' ',
  groupSize: 2,
});                                  // '98 76,5'
```

### Further examples:

```js
let format = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize : 0
};

toFormat(x, format);                 // 123,456,789.987654321
toFormat(x, 2, 1, format);           // 123,456,789.98

toFormat(x, {
  decimalSeparator: ',',
  groupSeparator: '',
});                                  // 123456789,987654321

format = {
  decimalSeparator: '.',
  groupSeparator: ' ',
  groupSize: 3,
  fractionGroupSeparator: ' ',
  fractionGroupSize : 5
};

toFormat(x, format);                 // 123 456 789.98765 4321
toFormat(x, 4, format);              // 123 456 789.9877
toFormat(x, 2, 1, format);           // 123 456 789.98
```

## Test

```bash
$ npm test
```

## Licence

[MIT](LICENCE)
