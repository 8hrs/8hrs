const apiRoutes = (function(){
	const express = require("express");
	const path = require("path");
	const connection = require("../config/connection.js");

	const router = express.Router();

	router.get("/", function (req, res){
		res.end("api routes");
	});

	return router;
})();
console.log ("apiController.js loaded");
module.exports = apiRoutes;