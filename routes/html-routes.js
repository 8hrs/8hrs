const htmlRoutes = (function (){
	const express = require("express");
	const path = require("path");

	const router = express.Router();

	router.get("/", function (req, res){
		res.sendFile(path.join(__dirname,"../public/index.html"));
	});

	return router;
})();
console.log("html-routes.js loaded");
module.exports = htmlRoutes;