const apiRoutes = (function(){
	const express = require("express");
	const path = require("path");
	const connection = require("../config/connection.js");

	const router = express.Router();

	router.get("/", function (req, res){
		res.end("api routes");
	});

	router.post("/campaigns", function (req, res){
		res.end("placeholder for the result of searching the database for existing campaigns");
	});

	return router;
})();
console.log ("apiController.js loaded");
module.exports = apiRoutes;