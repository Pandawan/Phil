"use strict";

var _askSdkCore = require("ask-sdk-core");

var LaunchRequestHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle: function handle(handlerInput) {
    var speechText = "Hi, I'm API-Quagmire. It's time to save the world, one donation at a time.";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Hello, time to save the world!', speechText).getResponse();
  }
};
var HelpIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle: function handle(handlerInput) {
    var speechText = 'You can ask me to pay a random charity.';
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Ask me to "pay a random charity"', speechText).getResponse();
  }
};
var PayCharityIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'PayCharityIntent';
  },
  handle: function handle(handlerInput) {
    var speechText = "Ok, I'll 0.015 pay to {charity}.";
    return handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard('Paying 0.015 to {charity}.', speechText).getResponse();
  }
};
var CancelAndStopIntentHandler = {
  canHandle: function canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle: function handle(handlerInput) {
    var speechText = 'Goodbye!';
    return handlerInput.responseBuilder.speak(speechText).withSimpleCard('Goodbye!', speechText).getResponse();
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
exports.handler = _askSdkCore.SkillBuilders.custom().addRequestHandlers(LaunchRequestHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, PayCharityIntentHandler).addErrorHandlers(SkillErrorHandler).lambda();