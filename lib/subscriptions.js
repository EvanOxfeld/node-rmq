'use strict';

var subscriptions = {},
	activeSubscriptions = [];

var listener = require('redis').createClient();

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

});