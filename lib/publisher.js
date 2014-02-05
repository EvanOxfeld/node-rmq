'use strict';

var publisher = require('./redis').getRedisClient();

exports.publish = function(channel, message){
	publisher.publish(channel, JSON.stringify(message));
};

publisher.on('error', function(err){
	console.log("There was an error related to Redis: " + err);
	throw err;
});