'use strict';

var publisher = require('./lib/publisher'),
	subscriptions = require('./lib/subscriptions');

var returning = " Returning with no action.";

var channelError = "You are attempting to act on a channel but your channel is null or undefined." + returning,
	messageError = "You are attempting to publish but your message is null or undefined." + returning,
	callbackError = "You are attempting to subscribe to a channel but your callback is null or undefined." + returning;

module.exports = {
	publish: function(channel, message, callback){
		if(!channel){
			var err = new Error(channelError);
			console.warn(err.stack);
			callback(err);
			return;
		}

		if(!message){
			var err = new Error(messageError);
			console.warn(err.stack);
			callback(err);
			return;
		}

		publisher.publish(channel, message, function(error){
				if(error){
					callback(error);
					return;
				}

				callback(null);
		});
	},

	subscribe: function(channel, subCallback, errCallback){
		if(!channel){
			var err = new Error(channelError);
			console.warn(err.stack);
			errCallback(err);
			return;
		}

		if(!subCallback){
			var err = new Error(callbackError);
			console.error(err.stack);
			errCallback(err);
			return;
		}

		subscriptions.subscribe(channel, subCallback, function(error){
			if(error){
				errCallback(error);
				return;
			}

			errCallback(null);
		});
	}
};