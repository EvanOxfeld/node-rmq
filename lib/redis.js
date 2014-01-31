'use strict';

var redis = require('redis');

exports.getRedisClient = function(config){
	if(!config){
		config = require('./config').redisConfig;
	}

	return redis.createClient(config);
};