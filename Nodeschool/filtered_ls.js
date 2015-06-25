var fs = require('fs');
var path = require('path');

function displayFiles(err, list) {
	for(var file in list) {
		if(path.extname(list[file]) === "." + process.argv[3]) {
			console.log(list[file]);
		}
	}
}

fs.readdir(process.argv[2], displayFiles);