var bl = require('bl');
var http = require('http');
var responses = [];
var hitCount = 0;

for(var i = 0; i < 3; i++) {
	getURL(i);
}

function printHTML() {
	for(var i = 0; i < 3; i++) {
		console.log(responses[i]);
	}
}


function getURL(i) {
	http.get(process.argv[2 + i], function (response) {
	response.pipe(bl(function (err, data) {
	responses[i] = data.toString();
	hitCount++;
	if(hitCount == 3) {
		printHTML();
	}
	}));
	});
}



