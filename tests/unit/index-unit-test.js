'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('Index unit tests', function () {
    var subject;
    var updateFunctionConfigurationStub = sinon.stub();
    var event;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        var awsSdkStub = {
            Lambda: function () {
                this.updateFunctionConfiguration = updateFunctionConfigurationStub;
            }
        };

        mockery.registerMock('aws-sdk', awsSdkStub);
        subject = require('../../src/index');
    });
    beforeEach(function () {
        updateFunctionConfigurationStub.reset().resetBehavior();
        updateFunctionConfigurationStub.yields();
        event = {
            ResourceProperties: {
                FunctionName: 'functionName'
            }
        };
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if FunctionName is not set', function (done) {
            delete event.ResourceProperties.FunctionName;
            function fn () {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property FunctionName/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(updateFunctionConfigurationStub.calledOnce).to.equal(true);
                done();
            });
        });
        it('should fail due to updateConfigurationError', function (done) {
            updateFunctionConfigurationStub.yields('Error');
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal('Error');
                expect(response).to.equal(undefined);
                expect(updateFunctionConfigurationStub.calledOnce).to.equal(true);
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(updateFunctionConfigurationStub.calledOnce).to.equal(true);
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(updateFunctionConfigurationStub.called).to.equal(false);
                done();
            });
        });
    });
});
