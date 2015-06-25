var http = require('http')
var url = require('url')

var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'application/json' })
	var parsedURL = url.parse(req.url, true)
	var query_string = parsedURL.query.iso
	var api_end = parsedURL.pathname
	var date = new Date(query_string)
	if(api_end === "/api/parsetime") {
		var iso_time = {
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		}
		res.end(JSON.stringify(iso_time))
	}
	else {
		var unix_time = {
			unixtime: date.getTime()
		}
		res.end(JSON.stringify(unix_time))
	}
})
server.listen(Number(process.argv[2]))