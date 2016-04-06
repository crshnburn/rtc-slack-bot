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
}).startRTM(function(err) {
	if (err) {
		console.error("Bot failed to connect to Slack. Error: " + err)
	}
})

controller.hears(['(task|story|epic|defect) (\d*)'],'ambient',function(bot, message){
  var matches = message.text.match(/(task|story|epic|defect) (\d*)/ig)
  var attachments = [];
  for(var i=0; i < matches.length; i++){
    var parts = matches[i].split(" ")
    var type = parts[0].toLowerCase()
    var id = parts[1]
    attachments.push({
    	"fallback": matches[i],
    	"color": "#16B8DF",
    	"title_link": process.env.JAZZ_URI + "/resource/itemName/com.ibm.team.workitem.WorkItem/" + id,
    	"title": type.charAt(0).toUpperCase() + type.slice(1) + " " + id
    })
  }
  if (attachments.length > 0) {
  	bot.reply(message, {
  		"attachments": attachments
  	})
  }
})
