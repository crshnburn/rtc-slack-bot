/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
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

controller.hears('(task|story|epic|defect) (\\d+)','ambient',function(bot, message){
  var matches = message.text.match(/(task|story|epic|defect) (\d+)/ig)
  var attachments = []
  var ids = []
  if (matches != undefined) {
    for(var i=0; i < matches.length; i++){
      var parts = matches[i].split(" ")
      var type = parts[0].toLowerCase()
      var id = parts[1]
      if(ids.indexOf(id) == -1){
        ids.push(id)
        attachments.push({
        	"fallback": matches[i],
        	"color": "#16B8DF",
        	"title_link": process.env.JAZZ_URI + "/resource/itemName/com.ibm.team.workitem.WorkItem/" + id,
        	"title": type.charAt(0).toUpperCase() + type.slice(1) + " " + id
        })
      }
    }
  }
  if (attachments.length > 0) {
  	bot.reply(message, {
  		"attachments": attachments
  	})
  }
})
