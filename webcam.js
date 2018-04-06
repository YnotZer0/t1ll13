var NodeWebcam = require( "node-webcam" );
//Default options
var opts = {
    //Picture related
    width: 1280,
    height: 720,
    quality: 100,
    //Delay to take shot
    delay: 0,
    //Save shots in memory
    saveShots: true,
    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",
    //Logging
    verbose: false
};

//Creates webcam instance
var Webcam = NodeWebcam.create( opts );

//Will automatically append location output type
////Webcam.capture( "test_picture", function( err, data ) {} );
//Also available for quick use

////NodeWebcam.capture( "test_picture", opts, function( err, data ) {
////
////});

exports.ask = function (message, callback) {
  console.log('Webcam: ' + 'called .ask');
  
  //Get list of cameras
  Webcam.list( function( list ) {
    //Use another device
    var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
    callback(anotherCam);
/*
{
  "opts": {
    "device": "/dev/video0",
    "topBanner": false,
    "bottomBanner": false,
    "title": false,
    "subTitle": false,
    "timestamp": false,
    "greyscale": false,
    "saturation": false,
    "skip": false,
    "setValues": {},
    "width": 1280,
    "height": 720,
    "quality": 100,
    "delay": 0,
    "saveShots": true,
    "output": "jpeg",
    "callbackReturn": "location",
    "verbose": false
  },
  "shots": []
}
*/
  });
};

exports.takePhoto = function (opts, callback) {
	Webcam.capture( "test_picture", function( err, data ) {
		console.log('capture: ' + data); //test_picture.jpg
		callback(data);
	});
};

