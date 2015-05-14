var express = require('express');
var app = express();

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'M3wD1dk9HlGZ31r99uK8py0TM',
    consumerSecret: '9nAL1DeI7nBtALK4iB3COACdMvhwMHFQBWXNzqL4TyMJN5la44'
});

var accessToken = "3195001477-eXnqviy4J5vTthK9vaI5aejQsXRjUZtlfwiBp2U"
var accessTokenSecret = "OcHeshCkMofHW0YWydoHoquJod5D9EzB9xtPzccJIA3Fq"


var words = require ('./words.json');
var wordsAdjs = Object.keys(words)

var bot = {

	intervalId: null,

	run: function(delayMin) {
		if (!delayMin) delayMin = 60;
		var delayMillis = delayMin*60*1000  
		this.intervalId = setInterval(tweet(getRandomSentence), delayMillis);
	},

	kill: function() {
		clearInterval(this.intervalId);
	},

	tweet: function(status) {
		twitter.statuses("update", {
		        status: "Hello world!"
		    },
		    accessToken,
		    accessTokenSecret,
		    function(error, data, response) {
		        if (error) {
		            // something went wrong 
		        	console.log(error)
		        } else {
		            // data contains the data sent by twitter 
		        	console.log(data)
		        }
		    }
		);
	},

	getRandomSentence: function() {
		var adj = wordsAdjs[parseInt(Math.random()*wordsAdjs.length)];
		return this.generateSentence(adj);
	},

	generateSentence: function(adj) {	
		var noun = words[adj];
		return "Is our need for " + noun + " " + adj + "?";
	}	

}

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});


bot.run(0.5)

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
