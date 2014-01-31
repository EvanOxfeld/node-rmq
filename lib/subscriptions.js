'use strict';

var subscriptions = {},
	activeSubscriptions = [];

var listener = require('./redis').getRedisClient(),
	_ = require('lodash');

exports.add = function(channel, callback){
	if(!subscriptions[channel]){
		subscriptions[channel] = [];
	}

	subscriptions[channel].push(callback);

	listenTo(channel);
};

function listenTo(channel){
	var isListeningToChannel = _.find(activeSubscriptions, function(s){ s === channel }) !== null;
	if(!isListeningToChannel){
		listener.subscribe(channel);
	}
}

listener.on('message', function(channel, message){
	_.each(subscriptions[channel], function(callback){
		callback(message);
	});
});

listener.on('error', function(err){
	console.log("There was an error related to Redis: " + err);
	throw err;
});