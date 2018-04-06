const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');  //use GPIO pin 17 and specify it is output
var blinkInterval = setInterval(blinkLED, 250); //run blinkLED function every 250ms



function blinkLED() {
	if(led.readSync() === 0) {  //check state if state is 0/off
		led.writeSync(1);
	} else {
		led.writeSync(0);
	}
}

function endBlink() { 
	clearInterval(blinkInterval); //stop blink intervals
	led.writeSync(0); //turn off LED
	led.unexport();
}	

setTimeout(endBlink, 5000); //stop blinking after 5 seconds

//handle if use performs a ctrl+c
process.on('SIGINT', function() {
	led.unexport();
});
