var Cleverbot = require('cleverbot-node');
cleverbot = new Cleverbot;
cleverbot.configure({botapi: "CC7jwayI76vrpmdX-Awhr4MSjHw"});

exports.ask = function (cleverMessage, callback) {
    cleverbot.write(cleverMessage, function(response) {

//		var stringoutput = JSON.stringify(response, null, 2);
//		console.log('CLEVERBOT: '+stringoutput);

		callback(response);
	});
//this is old and not used anymore
//  Cleverbot.prepare(function () {
//    cleverbot.write(cleverMessage, callback);
//  });

};
/*
 * example response back from cleverbot
{
  "cs": "MXYxCTh2MQlBdldYSUpHT1BaT0kJMUZ2MTUxOTkyNTg1Mwk2NHYicGxlYXNlIHdoYXQgTWlzdGVyICIuCTY0aU1pbmlzdGVyIHBsZWFzZS4J",
  "interaction_count": "1",
  "input": "\"please what Mister \".",
  "input_other": "",
  "input_label": "",
  "predicted_input": "",
  "accuracy": "",
  "output_label": "welcome",
  "output": "Minister please.",
  "conversation_id": "WXIJGOPZOI",
  "errorline": "Init:4000000,Full:7822,Other:500,Row:0,Score:1610,Id:291720676,Len:16,",
  "database_version": "3167",
  "software_version": "3233",
  "time_taken": "156",
  "random_number": "416",
  "time_second": "33",
  "time_minute": "37",
  "time_hour": "17",
  "time_day_of_week": "3",
  "time_day": "1",
  "time_month": "3",
  "time_year": "2018",
  "reaction": "",
  "reaction_tone": "",
  "emotion": "",
  "emotion_tone": "",
  "clever_accuracy": "16",
  "clever_output": "Minister please.",
  "clever_match": "",
  "CSRES30": "",
  "time_elapsed": "0",
  "filtered_input": "\"please what Mister \".",
  "filtered_input_other": "",
  "reaction_degree": "",
  "emotion_degree": "",
  "reaction_values": "",
  "emotion_values": "",
  "callback": "",
  "interaction_1": "\"please what Mister \".",
  "interaction_1_other": "Minister please.",
  "interaction_2": "",
  "interaction_3": "",
  "interaction_4": "",
  "interaction_5": "",
  "interaction_6": "",
  "interaction_7": "",
  "interaction_8": "",
  "interaction_9": "",
  "interaction_10": "",
  "interaction_11": "",
  "interaction_12": "",
  "interaction_13": "",
  "interaction_14": "",
  "interaction_15": "",
  "interaction_16": "",
  "interaction_17": "",
  "interaction_18": "",
  "interaction_19": "",
  "interaction_20": "",
  "interaction_21": "",
  "interaction_22": "",
  "interaction_23": "",
  "interaction_24": "",
  "interaction_25": "",
  "interaction_26": "",
  "interaction_27": "",
  "interaction_28": "",
  "interaction_29": "",
  "interaction_30": "",
  "interaction_31": "",
  "interaction_32": "",
  "interaction_33": "",
  "interaction_34": "",
  "interaction_35": "",
  "interaction_36": "",
  "interaction_37": "",
  "interaction_38": "",
  "interaction_39": "",
  "interaction_40": "",
  "interaction_41": "",
  "interaction_42": "",
  "interaction_43": "",
  "interaction_44": "",
  "interaction_45": "",
  "interaction_46": "",
  "interaction_47": "",
  "interaction_48": "",
  "interaction_49": "",
  "interaction_50": "",
  "message": "Minister please."
}
*/
