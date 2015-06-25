/*
This problem requires you to implement a log watching solution (similar to the tail -f command in UNIX). However, in this case, the log file is hosted on a remote machine.

You have to implement the following:

1. A server side program to monitor the given log file and capable of streaming updates that happen in it. This will run on the same machine as the log file.

2. A web based client (accessible via URL like http://localhost/log) that prints the updates in the file as when they happen and NOT upon page refresh. The page should be loaded once and it should keep getting updated in real-time. 

The server should not retransmit the entire file every time. It should only send the updates.

You can not use off-the-shelf libraries that provide tail-like functionalities.
*/


var fs = require('fs')
var http = require('http')
var url = require('url')


var log_file = "./log_file.txt"
var log_file_ajax = "./log_watcher_client.html"
var existing_file_data = fs.readFileSync(log_file)
var existing_data_length = existing_file_data.length
var client_end = fs.readFileSync(log_file_ajax)
var pending_data = String(existing_file_data).replace(/\n/g, "<br/>")


var server = http.createServer(function (request, response) {
	var parsedURL = url.parse(request.url, true)
	var api_end = parsedURL.pathname
	var date = new Date()
	console.log("API [" + date.toISOString() + "]: " + api_end)
	if(api_end === "/log")
		response.end(client_end) 
	else
		if(api_end === "/log_data") {
			response.end(pending_data)
			
			// Print on console log only if unread data is available
			if(pending_data != "") {
				pending_data = ""
				console.log(pending_data)
			}
		}
		else
			response.end("Incorrect endpoint: " + api_end)
})
server.listen(8888)

fs.watchFile(log_file, function (curr, prev) {
	var file_stream = fs.readFileSync(log_file)
	
	// Read modified data and its length
	var modified_file_data = file_stream.toString()
	var modified_data_length = modified_file_data.length

	// Extract data that has actually changed
	pending_data = modified_file_data.substring(existing_data_length, modified_data_length + 1)
	
	// Update existing data and its length
	existing_file_data = modified_file_data
	existing_data_length = modified_data_length
});
