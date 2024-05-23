import Decimal from "decimal.js";

export interface FormatOptions {
	decimalSeparator?: string;
	groupSeparator?: string;
	groupSize?: number;
	secondaryGroupSize?: number;
	fractionGroupSeparator?: string;
	fractionGroupSize?: number;
}

/*
 *  [decimal] {Decimal} The value to format.
 *  [fmt] {FormatOptions} A format object.
 */
declare function toFormat(decimal: Decimal, format?: FormatOptions): string;

/*
 *  [decimal] {Decimal} The value to format.
 *  [dp] {number} Decimal places. Integer.
 *  [fmt] {FormatOptions} A format object.
 */
declare function toFormat(decimal: Decimal, dp: number, format?: FormatOptions): string;

/*
 *  [decimal] {Decimal} The value to format.
 *  [dp] {number} Decimal places. Integer.
 *  [rm] {number} Rounding mode. Integer, 0 to 8.
 *  [fmt] {FormatOptions} A format object.
 */
declare function toFormat(decimal: Decimal, dp: number, rm: number, format?: FormatOptions): string;