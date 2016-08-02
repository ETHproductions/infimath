var chai = require('chai');
var expect = chai.expect;
var BigNumber = require("../src/infimath.js");

describe('BigNumber.prototype.calculate()', function () {
	it('should accept a function as an argument', function () {
		var a = BigNumber(2),
			b = null,
			c = null;
		a.plus(2);
		b = a.calculate(function (x) {
			return c = x + "";
		}) + "";
		expect(b).to.equal("4");
		expect(c).to.equal("4");
	});
	
	it('should fail when the queue contains an invalid operation', function () {
		var a = BigNumber(2),
			b = false;
		a.queue.push(["error", BigNumber(2)]);
		try {
			a.calculate();
		} catch (e) {
			b = true;
		}
		expect(b).to.be.true;
	});
});