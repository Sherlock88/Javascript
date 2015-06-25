var net = require('net')
var server = net.createServer(function (socket) {
	var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hours = date.getHours()
    var minutes = date.getMinutes()
	if(month < 11) {
		var server_time = year + "-0" + month + "-" + day + " " + hours + ":" + minutes + "\n"
	}
	else {
		var server_time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + "\n"
	}
		
	socket.write(server_time)
	socket.end()
})
server.listen(Number(process.argv[2]))