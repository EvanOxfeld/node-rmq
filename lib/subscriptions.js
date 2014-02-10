'use strict';

var subscriptions = {};

var listener = require('./redis').getRedisClient(),
	_ = require('lodash');

exports.subscribe = function(channel, subscription, callback){
	if(!channel){
		callback(new Error("Invalid channel: " + channel));
		return;
	}

	if(!subscription){
		callback(new Error("Invalid subscription"));
		return;
	}

	if(!subscriptions[channel]){
		subscriptions[channel] = [];
	}

	subscriptions[channel].push(subscription);

	listener.subscribe(channel);
	callback(null);
};

listener.subscribe('commands');
listener.subscribe('events');

listener.on('message', function(channel, message){

	_.each(subscriptions[channel], function(callback){
		callback(JSON.parse(message));
	});
});

listener.on('error', function(err){
	console.log("There was an error related to Redis: " + err);
	throw err;
});