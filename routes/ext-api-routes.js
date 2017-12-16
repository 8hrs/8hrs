const ext_apiRoutes = (function(){
	const express = require("express");
	const path = require("path");
	const bodyParser = require("body-parser");
	const gd = require("../ext_api/glassdoor.js");
	// const connection = require("../config/connection.js");

	const router = express.Router();
	router.use(bodyParser.urlencoded({extended: false}));
	router.use(bodyParser.json());

	router.post("/employer-search", function (req, res){
		console.log("/gd/employer-search");
		let state = JSON.parse(Object.keys(req.body)[0]).state;
		let city = JSON.parse(Object.keys(req.body)[0]).city;
		let searchTerms = JSON.parse(Object.keys(req.body)[0]).employer;
		var results = [];
		gd.employerQuery(city, state, searchTerms, function (data){
			data.employers.forEach(function (employer){
				results.push(employer);//.featuredReview.cons);//[employer.name, employer.sectorName, employer.industryName, employer.overallRating]);
			});
			console.log("Employers", results);
			res.json(results);
		});
	});


	return router;
})();
console.log ("ext-api-routes.js loaded");
module.exports = ext_apiRoutes;