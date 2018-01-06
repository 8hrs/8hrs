console.log("found.js loaded");
$("#join-button").on("click", function(e){
      alert("Thanks for joining!");
      location = "/";
    });

function join() {
	let formData = {};
	formData.userName = $("#submitUser").val().trim();
	formData.email = $("#submitEmail").val().trim();
	console.log('formData.email', formData.email);
	// upsertUser(formData, function(){
		alert("Thanks for joining!");
		return location = "/";
	// })      
}

function upsertUser(formData, callback) {
        $.post("/users", formData).done(function(){
            return callback();
        }).fail(function(){
            alert("Submission failed.");
            return res.end();
        });
    }