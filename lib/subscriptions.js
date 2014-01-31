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

	return channelSubscriptions.splice(subIndex, 1);
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