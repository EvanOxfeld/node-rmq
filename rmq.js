'use strict';

var publisher = require('publisher');

exports.publish = function(channel, message){
	publisher.publish(channel, message);
};

var subscriptions = require('./lib/subscriptions');

exports.subscribe = function(channel, callback){
	subscriptions.add(channel, callback);
};