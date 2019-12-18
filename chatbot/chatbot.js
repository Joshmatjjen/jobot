'use strict';
const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const mongoose = require('mongoose');

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};
console.log(process.env.NODE_ENV);

const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

// const Registration = require('../models/Registration');
const Registration = mongoose.model('registration');

// console.log(sessionClient);

module.exports = {
  textQuery: async function(text, userID, parameters = {}) {
    let self = module.exports;
    let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, userID, parameters = {}) {
    let self = module.exports;
    let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      // queryParams: {
      //   payload: {
      //     data: structjson.jsonToStructProto(parameters)
      //   }
      // }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case 'recommendcourses-yes':
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }
        break;
    }

    return responses;
  },

  saveRegistration: async function(fields) {
    const registration = new Registration({
      name: fields.name.stringValue,
      address: fields.address.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue,
      registerDate: Date.now(),
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (error) {
      console.log(error);
    }
  },
};
