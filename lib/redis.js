'use strict';

var redis = require('redis');

exports.getRedisClient = function(config){
	if(!config){
		config = require('./defaultRedisConfig').config;
	}

	return redis.createClient(config);
};