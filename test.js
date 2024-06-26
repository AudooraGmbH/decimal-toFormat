const Decimal = require('decimal.js');
const { toFormat } = require('./toFormat');

let time = process.hrtime();
let passed = 0;
let total = 0;

function T(expected, value, dp, format) {
  const actual = toFormat(new Decimal(value), dp, format);

  ++total;
  if (expected === actual) {
    ++passed
  } else {
    console.error('\n Test number: ' + total + ' failed (Decimal)');
    console.error(' Expected: ' + expected);
    console.error(' Actual:   ' + actual);
  }
}

console.log('\n Testing toFormat...');

let format = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0
};

T('0', 0, format);
T('1', 1, format);
T('-1', -1, format);
T('123.456', 123.456, format);
T('NaN', NaN, format);
T('Infinity', 1/0, format);
T('-Infinity', -1/0, format);

T('123.456', 123.456, 3, format);
T('NaN', NaN, 0, format);
T('Infinity', 1/0, 3, format);
T('-Infinity', -1/0, 0, format);

T('0.0', 0, 1, format);
T('1.00', 1, 2, format);
T('-1.000', -1, 3, format);
T('123.4560', 123.456, 4, format);
T('NaN', NaN, 5, format);
T('Infinity', 1/0, 6, format);
T('-Infinity', -1/0, 7, format);

T('9,876.54321', 9876.54321, format);
T('4,018,736,400,000,000,000,000', '4.0187364e+21', format);

T('999,999,999,999,999', 999999999999999, format);
T('99,999,999,999,999',  99999999999999, format);
T('9,999,999,999,999',   9999999999999, format);
T('999,999,999,999',     999999999999, format);
T('99,999,999,999',      99999999999, format);
T('9,999,999,999',       9999999999, format);
T('999,999,999',         999999999, format);
T('99,999,999',          99999999, format);
T('9,999,999',           9999999, format);
T('999,999',             999999, format);
T('99,999',              99999, format);
T('9,999',               9999, format);
T('999',                 999, format);
T('99',                  99, format);
T('9',                   9, format);

T('76,852.342091', '7.6852342091e+4', format);

format.groupSeparator = ' ';

T('76 852.34', '7.6852342091e+4', 2, format);
T('76 852.342091', '7.6852342091e+4', format);
T('76 852.3420910871', '7.6852342091087145832640897e+4', 10, format);

format.fractionGroupSize = 5;

T('4 018 736 400 000 000 000 000', '4.0187364e+21', format);
T('76 852.34209 10871 45832 64089', '7.685234209108714583264089e+4', 20, format);
T('76 852.34209 10871 45832 64089 7', '7.6852342091087145832640897e+4', 21, format);
T('76 852.34209 10871 45832 64089 70000', '7.6852342091087145832640897e+4', 25, format);

T('999 999 999 999 999',  999999999999999, 0, format);
T('99 999 999 999 999.0', 99999999999999, 1, format);
T('9 999 999 999 999.00', 9999999999999, 2, format);
T('999 999 999 999.000',  999999999999, 3, format);
T('99 999 999 999.0000',  99999999999, 4, format);
T('9 999 999 999.00000',  9999999999, 5, format);
T('999 999 999.00000 0',  999999999, 6, format);
T('99 999 999.00000 00',  99999999, 7, format);
T('9 999 999.00000 000',  9999999, 8, format);
T('999 999.00000 0000',   999999, 9, format);
T('99 999.00000 00000',   99999, 10, format);
T('9 999.00000 00000 0',  9999, 11, format);
T('999.00000 00000 00',   999, 12, format);
T('99.00000 00000 000',   99, 13, format);
T('9.00000 00000 0000',   9, 14, format);

T('1.00000 00000 00000', 1, 15, format);
T('1.00000 00000 0000', 1, 14, format);
T('1.00000 00000 000', 1, 13, format);
T('1.00000 00000 00', 1, 12, format);
T('1.00000 00000 0', 1, 11, format);
T('1.00000 00000', 1, 10, format);
T('1.00000 0000', 1, 9, format);

format.fractionGroupSize = 0;

T('4 018 736 400 000 000 000 000', '4.0187364e+21', format);
T('76 852.34209108714583264089', '7.685234209108714583264089e+4', 20, format);
T('76 852.342091087145832640897', '7.6852342091087145832640897e+4', 21, format);
T('76 852.3420910871458326408970000', '7.6852342091087145832640897e+4', 25, format);

T('999 999 999 999 999',  999999999999999, 0, format);
T('99 999 999 999 999.0', 99999999999999, 1, format);
T('9 999 999 999 999.00', 9999999999999, 2, format);
T('999 999 999 999.000',  999999999999, 3, format);
T('99 999 999 999.0000',  99999999999, 4, format);
T('9 999 999 999.00000',  9999999999, 5, format);
T('999 999 999.000000',   999999999, 6, format);
T('99 999 999.0000000',   99999999, 7, format);
T('9 999 999.00000000',   9999999, 8, format);
T('999 999.000000000',    999999, 9, format);
T('99 999.0000000000',    99999, 10, format);
T('9 999.00000000000',    9999, 11, format);
T('999.000000000000',     999, 12, format);
T('99.0000000000000',     99, 13, format);
T('9.00000000000000',     9, 14, format);

T('1.000000000000000', 1, 15, format);
T('1.00000000000000', 1, 14, format);
T('1.0000000000000', 1, 13, format);
T('1.000000000000', 1, 12, format);
T('1.00000000000', 1, 11, format);
T('1.0000000000', 1, 10, format);
T('1.000000000', 1, 9, format);

format = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 2
};

T('9,876.54321', 9876.54321, format);
T('10,00,037.123', '1000037.123456789', 3, format);
T('4,01,87,36,40,00,00,00,00,00,000', '4.0187364e+21', format);

T('99,99,99,99,99,99,999', 999999999999999, format);
T('9,99,99,99,99,99,999',  99999999999999, format);
T('99,99,99,99,99,999',    9999999999999, format);
T('9,99,99,99,99,999',     999999999999, format);
T('99,99,99,99,999',       99999999999, format);
T('9,99,99,99,999',        9999999999, format);
T('99,99,99,999',          999999999, format);
T('9,99,99,999',           99999999, format);
T('99,99,999',             9999999, format);
T('9,99,999',              999999, format);
T('99,999',                99999, format);
T('9,999',                 9999, format);
T('999',                   999, format);
T('99',                    99, format);
T('9',                     9, format);

format.decimalSeparator = ',';
format.groupSeparator = '.';

T('1.23.45.60.000,000000000008', '1.23456000000000000000789e+9', 12, format);

format.groupSeparator = '';

T('10000000000123456789000000,0000000001', '10000000000123456789000000.000000000100000001', 10, format);

format.groupSeparator = ' ';
format.groupSize = 1;
format.secondaryGroupSize = 4;

T('4658 0734 6509 8347 6580 3645 0,6', '4658073465098347658036450.59764985763489569875659876459', 1, format);

format.fractionGroupSize = 2;
format.fractionGroupSeparator = ':';
format.secondaryGroupSize = null;

T('4 6 5 8 0 7 3 4 6 5 0 9 8 3 4 7 6 5 8 0 3 6 4 5 0,59:76:49:85:76:34:89:56:98:75:65:98:76:45:9', '4658073465098347658036450.59764985763489569875659876459' , format);

time = process.hrtime(time);
time = time[0] * 1e3 + (time[1] / 1e6 | 0);

console.log('\n ' + passed + ' of ' + total + ' tests passed in ' + time + ' ms \n');
