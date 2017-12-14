console.log("index.js loaded");

const statesArray = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

$("#searchSubmit").on("click", function (){
	console.log("clicked");
	let employer = $("#employer").val();
	console.log('employer', employer);
	let city  = $("#city").val();
	console.log('city', city);
	let state = $("#state").val();
	let searchObj = {
		employer: employer,
		city: city,
		state: state
	}
	//searchCampaigns(searchObj)
});

function searchCampaigns (searchObj, callback){
	$.post("api/searchCampaigns", searchObj, function (){})
}

$(document).ready(function(){
	createModalDropdown(statesArray);
});

function createModalDropdown (optionArray){
	optionArray.forEach(function (option){
		let line = $("<li role='presentation'>");
		let anchor = $("<a role='menuitem'>").text(option);
		line.append(anchor);
		$("#states").append(line);
	});
}

