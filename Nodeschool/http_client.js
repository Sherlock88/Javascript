var http = require('http');

http.get(process.argv[2], urlFetched);

function urlFetched(response) {
	response.setEncoding("utf8");
	response.on("data", receiveData);
}

function receiveData(data) {
	console.log(data);
}