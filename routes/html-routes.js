const htmlRoutes = (function (){
	const express = require("express");
	const path = require("path");

	const router = express.Router();

	router.get("/", function (req, res){
		res.end("Welcome to 8hrs!");
	});

	return router;
})();
console.log("html-routes.js loaded");
module.exports = htmlRoutes;