/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var Botkit = require('botkit')
var controller = Botkit.slackbot({
  debug: false
})

var bot = controller.spawn({
  token: process.env.BOT_API_TOKEN
}).startRTM()

controller.hears(['(task|story|epic|defect) (\d*)'],'ambient',function(bot, message){
  var matches = message.text.match(/(task|story|epic|defect) (\d*)/ig)
  for(var i=0; i < matches.length; i++){
    var id = matches[i].split(" ")[1]
    bot.reply(message, process.env.JAZZ_URI + "/resource/itemName/com.ibm.team.workitem.WorkItem/"+id)
  }
})
