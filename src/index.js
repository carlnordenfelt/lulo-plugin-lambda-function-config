'use strict';

var aws = require('aws-sdk'); 
var lambda = new aws.Lambda({ apiVersion: '2015-03-31' });

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.FunctionName) {
        throw new Error('Missing required property FunctionName');
    }
};

pub.create = function (event, _context, callback) {
    var params = event.ResourceProperties;
    delete params.ServiceToken;
    lambda.updateFunctionConfiguration(params, function (error) {
        return callback(error);
    });
};

pub.update = function (event, context, callback) {
    pub.create(event, context, callback);
};

pub.delete = function (_event, _context, callback) {
    callback();
};

module.exports = pub;
