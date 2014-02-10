var expect = require('chai').expect;

var subscriptions = require('../lib/subscriptions'),
	testChannel = 'testChannel',
	testCallback = function(){ new Boolean(true); };

describe("subscriptions", function(){
	describe("subscribe", function(){
		it("should callback with an error on missing channel", function(){
			subscriptions.subscribe(null, testCallback, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with an error on missing subscription callback", function(){
			subscriptions.subscribe(testChannel, null, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with null with good inputs", function(){
			subscriptions.subscribe(testChannel, testCallback, function(error){
				expect(error).to.not.exist;
			});
		});
	});
});