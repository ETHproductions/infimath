# infimath.js [![Build Status](https://travis-ci.org/ETHproductions/infimath.svg?branch=master)](https://travis-ci.org/ETHproductions/infimath) [![Coverage Status](https://coveralls.io/repos/github/ETHproductions/infimath/badge.svg?branch=master)](https://coveralls.io/github/ETHproductions/infimath?branch=master)

WIP arbitrary-precision math library for JavaScript.

## How do I use it?

Browser:

    <script src='https://rawgit.com/ETHproductions/infimath/master/src/infimath.js'></script>
    
Usage:

    var myNumber1 = new BigNumber(0.1);   // Creates a new BigNumber
    var myNumber2 = BigNumber(0.2);       // Also creates a new BigNumber
    var myNumber3 = BigNumber.parse(0.3); // This too
    
    myNumber1.plus(myNumber2);            // Pushes an addition operation to the queue
    console.log(myNumber1);               // 0.1 (value hasn't changed yet)
    
    myNumber1.calculate();                // Empties the queue and performs each calculation
    console.log(myNumber1);               // 0.3
    console.log(myNumber1.eq(myNumber3)); // true
    
    // All of these are valid
    var numbers = [
        BigNumber(1),
        BigNumber(-1),
        BigNumber(0.1),
        BigNumber(1e-5),
        BigNumber("1"),
        BigNumber("-1.1"),
        BigNumber("2.4e5"),
        BigNumber("89,374,920.723_254_1"),
        BigNumber("89 374 920.723 254 1"),
        BigNumber([1,234,567]),
        BigNumber(BigNumber(1))
    ];
    
    console.log(
        BigNumber(1e+30)
        .plus(1e-30)
        .minus(1e-31)
        .times(2)
        .negate()
        .calculate()
        .toString()
        ); // "-2000000000000000000000000000000.0000000000000000000000000000018"

Move stuff here soon.
