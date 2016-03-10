/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var Botkit = require('botkit')
var controller = Botkit.slackbot({
  debug: false
})

var bot = controller.spawn({
  token: "xoxb-25814718499-sXqQ27waMvKPtS67uozQQ1mR"
}).startRTM()

controller.hears(['(task|story|epic|defect) (\d*)'],'ambient',function(bot, message){
  var matches = message.text.match(/(task|story|epic|defect) (\d*)/i)
  var id = matches[2]
  bot.reply(message, "https://jazz306.hursley.ibm.com:9443/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/"+id)
})

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
