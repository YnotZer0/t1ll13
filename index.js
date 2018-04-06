// load environment params from a file named .env that's .gitignore'd
require('dotenv').config('.env');
//require('dotenv').load({silent: true});
//console.log(process.env);

var cp = require('child_process'),
  cbot = require('./cleverbot'),
  recognize = require('./recognize'),
  synthesize = require('./synthesize'),
  fs = require('fs'),
  webcam = require('./webcam.js'),
  wvr = require('./visualrecog.js'),
  bot = require('./assistant.js');

var initiatedConversation = false;
var convcontext = {};

exports.parseResult = function (parsed) {
  if (!parsed) return;
  console.log('YOU: ' + parsed);
  //stop the mic from listening
  exports.mic.kill();

	//if it detects the words "what do you see", then can invoke webcam/take picture
	//then invoke VisualRecog service and determine what we think we can see
	 if(parsed=="PHOTO " || parsed=="Photo " || parsed=="photo ") {
		webcam.ask(parsed, function(response) {
			var stringoutput = JSON.stringify(response, null, 2);
			console.log('Opts: ' + stringoutput);
			
			webcam.takePhoto(response, function(data) {
				console.log('Image: ' + data); //returns filename
				wvr.detectface(data, function(faces_info) {
					console.log('Face(s) detected: '+ JSON.stringify(faces_info, null, 2));
					//could now use TTS to build up a STRING to say something about the detection
					var outputSpeech = '';
					var genderConfidence = faces_info.images[0].faces[0].gender.score;
					if(genderConfidence < 0.5) {
						outputSpeech += 'I am not sure if you are ';
					} else {
						outputSpeech += 'I am pretty sure you are ';
					}
					outputSpeech += faces_info.images[0].faces[0].gender.gender;
					outputSpeech += ' and I am ' 
					var ageConfidence = faces_info.images[0].faces[0].age.score;
					if(ageConfidence <= 0.3) {
						outputSpeech += 'not confident';
					} else if(ageConfidence <= 0.6) {
						outputSpeech += 'quite confident';
					} else if(ageConfidence <= 1){
						outputSpeech += 'very confident';
					}
					outputSpeech += ' that you are between ';
					outputSpeech += faces_info.images[0].faces[0].age.min;
					outputSpeech += ' and ';
					outputSpeech += faces_info.images[0].faces[0].age.max;
					outputSpeech += ' years old';
					
					synthesize.text(outputSpeech, function () {
						//this part now calls TTS and converts the text to speech to play back
					  if(cp.execSync('pgrep -f play').toString().split('\n').length < 3) {
						  //once it has finished playing it then reverts back to listening again
						exports.listen();
					  }
					});
				});
			});
		});
	} else {
 	  //this part calling the chatbot passing the text (swap out for Watson Conversation Service)
	  if(process.env.CONV=="CLEVERBOT") {
		  cbot.ask(parsed, function (response) {
			console.log('T1ll13: ' + response.output);
			synthesize.text(response.output, function () {
				//this part now calls TTS and converts the text to speech to play back
			  if(cp.execSync('pgrep -f play').toString().split('\n').length < 3) {
				  //once it has finished playing it then reverts back to listening again
				exports.listen();
			  }
			});
		  });
	  } else if(process.env.CONV=="WATSON") {
		  
		  if(initiatedConversation) {  //we've already started the conversation

			  bot.followup(parsed, convcontext, function (response) {
				initiatedConversation = true;
				convcontext = response.context;
				var somethingToSay = false;
				var speakOutput = '';
				//determine what INTENT was detected
				if(response.intents.length > 0) {
					var detectedIntent = response.intents[0].intent;
					console.log('Detected Intent: #'+detectedIntent);
				}
				if(response.output.action == 'display_time') {
					//user asked what time it is, so we get the local time
					speakOutput = 'The current time is ' + new Date().toLocaleTimeString();
					somethingToSay = true;
				} else if(response.output.action == 'end_conversation') {
					//user wanted to end conversation, reset to greeting
					initiatedConversation = false;
				}
				if(response.output.text.length != 0) {
					speakOutput = response.output.text[0];
					somethingToSay = true;
				};
				//only speak something if we've got something to say
				if(somethingToSay) {
					console.log('speakOutput ='+speakOutput);
					
					var replaceActionTags = speakOutput;
					var pos3 = speakOutput.indexOf('<wait3>');
					if(pos3 != -1) {
						replaceActionTags = speakOutput.replace('<wait3>', '<break time="3s"/>');
					}
					var pos4 = speakOutput.indexOf('<wait4>');
					if(pos4 != -1) {
						replaceActionTags = speakOutput.replace('<wait4>', '<break time="4s"/>');
					}
					var pos5 = speakOutput.indexOf('<wait5>');
					if(pos5 != -1) {
						replaceActionTags = speakOutput.replace('<wait5>', '<break time="5s"/>');
					}
					console.log('replaceActionTags ='+replaceActionTags);
					
					synthesize.text(replaceActionTags, function () {
						//this part now calls TTS and converts the text to speech to play back
					  if(cp.execSync('pgrep -f play').toString().split('\n').length < 3) {
						  //once it has finished playing it then reverts back to listening again
						if(!initiatedConversation) {
							exports.greeting();
						} else {
							exports.listen();
						}
					  }
					});
				};
			  });
		  }
	  }
  }
};


exports.greeting = function() {
//kick off the conversation by speaking first and then listening
	if(process.env.CONV=="WATSON") {
		  
		  if(!initiatedConversation) {  //we've just started the conversation from fresh
			  bot.ask('start', function (response) {
				initiatedConversation = true;
				convcontext = response.context;
				
				synthesize.text(response.output.text[0], function () {
					//this part now calls TTS and converts the text to speech to play back
				  if(cp.execSync('pgrep -f play').toString().split('\n').length < 3) {
					  //once it has finished playing it then reverts back to listening again
					//for now we'll put in a little delay so that the "microphone" doesn't pickup the "speaker"!
					setTimeout(function() {
						console.log('wait for a little bit...');
					}, 1500);
					exports.listen();
				  }
				});
			  });
		  };
	} else {
		exports.listen();
	};
};

exports.listen = function () {
  console.log('...I\'m now listening to you...');
  //exports.mic = cp.spawn('arecord', ['--format=S16_LE', '--rate=48000', '--channels=1']);
  exports.mic = cp.spawn('rec', ['-q', '-r', '48000', '-c', '1', '-e', 'signed-integer', '-b', '16', '-t', 'wav', '-']);

  recognize.speech(exports.mic.stdout, exports.parseResult);
};

//kick off the conversation by speaking first and then listening
if(!initiatedConversation) {
	exports.greeting();
} else {
	exports.listen();
}
