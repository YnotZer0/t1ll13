var watson = require('watson-developer-cloud');

var conversation = new watson.ConversationV1({
	username: process.env.CONV_USERNAME,
	password: process.env.CONV_PASSWORD,
	version_date: process.env.CONV_VERSION
});

var workspace_id = process.env.CONV_WORKSPACE;

exports.ask = function (utterance, callback) {
	//this is the first interaction therefore we are not passing any text to start the conversation
	conversation.message({
		workspace_id: workspace_id
	}, processResponse);

	function processResponse(err, response) {
		if(err) {
			console.log(JSON.stringify(err, null, 2));
			return;
		}
		console.log('Greeting Response: '+JSON.stringify(response, null, 2));
		callback(response);
	};
};

exports.followup = function(utterance1, context1, callback) {
	//as we are continuing the conversation we shall pass text and context to the WA service
	conversation.message({
		workspace_id: workspace_id,
		input: {text: utterance1 },
		context: context1,
	}, processResponseFollowup);

	function processResponseFollowup(err, response) {
		if(err) {
			console.log(JSON.stringify(err, null, 2));
			return;
		}
		console.log('Ongoing Response; '+JSON.stringify(response, null, 2));
		callback(response);
	};
};

