const Glassdoor = (function (){
	const request = require("request");
	function employerQuery (city, state, searchTerms, callback){
		let userIp;
		request("https://api.ipify.org/?format=json", function (error, response, body){
			userIp = JSON.parse(body).ip;
		})
		const apiKey = process.env.GLASSDOOR_API_KEY;
		const partnerId = process.env.GLASSDOOR_PARTNER_ID;
		const pageNumber = "";
		const pageSize = "";
		let queryUrl = `http://api.glassdoor.com/api/api.htm?t.p=${partnerId}&t.k=${apiKey}&format=json&v=1&action=employers&city=${city}&q=${searchTerms}&pn=${pageNumber}&ps=${pageSize}`;
		console.log('queryUrl', queryUrl);
		request(queryUrl, function (error, response, body){
			if (error){
				console.log(error.stack);
			}
			let employers = JSON.parse(body).response;
			return callback(employers);
		});
	}
	return {
		employerQuery: employerQuery
	}
})();

module.exports = Glassdoor;
