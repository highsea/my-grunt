var express = require('express');
var app = module.exports = express.createServer();app.get('*', function (req, res) {
	var query = req.query;
	var callback = req.query.callback;
	delete query.callback;
	res.end(callback + '(' + JSON.stringify(query, undefined, ' ') + ');');
	});
	app.listen(9000);