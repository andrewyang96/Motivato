var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (req.query["query"] != undefined) {
		var searchQuery = encodeURI(req.query["query"]);
		var redirectURL = "https://www.google.com/search?q=" + searchQuery;
		console.log("Redirecting to " + redirectURL);
		res.writeHead(301, {Location: redirectURL});
		res.end();
		return;
	}
	res.render('index');
});

module.exports = router;
