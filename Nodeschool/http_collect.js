var bl = require('bl');
var http = require('http');

http.get(process.argv[2], urlFetched);

function urlFetched(response) {
	response.pipe(bl(receiveData));
}

function receiveData(err, data) {
	data = data.toString();
	console.log(data.length);
	console.log(data);
}