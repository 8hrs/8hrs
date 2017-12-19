console.log("newcampaign.js loaded");


$(document).ready(function() {
    var campaignnameInput = $("#campaign_name_id");
    var employernameInput = $("#employer_name_id");
    var cityInput = $("#city_id");
    var stateInput = $("#state_id");
    var industryInput = $("#industry_id");
    var wagesInput = $("#wages_id");
    var benefitsInput = $("#benefits_id");
    var genderequalityInput = $("#genderequality_id");
    var racialequalityInput = $("#racialequality_id");
    var ageequalityInput = $("#ageequality_id");
    var workingconditionsInput = $("#workingconditions_id");
    var otherInput = $("#other_id");
    var commentInput = $("#comment_id");
    var goalInput = $("#goal_id");
    var usernameInput = $("#user_name_id");
    var emailInput = $("#email_id");

    $("#submit-button").on("click", function (){
        event.preventDefault();
       
        var employerData = {
                employerName: employernameInput.val().trim(),
                city: cityInput.val().trim(),
                state: stateInput.val().trim(),
                industry: industryInput.val().trim()
              }
        var campaignData = {
                campaignName: campaignnameInput.val().trim(),
                wages: wagesInput.is( ":checked" ),
                benefits: benefitsInput.is( ":checked" ),
                genderEquality: genderequalityInput.is( ":checked" ),
                racialEquality: racialequalityInput.is( ":checked" ),
                ageEquality: ageequalityInput.is( ":checked" ),
                workingConditions: workingconditionsInput.is( ":checked" ),
                others: otherInput.val().trim(),
                message: commentInput.val().trim(),
                targetSignup: goalInput.val().trim()
        }

        var userData = {
                userName: usernameInput.val().trim(),
                email: emailInput.val().trim()
        }
      
      // Don't do anything if the name fields hasn't been filled out
      if (!employernameInput.val()) {
        return;
      }
        upsertEmployer(employerData)
        upsertCampaign(campaignData)
        console.log(employerData)
        console.log(campaignData)
        showNewCampaign(employerData.employerName);
  
    });

    function showNewCampaign(employerName){
        $.get(`/findCampaign/${employerName}`).done(function (data){
            $("body").html(data);
        });
    }
//this function is for create employer but the PUT part is not yet working
    function upsertEmployer(employerData) {
      $.post("/employers", employerData)
        .then(function(data) {
            var employerID = data.id
              console.log( "Sample of data:", data )
              $.ajax({
                url: '/campaigns/',
                type: 'PUT',
                data: "EmployerId = employerID",
                success: function(data) {
                    console.log("SAMPLE OF PUT DATA:" , data);
                }
            }); 
        })  
    }
    function upsertCampaign(campaignData) {
        $.post("/campaigns", campaignData)
    }
    function upsertUser(userData) {
        $.post("/users", userData)
        .then(formSubmitted)
    }
    function formSubmitted () {
        alert("The form has been submitted")
    }


});//document.ready
  