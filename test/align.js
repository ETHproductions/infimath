var chai = require('chai');
var expect = chai.expect;
var BigNumber = require("../src/infimath.js");

var tests = [		
	// Positive
	{a: "0", b: "0", decs: 0, a_data: [0], a_sign: 0, b_data: [0], b_sign: 0},
	
	{a: "1000", b: "0", decs: -1, a_data: [1], a_sign: 1, b_data: [0], b_sign: 0},
	{a: "1000", b: "1", decs: 0, a_data: [0, 1], a_sign: 1, b_data: [1, 0], b_sign: 1},
	{a: "1000", b: "1000", decs: -1, a_data: [1], a_sign: 1, b_data: [1], b_sign: 1},
	
	{a: "-1000", b: "0", decs: -1, a_data: [1], a_sign: -1, b_data: [0], b_sign: 0},
	{a: "-1000", b: "1", decs: 0, a_data: [0, 1], a_sign: -1, b_data: [1, 0], b_sign: 1},
	{a: "-1000", b: "1000", decs: -1, a_data: [1], a_sign: -1, b_data: [1], b_sign: 1},
	
	{a: "1000", b: "-1", decs: 0, a_data: [0, 1], a_sign: 1, b_data: [1, 0], b_sign: -1},
	{a: "1000", b: "-1000", decs: -1, a_data: [1], a_sign: 1, b_data: [1], b_sign: -1},
	
	{a: "-1000", b: "-1", decs: 0, a_data: [0, 1], a_sign: -1, b_data: [1, 0], b_sign: -1},
	{a: "-1000", b: "-1000", decs: -1, a_data: [1], a_sign: -1, b_data: [1], b_sign: -1},
	
	{a: ".001", b: "0", decs: 1, a_data: [1], a_sign: 1, b_data: [0], b_sign: 0},
	{a: ".001", b: "1", decs: 1, a_data: [1, 0], a_sign: 1, b_data: [0, 1], b_sign: 1},
	{a: ".001", b: ".001", decs: 1, a_data: [1], a_sign: 1, b_data: [1], b_sign: 1},
	{a: ".001", b: "1000", decs: 1, a_data: [1, 0, 0], a_sign: 1, b_data: [0, 0, 1], b_sign: 1},
	
	{a: [q = BigNumber(1), q.data.push(0), q][2], b: [r = BigNumber(1), r.data.push(0), r][2], decs: 0, a_data: [1], a_sign: 1, b_data: [1], b_sign: 1},
];

tests.forEach(function(test) {
	var a = BigNumber(test.a),
		b = BigNumber(test.b);
	BigNumber.align(a, b);
	describe('BigNumber.align(BigNumber(' + test.a + '), BigNumber(' + test.b + '))', function () {
		it('a should have data of [' + test.a_data + ']', function() {
			expect(a.data + '').to.equal(test.a_data + '');
		});
		it('a should have decs of ' + test.decs, function() {
			expect(a.decs).to.equal(test.decs);
		});
		it('a should have sign of ' + test.a_sign, function() {
			expect(a.sign).to.equal(test.a_sign);
		});
		
		it('b should have data of [' + test.b_data + ']', function() {
			expect(b.data + '').to.equal(test.b_data + '');
		});
		it('b should have decs of ' + test.decs, function() {
			expect(b.decs).to.equal(test.decs);
		});
		it('b should have sign of ' + test.b_sign, function() {
			expect(b.sign).to.equal(test.b_sign);
		});
	});
});
