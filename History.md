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
    - plus(a[, b][, c...]) - Pushes addition operations to the stack. Does not change the value of `this`.
    - minus(a[, b][, c...]) - Pushes subtraction operations to the stack. Does not change the value of `this`.
    - calculate() - Empties the queue by performing all requested calculations and updating the value of `this`.
