console.log("index.js loaded");

const statesArray = ["AK - Alaska", 
                "AL - Alabama", 
                "AR - Arkansas", 
                "AS - American Samoa", 
                "AZ - Arizona", 
                "CA - California", 
                "CO - Colorado", 
                "CT - Connecticut", 
                "DC - District of Columbia", 
                "DE - Delaware", 
                "FL - Florida", 
                "GA - Georgia", 
                "GU - Guam", 
                "HI - Hawaii", 
                "IA - Iowa", 
                "ID - Idaho", 
                "IL - Illinois", 
                "IN - Indiana", 
                "KS - Kansas", 
                "KY - Kentucky", 
                "LA - Louisiana", 
                "MA - Massachusetts", 
                "MD - Maryland", 
                "ME - Maine", 
                "MI - Michigan", 
                "MN - Minnesota", 
                "MO - Missouri", 
                "MS - Mississippi", 
                "MT - Montana", 
                "NC - North Carolina", 
                "ND - North Dakota", 
                "NE - Nebraska", 
                "NH - New Hampshire", 
                "NJ - New Jersey", 
                "NM - New Mexico", 
                "NV - Nevada", 
                "NY - New York", 
                "OH - Ohio", 
                "OK - Oklahoma", 
                "OR - Oregon", 
                "PA - Pennsylvania", 
                "PR - Puerto Rico", 
                "RI - Rhode Island", 
                "SC - South Carolina", 
                "SD - South Dakota", 
                "TN - Tennessee", 
                "TX - Texas", 
                "UT - Utah", 
                "VA - Virginia", 
                "VI - Virgin Islands", 
                "VT - Vermont", 
                "WA - Washington", 
                "WI - Wisconsin", 
                "WV - West Virginia", 
                "WY - Wyoming"
];

$(document).ready(function(){
	createDropdown(statesArray);
});

$("#searchSubmit").on("click", function (){
	console.log("clicked");
	let employer = $("#employer-name").val();
	console.log('employer', employer);
	let city  = $("#city").val();
	console.log('city', city);
	let state = $("#state-dropdown").text().slice(5);
	let searchObj = {
		employer: employer,
		city: city,
		state: state
	}
	console.log(searchObj);
        
	searchEmployers (searchObj, function(result){
		console.log(result);
	});
	searchGlassdoor(searchObj, function(result){
		console.log("result", result);

	});
	// searchGlassdoor(searchObj, function(result){
	// 	console.log("result", result);
	// });
});


function searchEmployers (searchObj, callback){
        $.get("/employers/"+searchObj.employer, JSON.stringify(searchObj)).done(function (data){
                console.log("sending get request");
                console.log("* data = ", data);
                return callback(data);
        });
}

function searchGlassdoor (searchObj, callback){
	$.get("ext_api/employer-search", JSON.stringify(searchObj)).done(function (data){
		console.log("sending get request");
		console.log("* data = ", data);
		return callback(data);
	});
}

function createDropdown (optionArray){
	optionArray.forEach(function (option){
		let line = $("<li role='presentation'>").val(option);
		let anchor = $("<a role='menuitem' class='stateOption'>").text(option);
		line.append(anchor);
		$("#states").append(line);
	});
}

$(document).on("click", ".stateOption", function (event){
	event.preventDefault();
	$("#state-dropdown").text(this.innerHTML);
	console.log(this.text + " !");
});


