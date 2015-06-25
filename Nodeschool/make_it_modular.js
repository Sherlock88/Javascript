var fileModule = require('./module_make_it_modular');

var files = fileModule(process.argv[2], process.argv[3], displayFiles);

function displayFiles(err, files) {
	if(err) {
		console.log("Error in I/O");
	}
	else {
		for(var file in files) {
			console.log(files[file]);
		}
	}
}