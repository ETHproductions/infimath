/* Preface
 *   Quote by JSLint:
 *   "There is exactly one right way to write your code, and anyone who doesn't write this way is a complete and total moron."
 *   I HATE JSLINT.
 *   </rant>
 */

function BigNumber(x) {
	if(!(this instanceof BigNumber)) return new BigNumber(x);
	if(x === undefined) return this;
	return BigNumber.parse(x);
}

BigNumber.parse = function(x) {
	var orig = x;
	var result = new BigNumber();
	result.data = [];
	result.decs = 0;
	result.sign = 0;

	if (typeof x !== "string") {
		x += ""; // Force input to be a string
	}

	// Remove commas and whitespace, e.g. "1,234,567" or "1.234 567 89".
	x = x.replace(/[,_\s]/g, "");

	// At this point, we check if the input is invalid, and throw a SyntaxError if it is.
	if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/.test(x))
		throw new SyntaxError("Invalid BigNumber: " + orig);

	// If x contains a non-zero digit:
	//   If the first char in x is "-", the sign is -1.
	//   Otherwise, the sign is +1.
	if (/^[^e]*[1-9]/i.test(x)) {
		if (x[0] === "-") {
			result.sign = -1;
			x = x.slice(1);
		} else {
			result.sign = +1;
		}
	}

	// Testing for scientific notation
	var ereg = /e([+-]?\d+)$/i;
	if (ereg.test(x)) {
		var decs = Number(x.match(ereg)[1]); // The +X or -X part
		x = x.replace(ereg, ""); // Remove the scientific part
		result.decs = -decs / 3 | 0; // The minimum number of decimals that will end up in the data
		decs %= 3;

		// Special cases where in the non-scientific part:
		// - the decimal point has to be manually shifted, and/or
		// - zeroes have to be added or removed.
		if (decs === +1) {
			   if (/\.(.)/.test(x))  x = x.replace(/\.(.)/, "$1.");
		  else                       x = x.replace(/\.?$/, "0");
		} else if (decs === +2) {
			   if (/\.(..)/.test(x)) x = x.replace(/\.(..)/, "$1.");
		  else if (/\.(.)/ .test(x)) x = x.replace(/\.(.)/, "$10.");
		  else                       x = x.replace(/\.?$/, "00");
		} else if (decs === -1) {
			   if (/(.)\./ .test(x)) x = x.replace(/(.)\./, ".$1");
		  else if (/\./    .test(x)) x = x.replace(/\./, ".0");
		  else if (/0$/    .test(x)) x = x.replace(/0$/, "");
		  else if (/(.)$/  .test(x)) x = x.replace(/(.)$/, ".$1");
		} else if (decs === -2) {
			   if (/(..)\./.test(x)) x = x.replace(/(..)\./, ".$1");
		  else if (/(.)\./ .test(x)) x = x.replace(/(.)\./, ".0$1");
		  else if (/\./    .test(x)) x = x.replace(/\./, ".00");
		  else if (/00$/   .test(x)) x = x.replace(/00$/, "");
		  else if (/(.)0$/ .test(x)) x = x.replace(/(.)0$/, ".$1");
		  else if (/(..)$/ .test(x)) x = x.replace(/(..)$/, ".$1");
		  else if (/(.)$/  .test(x)) x = x.replace(/(.)$/, ".0$1");
		}
	}
	
	// Add extra zeroes to the decimal part for proper parsing.
	if(/\./.test(x)) {
		x += "00";
	}

	// While there are at least three decimal digits, add the first three to the beginning of the data.
	var decreg = /\.(...)/;
	while (decreg.test(x)) {
		result.data.unshift(Number(x.match(decreg)[1]));
		result.decs++;
		x = x.replace(decreg, ".");
	}

	// Remove decimal point and extraneous zeroes.
	x = x.replace(/\..*/, "");

	// While there are digits left in x, add the last three to the end of data.
	while (x) {
		result.data.push(Number(x.slice(-3)));
		x = x.slice(0, -3);
	}

	// Remove all extraneous zeroes from the data.
	while (result.data.length > 1 && result.data[0] === 0) {
		result.data.splice(0, 1);
		result.decs--;
	}
	while (result.data.length > 1 && result.data.slice(-1)[0] === 0) {
		result.data.splice(-1, 1);
	}

	return result;
}

BigNumber.prototype.toString = function() {
	var decs = this.decs,
		str = "",
		arr = this.data.slice();

	// Add extra zeroes to the end and beginning of str, respectively.
	if (decs < 0) str = Array(1 - decs).join("000");
	while (arr.length <= decs) arr.push(0);

	// Combine arr into one string, including a decimal point.
	str = arr.reduce(function(x, y) {
		return ("00" + y).slice(-3) + (decs-- === 0 ? "." : "") + x;
	},str);

	// Trim extra zeroes and decimal point.
	str = str.replace(/^(?:0(?!\.))+|\.0*$|(\..+?)0+$/g, "$1");

	// Add a negative sign, if necessary.
	if (this.sign === -1) str = "-" + str;

	// Return str.
	return str;
}

/* Addendum
 *   I might have liked JSLint, if it was the kind of person who fixes your code for you
 *   instead of the person from https://xkcd.com/1513/.
 */
