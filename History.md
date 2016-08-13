# 0.0.3 / 2016-08-13

- Added BigNumber.prototype.negate() - Pushes a negation operation to the queue. Does not change the value of `this`.
- Added BigNumber.prototype.compare/cmp(b[, opts]) - Returns BigNumber.compare(this, b, opts).
- Added BigNumber.prototype.less/lt(b[, opts]) - Returns `true` if `this` is less than `b`.
- Added BigNumber.prototype.greater/gt(b[, opts]) - Returns `true` if `this` is greater than `b`.
- Added BigNumber.prototype.equal/eq(b[, opts]) - Returns `true` if `this` is equal to `b`.
- BigNumber.compare now throws an error if one of the arguments is not a BigNumber.

# 0.0.2 / 2016-08-02

- Added BigNumber.prototype.plus(a[, b][, c...]) - Pushes multiplication operations to the queue. Does not change the value of `this`.
- Now integrated with [Travis CI](https://travis-ci.org/ETHproductions/infimath) and [Coveralls.io](https://coveralls.io/github/ETHproductions/infimath), using Mocha and Istanbul.
- Added more tests to bring the coverage up to 100%.
- Bug fix: BigNumber.prototype.calculate() does not empty the queue.

# 0.0.1 / 2016-08-01

- Added BigNumber function/object - can be called as `BigNumber(x)` or `new BigNumber(x)`.
  - Properties:
    - align(a, b) - Aligns the data of two BigNumbers by removing/adding zeroes to each side.
	- compare(a, b[, opts]) - Compares two BigNumbers, returning `-1` if `a` is less; `+1` if `a` is greater; `0` if they are equal. If `opts.aligned` is true, skips the alignment step. If `opts.ignoreSign` is true, ignores the sign of the numbers.
  - Prototype properties:
    - data - The meat of the number.
	- decs - The amount of decimal places in the number.
	- sign - The sign of the number (`-1` for negative, `0` for zero, `+1` for positive).
	- queue - The operations requested to be performed on the number. Emptied with calculate().
    - toString() - Returns a string representation of the number that the BigNumber represents.
    - plus(a[, b][, c...]) - Pushes addition operations to the queue. Does not change the value of `this`.
    - minus(a[, b][, c...]) - Pushes subtraction operations to the queue. Does not change the value of `this`.
    - calculate() - Empties the queue by performing all requested calculations and updating the value of `this`.
