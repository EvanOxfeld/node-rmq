var expect = require('chai').expect;

var rmq = require('../rmq'),
	testChannel = 'testChannel',
	testMessage = { test: 'messsage' },
	testCallback = function(){ new Boolean(true); };

describe("rmq", function(){
	describe("publish", function(){
		it("should callback with an error on missing channel", function(){
			rmq.publish(null, testMessage, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with an error on missing message", function(){
			rmq.publish(testChannel, null, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with null with good inputs", function(){
			rmq.publish(testChannel, testMessage, function(error){
				expect(error).to.not.exist;
			});
		});
	});

	describe("subscribe", function(){
		it("should callback with an error on missing channel", function(){
			rmq.subscribe(null, testCallback, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with an error on missing subscription callback", function(){
			rmq.subscribe(testChannel, null, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with null with good inputs", function(){
			rmq.subscribe(testChannel, testCallback, function(error){
				expect(error).to.not.exist;
			});
		});
	});
});