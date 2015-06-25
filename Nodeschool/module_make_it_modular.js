var fs = require('fs');
var path = require('path');

module.exports = function(directory, extension, callback) {
	var files = [];
	fs.readdir(directory, function(err, list) {
	if(err) {
		return callback(err);
	}
	else {
		for(var file in list) {
			if(path.extname(list[file]) === "." + extension) {
				files.push(list[file]);
			}
		}
		return callback(null, files);
	}
	});
};
