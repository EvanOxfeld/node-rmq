'use strict';

var subscriptions = {},
	activeSubscriptions = [];

var listener = require('./redis').getRedisClient(),
	_ = require('lodash');

exports.subscribe = function(channel, subscription){
	if(!subscriptions[channel]){
		subscriptions[channel] = [];
	}

	subscriptions[channel].push(subscription);

	listenTo(channel);
};

exports.unsubscribe = function(channel, subscriptionId){
	if(!channel){
		// TODO handle error
	}

	var channelSubscriptions = subscriptions[channel];

	var subIndex = _.findIndex(channelSubscriptions, function(subscription){
		return subscription.id === subscriptionId;
	});

	if(!subIndex){
		throw new Error("Tried to unsubscribe with invalid subscription id");
	}

	// TODO unsubscribe?

	return channelSubscriptions.splice(subIndex, 1);
};

function listenTo(channel){
//	var isListeningToChannel = !(_.find(activeSubscriptions, function(s){ s === channel }));
//
//	if(!isListeningToChannel){
		listener.subscribe(channel);
//	}
}

listener.subscribe('commands');
listener.subscribe('events');

listener.on('message', function(channel, message){
	console.log("Message received from Redis on channel " + channel);
	console.log("Message body: " + message);

	_.each(subscriptions[channel], function(callback){
		console.log('running a thing');
		callback(JSON.parse(message));
	});
});

listener.on('error', function(err){
	console.log("There was an error related to Redis: " + err);
	throw err;
});