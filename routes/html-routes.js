// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
	const bodyParser = require("body-parser");

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
  // Each of the below routes just handles the HTML page that the user gets sent to.

	app.get("/", function (req, res){
		res.sendFile(path.join(__dirname, "../public/index.html"));
	})

};
