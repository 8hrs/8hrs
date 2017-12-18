const db = require("../models");
const gd = require("../ext_api/glassdoor.js");

console.log("employer-api-routes.js loaded.");
module.exports = function(app) {

//GOOD create an employer
    app.post("/employers", function(req, res) {
        db.Employer.create(req.body)
    .then(function(dbEmployer) {
        res.json(dbEmployer);
    });
});

//GOOD find all employers
    app.get("/employers", function(req, res) {
        db.Employer.findAll({
            include: [db.Campaign]
    }).then(function(dbEmployer) {
        res.json(dbEmployer);
        });
    });
    

//GOOD find employer by employer name
    app.get("/employers/:employerName", function(req, res) {
        var campArray = [], resultsArray = [], camp;
        db.Employer.findOne({
            where: {
                employerName: req.params.employerName
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            let employer = dbEmployer.dataValues;
            
            // console.log('employer', employer);
            let campaignsInReallyAnnoyingDataStructure = employer.Campaigns;
            campaignsInReallyAnnoyingDataStructure.forEach(function(campaign){
                camp = campaign.dataValues;
                camp.employer = employer.employerName || "";
                camp.city = employer.city || "";
                camp.state = employer.state || "";
                camp.industry = employer.industry;
                campArray.push(camp);
                // console.log('campArray', campArray);
            });
            // res.render("found", {campaigns: campArray})
            }).then(function (){
                console.log("EMPLOYER=",camp.employer);
                gd.employerQuery(camp.city, camp.state, camp.employer, function (data){
                    console.log('\n\n\n\ndata\n\n\n\n', data)
                    // data.employers.forEach(function (employer){
                    let emp = data.employers[0];
                    if(emp.exactMatch){
                        for (key in emp){
                            camp[key] = emp[key];
                        }
                        // camp.website = employer.website;
                        // camp.sectorName = employer.sectorName;
                        // camp.industryName = employer.industryName;
                        // camp.featuredReview = employer.featuredReview;
                        // camp.overallRating = employer.overallRating;
                        // camp.cultureAndValuesRating = employer.cultureAndValuesRating;
                        // camp.
                        // resultsArray.push(employer);
                    }
                    // });
                // camp.gd = resultsArray[0];
                console.log('camp', camp);

                res.render("found", {campaigns: campArray});
                });
                

            });
    });

//GOOD find employer by employer ID
    app.get("/employers/:id", function(req, res) {
        db.Employer.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            res.json(dbEmployer);
            });
    });

//GOOD update employer information
    app.put("/employers/", function(req, res) {
        db.Employer.update(req.body,{ 
            where: {
              id: req.body.id
            }
        }
    ).then(function(dbEmployer) {
            res.json(dbEmployer);
        });
    });


//GOOD delete an employer by id
    app.delete("/employers/:id", function(req, res) {
        db.Employer.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbEmployer) {
            res.json(dbEmployer);
        });
    });
};