/* Preface
 *   Quote by JSLint:
 *   "There is exactly one right way to write your code, and anyone who doesn't write this way is a complete and total moron."
 *   I HATE JSLINT.
 *   </rant>
 */

"use strict";

// Creates a new BigNumber object.
function BigNumber(x) {
	if(!(this instanceof BigNumber)) return new BigNumber(x);
	if(x === undefined) return this;
	return BigNumber.parse(x);
}

// Creates a new BigNumber object.
BigNumber.parse = function(x) {
	if (x instanceof BigNumber) return x;
	var orig = x;
	var result = new BigNumber();
	result.data = [];
	result.decs = 0;
	result.sign = 0;
	result.queue = [];

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
};

// Aligns the data of two BigNumbers by padding either side with zeroes.
BigNumber.align = function (a, b) {
	while (a.decs < b.decs) {
		if (1 in b.data && b.data[0] === 0) {
			b.data.shift();
			b.decs--;
		} else {
			a.data.unshift(0);
			a.decs++;
		}
	}
	while (a.decs > b.decs) {
		if (1 in a.data && a.data[0] === 0) {
			a.data.shift();
			a.decs--;
		} else {
			b.data.unshift(0);
			b.decs++;
		}
	}
	
	while (a.data.length < b.data.length) {
		if (1 in b.data && b.data.slice(-1)[0] === 0) {
			b.data.pop();
		} else {
			a.data.push(0);
		}
	}
	while (a.data.length > b.data.length) {
		if (1 in a.data && a.data.slice(-1)[0] === 0) {
			a.data.pop();
		} else {
			b.data.push(0);
		}
	}
};

// Compares two BigNumbers, returning -1 if the first is smaller, +1 if the first is larger, or 0 if they are equal
// If opts is {aligned: true, ignoreSign: true}, the function will skip the alignment step and ignore the signs of the numbers.
BigNumber.compare = function(a, b, opts) {
	opts = opts || {};
	opts.aligned || BigNumber.align(a, b);
	if (!opts.ignoreSign) {
		if (a.sign < b.sign) return -1;
		else if (a.sign > b.sign) return +1;
	}
	for (var i = a.data.length; --i >= 0; ) {
		if (a.data[i] < b.data[i]) {
			if (!opts.ignoreSign) {
				return -a.sign;
			} else {
				return -1;
			}
		} else if (a.data[i] > b.data[i]) {
			if (!opts.ignoreSign) {
				return +a.sign;
			} else {
				return +1;
			}
		}
	}
	return 0;
};

// Converts the BigNumber to a string containing its nuerical data.
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
};

// Pushes an addition operation to the queue.
BigNumber.prototype.plus = function () {
	var args = [].slice.call(arguments);
	for (var i in args) {
		this.queue.push(["plus", BigNumber(args[i])]);
	}
	return this;
};

// Pushes a subtraction operation to the queue.
BigNumber.prototype.minus = function () {
	var args = [].slice.call(arguments);
	for (var i in args) {
		var b = BigNumber(args[i]);
		b.sign = -b.sign;
		this.queue.push(["plus", b]);
	}
	return this;
};

// Empties the BigNumber's calculation queue.
BigNumber.prototype.calculate = function (x) {
	if (typeof x === "function") {
		return x(this.calculate());
	}
	for (var i = 0; i < this.queue.length; i++) {
		var arr = this.queue[i];
		var item = arr[1];
		item.calculate();
		if (arr[0] === "plus") {
			if (item.sign === 0) {
				continue;
			} else if (this.sign === 0){
				this.data = item.data;
				this.decs = item.decs;
				this.sign = item.sign;
			} else if (this.sign === item.sign) {
				BigNumber.align(this, item);
				for (var carry = 0, j = 0; j < item.data.length; j++) {
					this.data[j] += item.data[j] + carry;
					carry = +(this.data[j] >= 1e3);
					this.data[j] %= 1e3;
				}
				carry && this.data.push(1);
			} else {
				BigNumber.align(this, item);
				this.sign = this.sign * BigNumber.compare(this, item, {aligned:true, ignoreSign:true});
				for (var carry = 0, j = 0; j < this.data.length; j++) {
					this.data[j] -= item.data[j] + carry;
					carry = +(this.data[j] < 0);
					this.data[j] += 1e3;
					this.data[j] %= 1e3;
				}
				if (carry) {
					var c = 0;
					this.data = this.data.map(function(x, y) { return (x -= c) > 0 ? (y ? 999 : 1e3) - x : (c = 1, 0); });
				}
			}
		}
	}
	
	while (1 in this.data && this.data[0] === 0) {
		this.data.shift();
		this.decs--;
	}
	while (1 in this.data && this.data.slice(-1)[0] === 0) {
		this.data.pop();
	}
	return this;
};

/* Addendum
 *   I might have liked JSLint, if it was the kind of person who fixes your code for you
 *   instead of the person from https://xkcd.com/1513/.
 */

typeof module !== "undefined" && (module.exports = BigNumber);
