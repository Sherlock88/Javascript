var fs = require('fs');

function countLine(err, file) {
	file = file.toString();
	lineCount = file.split('\n').length - 1;
	console.log(lineCount);
}

file = fs.readFile(process.argv[2], countLine);