'use strict';

var redis = require('redis');

exports.getRedisClient = function(config){
	return redis.createClient(config);
};