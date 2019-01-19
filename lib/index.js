"use strict";

var _askSdkCore = require("ask-sdk-core");

var LaunchRequestHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle: function handle(handlerInput) {
    var speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};
var HelloWorldIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle: function handle(handlerInput) {
    var speechText = 'Hello World!';
    return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};
var HelpIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle: function handle(handlerInput) {
    var speechText = 'You can say hello to me!';
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};
var CancelAndStopIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle: function handle(handlerInput) {
    var speechText = 'Goodbye!';
    return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Hello World', speechText).getResponse();
  }
};
var SessionEndedRequestHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle: function handle(handlerInput) {
    console.log("Session ended with reason: ".concat(handlerInput.requestEnvelope.request.reason));
    return handlerInput.responseBuilder.getResponse();
  }
};
var SkillErrorHandler = {
  canHandle: function canHandle(handlerInput, error) {
    return true;
  },
  handle: function handle(handlerInput, error) {
    console.log("Error handled: ".concat(error.message));
    return handlerInput.responseBuilder.speak("Sorry, I can't understand the command. Please say again.").reprompt("Sorry, I can't understand the command. Please say again.").getResponse();
  }
};
exports.handler = _askSdkCore.SkillBuilders.custom().addRequestHandlers(LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler).addErrorHandlers(SkillErrorHandler).lambda();