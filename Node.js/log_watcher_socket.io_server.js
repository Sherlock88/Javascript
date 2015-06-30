/*
This problem requires you to implement a log watching solution (similar to the tail -f command in UNIX). However, in this case, the log file is hosted on a remote machine.

You have to implement the following:

1. A server side program to monitor the given log file and capable of streaming updates that happen in it. This will run on the same machine as the log file.

2. A web based client (accessible via URL like http://localhost/log) that prints the updates in the file as when they happen and NOT upon page refresh. The page should be loaded once and it should keep getting updated in real-time. 

The server should not retransmit the entire file every time. It should only send the updates.

You can not use off-the-shelf libraries that provide tail-like functionalities.
*/


var http = require('http')
var socket_io = require('socket.io')(http);
var url = require('url')
var fs = require('fs');


var log_file = "./log_file.txt"
var log_watcher_socket_io_client = "./log_watcher_socket.io_client.html"
var existing_file_data = fs.readFileSync(log_file)
var existing_data_length = existing_file_data.length
var log_watcher_polling_client_html = fs.readFileSync(log_watcher_socket_io_client)


/*var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs');
app.listen(8888)*/


server = http.createServer(handler)
io = socket_io.listen(server);
server.listen(8888);
console.log('Server listening on localhost:8888');


function handler(req, res) {
  fs.readFile(log_watcher_socket_io_client, function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading ' + log_watcher_socket_io_client);
    }
    res.writeHead(200);
    res.end(data);
  });
}


// Creating a new WebSocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {  
	fs.watchFile(log_file, function(curr, prev) {
		var file_stream = fs.readFileSync(log_file)
	
		// Read modified data and its length
		var modified_file_data = file_stream.toString()
		var modified_data_length = modified_file_data.length

		/*
		* Extract data that has actually changed
		* Exclude the trailing newline charater as it silently fails the JSON parser
		*/
		pending_data = modified_file_data.substring(existing_data_length, modified_data_length - 1)
		
		/*
		* [Issue]    : If the client page is refreshed, it establishes multiple WebSocket connections.
		*              Because of having of more than one connections alive simultaneously,
		*              the client receives empty replies for subsequent watchFile() triggers.
		*              As a result, JSON parsing fails at client end.
		* [Reproduce]: Refresh the client page immediately after server is started.
		* [Solution] : Maintaining unique session ID and keep track of sockets 
		*              belonging to a particular session ID.
		*/
		console.log("[S: " + socket.id + "][L:" + pending_data.length + "]: " + pending_data)
		json_data = JSON.stringify({ pending: pending_data })
		socket.emit('notification', json_data);
	
		// Update existing data and its length
		existing_file_data = modified_file_data
		existing_data_length = modified_data_length
	});
});