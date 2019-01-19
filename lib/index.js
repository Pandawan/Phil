"use strict";

require("@babel/polyfill");

var _askSdkCore = require("ask-sdk-core");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  handle: function () {
    var _handle = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(handlerInput) {
      var charity, speechText;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _axios.default.get('https://medibot.appspot.com/donate');

            case 2:
              charity = _context.sent;
              speechText = "Ok, I'll pay 0.015 to ".concat(charity.data, ".");
              return _context.abrupt("return", handlerInput.responseBuilder.speak(speechText).reprompt(speechText).withSimpleCard("Paying 0.015 to ".concat(charity.data, "."), speechText).getResponse());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function handle(_x) {
      return _handle.apply(this, arguments);
    }

    return handle;
  }()
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