const Glassdoor = (function (){
	// const bodyParser = require("body-parser");
	const request = require("request");
	function gdQuery (city = "", state = "", searchTerms = "", callback){
		let userIp;
		request("https://api.ipify.org/?format=json", function (error, response, body){
			userIp = JSON.parse(body).ip;
			console.log('userIp', userIp);
		})
		const apiKey = process.env.GLASSDOOR_API_KEY;
		const partnerId = process.env.GLASSDOOR_PARTNER_ID;
		const pageNumber = 1;
		const pageSize = 100;
		let queryUrl = `http://api.glassdoor.com/api/api.htm?t.p=${partnerId}&t.k=${apiKey}&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&userip=${userIp}&city=${city}&q=${searchTerms}&pn=${pageNumber}&ps=${pageSize}`;
		request(queryUrl, function (error, response, body){
			if (error){
				console.log(error.stack);
			}
			// console.log(response);
			let employers = JSON.parse(body).response;
			// console.log('employers', employers);
			return callback(employers);
		});
	}

	function employersByCity (city, state = "", searchTerms = "", callback){
		return gdQuery(city, state, searchTerms, callback);
	}
	return {
		// gdQuery: gdQuery,
		employersByCity: employersByCity
	}
})();

module.exports = Glassdoor;


// Glassdoor.employersByCity("Chicago", "", function (res){
//     console.log('res', res.employers);
// 	let employers = [];
// 	res.employers.forEach(function (employer){
// 		employers.push([employer.name, employer.sectorName, employer.industryName, employer.overallRating]);
// 	});
// 	console.log("\n\nby City : \n", employers);
// 	return employers;
// });
