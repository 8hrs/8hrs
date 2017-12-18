const db = require("../models");
const gd = require("../ext_api/glassdoor.js");
const path = require("path");
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
    

//This big ugly function searches for existing campaigns and then grabs some
//data from glassdoor if one is found, and then renders found.handlebars with
//campaign and glassdoor data. If not found, redirects to newcampaign.html
    app.get("/findCampaign/:employerName", function(req, res) {
        var campArray = [], resultsArray = [], camp;
        db.Employer.findOne({
            where: {
                employerName: req.params.employerName
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            try{
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
                });
            }
            catch(error){
                console.log("no matching campaign was found");
            }
            }).then(function (){
                try{
                    console.log("EMPLOYER=",camp.employer);
                    gd.employerQuery(camp.city, camp.state, camp.employer, function (data){
                        // data.employers.forEach(function (employer){
                        let emp = data.employers[0];
                        if(emp.exactMatch){
                            for (key in emp){
                                camp[key] = emp[key];
                            }
                        }
                    console.log('camp', camp);
                    res.render("found", {campaigns: campArray});
                    });
                }
                catch(error){
                    return res.sendFile(path.join(__dirname, "../public/newcampaign.html"));
                }
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