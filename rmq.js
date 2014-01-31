'use strict';

var publisher = require('./lib/publisher');

var uuid = require('node-uuid');

/**
 * Publish a message on the message bus
 * @param channel
 * @param message
 */
exports.publish = function(channel, message){
	publisher.publish(channel, message);
};

var subscriptions = require('./lib/subscriptions');

/**
 * @param channel - channel to listen for
 * @param callback - function executed when channel message received
 * @returns subscription id - this is required to unsubscribe to a channel
 */
exports.subscribe = function(channel, callback){
	var subscription = {
		callback: callback,
		id: generateSubscriptionId()
	};
	subscriptions.subscribe(channel, subscription);

	return subscription.id;
};

/**
 *
 * @param channel - the channel to stop listening to
 * @param subscriptionId - the subscriptionId returned by the subscribe function
 */
exports.unsubscribe = function(channel, subscriptionId){
	if(!channel){
		// TODO handle error
	}
	if(!subscriptionId){
		// TODO handle error
	}

	subscriptions.unsubscribe(channel, subscriptionId);
};

function generateSubscriptionId(){
	return uuid.v4();
}