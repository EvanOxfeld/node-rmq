'use strict';

var redis = require('redis');
var redisConfig = require('./config').redisConfig;

exports.getRedisClient = function(){
	return redis.createClient(redisConfig);
};