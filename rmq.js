'use strict';

var publisher = require('./lib/publisher'),
	subscriptions = require('./lib/subscriptions');

module.exports = {
	publish: function(channel, message){
		console.log("Publishing message to channel: " + channel);
		console.log("Message body: " + JSON.stringify(message));

		publisher.publish(channel, message);
	},

	subscribe: function(channel, callback){
		if(!callback){
			throw new Error("callback null");
		}

		console.log("Subscribing to " + channel);

		subscriptions.subscribe(channel, callback);
	},

	unsubscribe: function(channel, subscriptionId){
		if(!channel){
			// TODO handle error
		}
		if(!subscriptionId){
			// TODO handle error
		}

		subscriptions.unsubscribe(channel, subscriptionId);
	}
};