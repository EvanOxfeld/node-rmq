var expect = require('chai').expect;

var publisher = require('../lib/publisher'),
	testChannel = 'testChannel',
	testMessage = { test: 'message' }

describe("publisher", function(){
	describe("publish", function(){
		it("should callback with an error on missing channel", function(){
			publisher.publish(null, testMessage, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with an error on missing message", function(){
			publisher.publish(testChannel, null, function(error){
				expect(error).to.exist;
			});
		});

		it("should callback with null with good inputs", function(){
			publisher.publish(testChannel, testMessage, function(error){
				expect(error).to.not.exist;
			});
		});
	});
});