'use strict';

var publisher = require('./redis').getRedisClient();

exports.publish = function(channel, message, callback){
	if(!channel){
		callback(new Error("Invalid channel: " + channel));
		return;
	}

	if(!message){
		callback(new Error("Invalid message: " + message));
		return;
	}

	publisher.publish(channel, JSON.stringify(message));
	callback(null);
};

publisher.on('error', function(err){
	console.log("There was an error related to Redis: " + err);
	throw err;
});