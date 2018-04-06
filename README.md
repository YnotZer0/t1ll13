T1ll13-bot
===============

## Description

Yep, I based this on Pumpkin and will take it further, much further

## Installation

`npm install`

## Dependencies

Generally, running `npm install` should suffice.

This module however, requires you to install [SoX](http://sox.sourceforge.net).
as it uses rec rather than arecord

### For Raspberry Pi
`sudo apt-get install sox libsox-fmt-all`

## Usage

Create a .env file and populate it with the values you want

`STT=WIT 
STT_TOKEN=XXX 
STT_DELAY=3000 
TTS=GOOGLE 
TTS_LANG=ru`

`STT=WATSON
STT_USERNAME=XXX 
STT_PASSWORD=XXX 
TTS=WATSON 
TTS_USERNAME=XXX 
TTS_PASSWORD=XXX`

`WVR=WATSON
WVR_APIKEY=XXX 
WVR_VERSION=XXX`

You can then 
`node index.js`
or use [forever]
`forever start index.js`

##potential issues

I am running UBuntu Mate on my RPi3 and I was not able to hear sound output.
This is because I have a HDMI plugged in and this will be the default.

However, I typed in a terminal:
`sudo amixer cset numid=3 1`
and the sound output was now working as the 1 tells it to use the 3.5mm jack.
possibly need to edit /boot/config.txt and comment out hdmi_drive value


