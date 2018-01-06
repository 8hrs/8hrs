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

        let formData = {
            employerData: employerData,
            campaignData: campaignData,
            userData: userData
        }
        console.log('formData', formData);
        upsertCampaign(formData, upsertEmployer, upsertUser, showNewCampaign);
  
    });

    function showNewCampaign(formData){
        console.log("showNewCampaign() called");
        let employerName = formData.employerData.employerName;
        console.log('employerName', employerName);
        return $("html").load(`/findCampaign/${employerName}`);
    }

//this function is for create employer but the PUT part is not yet working
    function upsertEmployer(formData, callback, callback2, callback3) {
        let employerData = formData.employerData;
        $.post("/employers", employerData).done(function(){
            return callback(formData, callback2, callback3);
        }).fail(function(){
            alert("Submission failed.");
            return location = "/newcampaign";
        });
    }

    function upsertCampaign(formData, callback, callback2, callback3) {
        let campaignData = formData.campaignData;
        $.post("/campaigns", campaignData).done(function(){
            return callback(formData, callback2, callback3);
        }).fail(function(){
            alert("Submission failed.");
            return location = "/newcampaign";
        });
    }

    function upsertUser(formData, callback, callback2, callback3) {
        let userData = formData.userData;
        $.post("/users", userData).done(function(){
            return callback(formData, callback2, callback3);
        }).fail(function(){
            alert("Submission failed.");
            return location = "/newcampaign";
        });
    }

    function formSubmitted () {
        alert("The form has been submitted")
    }


});//document.ready
  