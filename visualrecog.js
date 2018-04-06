var watson = require('watson-developer-cloud'),
    fs = require('fs');

var visual_recognition = new watson.VisualRecognitionV3({
	api_key: process.env.VRG_APIKEY,
	version_date: process.env.VRG_VERSION
});

exports.detectface = function (input_image, callback) {
  if (process.env.VRG == 'WATSON') {	
	  
  var parameters = {
    image_file: fs.createReadStream(input_image)
  }
	visual_recognition.detectFaces(parameters, function(err, response) {
		if(err) {
			console.log('error: '+ err);
			callback(err);
		} else {
			console.log(JSON.stringify(response, null, 2));
			callback(response);
		}
	});
  }
};

/*
{
  "images": [
    {
      "faces": [
        {
          "age": {
            "max": 44,
            "min": 35,
            "score": 0.403753
          },
          "face_location": {
            "height": 649,
            "left": 484,
            "top": 138,
            "width": 644
          },
          "gender": {
            "gender": "MALE",
            "score": 0.970688
          }
        }
      ],
      "image": "test_picture.jpg"
    }
  ],
  "images_processed": 1
}
//I am pretty sure you are MALE and I am not confident that you are between 35 and 44 years old

*/
