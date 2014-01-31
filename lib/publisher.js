'use strict';

var publisher = require('redis').createClient();

exports.publish = function(channel, message){
	publisher.publish(channel, message);
};