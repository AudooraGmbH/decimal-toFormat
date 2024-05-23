/*
 *  toFormat v3.0.0
 *  A `toFormat` function for decimal.js
 *  Copyright (c) 2017 Michael Mclaughlin
 *  MIT Licence
 */

/*
 *  Returns a string representing the value of this big number in fixed-point notation to `dp`
 *  decimal places using rounding mode `rm`, and formatted according to the properties of the
 * `fmt`, `this.format` and `this.constructor.format` objects, in that order of precedence.
 *
 *  Example:
 *
 *  x = new Decimal('123456789.987654321')
 *
 *  toFormat(x);                  // 123,456,789.987654321
 *  toFormat(x, 2, 1);            // 123,456,789.98
 *
 *  format = {
 *    decimalSeparator: '.',
 *    groupSeparator: ' ',
 *    groupSize: 3,
 *    fractionGroupSeparator: ' ',     // '\xA0' non-breaking space
 *    fractionGroupSize : 5
 *  }
 
 *  // And/or pass a format object to the method call.
 *  toFormat(x, format);          // 123 456 789.98765 4321
 *  toFormat(x, 4, format);       // 123 456 789.9877
 *  toFormat(x, 2, 1, format);    // 123 456 789.98
 *
 *  [decimal] {Decimal} The Decimal instance to format.
 *  [dp] {number} Decimal places. Integer.
 *  [rm] {number} Rounding mode. Integer, 0 to 8.
 *  [fmt] {Object} A format object.
 *
 */
 function toFormat(decimal, dp, rm, fmt) {
	if (!decimal.e && decimal.e !== 0) return decimal.toString();   // Infinity/NaN

	var arr, g1, g2, i,
		u,                             // undefined
		nd,                            // number of integer digits
		intd,                          // integer digits
		intp,                          // integer part
		fracp,                         // fraction part
		dsep,                          // decimalSeparator
		gsep,                          // groupSeparator
		gsize,                         // groupSize
		sgsize,                        // secondaryGroupSize
		fgsep,                         // fractionGroupSeparator
		fgsize                         // fractionGroupSize

	if (dp != u) {
		if (typeof dp == 'object') {
			fmt = dp;
			dp = u;
		} else if (rm != u) {
			if (typeof rm == 'object') {
				fmt = rm;
				rm = u;
			} else if (typeof fmt != 'object') {
				fmt = {};
			}
		} else {
			fmt = {};
		}
	} else {
		fmt = {};
	}

	arr = decimal.toFixed(dp, rm).split('.');
	intp = arr[0];
	fracp = arr[1];
	intd = decimal.s < 0 ? intp.slice(1) : intp;
	nd = intd.length;

	dsep = fmt.decimalSeparator;
	if (dsep == u) {
		dsep = '.';
	}

	gsep = fmt.groupSeparator;

	if (gsep) {
		gsize = fmt.groupSize;
		if (gsize == u) gsize = 0;

		sgsize = fmt.secondaryGroupSize;
		if (sgsize == u) sgsize = 0;

		if (sgsize) {
			g1 = +sgsize;
			g2 = +gsize;
			nd -= g2;
		} else {
			g1 = +gsize;
			g2 = +sgsize;
		}

		if (g1 > 0 && nd > 0) {
			i = nd % g1 || g1;
			intp = intd.substr(0, i);
			for (; i < nd; i += g1) intp += gsep + intd.substr(i, g1);
			if (g2 > 0) intp += gsep + intd.slice(i);
			if (decimal.s < 0) intp = '-' + intp;
		}
	}

	if (fracp) {
		fgsep = fmt.fractionGroupSeparator;

		if (fgsep) {
			fgsize = fmt.fractionGroupSize;
			if (fgsize == u) fgsize = 0;

			fgsize = +fgsize;

			if (fgsize) {
				fracp = fracp.replace(new RegExp('\\d{' + fgsize + '}\\B', 'g'), '$&' + fgsep);
			}
		}

		return intp + dsep + fracp;
	} else {

		return intp;
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = { toFormat };
