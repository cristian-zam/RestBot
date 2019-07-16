// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const db=require('./config/databaseQuery');
const facebookData=require('./config/facebookAPI');

//conect db
db.connect();

//export db
var userInputMessage = "";
var dialogflowResponse = "";
var facebookUserId = "";
var facebookUserName = "";

//Información del restaurante
var restaurantName = "Restaurante de Ejemplo";
var imageMenu = "https://i.ibb.co/K6vQtPj/imagen-Menu.jpg";
var imageRestaurant = "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg";

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  userInputMessage = JSON.parse(JSON.stringify(request.body.queryResult.queryText));
  dialogflowResponse = JSON.parse(JSON.stringify(request.body.queryResult.fulfillmentMessages.text.text[0])); 

  console.log('User input: ' + userInputMessage);
  console.log('DialogFlow response: ' + dialogflowResponse);
  
  //Añadimos los datos a la base de datos
  db.insertUserInput(userInputMessage);
  db.insertDialogflowResponseQuery(dialogflowResponse);
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
function pet(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);    
}

function menu(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
  agent.add(restaurantName);
  agent.add(new Card({
           title: `Title: Menu del restaurant`,
           imageUrl: imageRestaurant,
           text: `Este es el menú de nuestro restaurante, esperamos sea de tu agrado. `,
           buttonText: 'Menu',
           buttonUrl: imageMenu
         })
       );
}


function contact(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
  
}

function discount(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
}

function help(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
}

function service(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
}

function schedule(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
}

function thanks(agent){
  db.insertDialogflowResponseQuery(dialogflowResponse);
}

function reserve(agent){

}

function reserveYes(agent){

}

function reserveNo(agent){

}

function reserveName(agent){

}

function reservePhone(agent){

}

function reserveMail(agent){

}

function reserveDate(agent){

}


  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('WelcomeIntent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('PetFriendlyIntent', pet);
  intentMap.set('MenuIntent', menu);
  intentMap.set('ContactIntent', contact);
  intentMap.set('DiscountIntent',discount);
  intentMap.set('HelpIntent', help);
  intentMap.set('HomeServiceIntent', service);
  intentMap.set('ScheduleIntet', schedule);
  intentMap.set('ThanksIntent', thanks);
  //reservacion-escalera
  intentMap.set('ReserveIntent', reserve);
  intentMap.set('ReserveIntent - ReservYesIntent', reserveYes);
  intentMap.set('ReserveIntent - no', reserveNo);
  //reservacion-yes
  intentMap.set('ReserveIntent - ReserveNameIntent',reserveName);
  intentMap.set('ReserveIntent - ReservePhoneIntent', reservePhone);
  intentMap.set('ReserveIntent - ReserveEmailPeopleIntent', reserveMail);
  intentMap.set('ReserveIntent - ReserveDateIntent', reserveDate);

  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
