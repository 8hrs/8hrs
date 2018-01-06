const gd = require("../ext_api/glassdoor.js");
const path = require("path");
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

//GOOD create a new campaign
    app.post("/campaigns", function(req, res) {
        db.Campaign.create(req.body)
        .then(function(dbCampaign) {
            res.json(dbCampaign);
        });
    });

//GOOD get all campaigns
    app.get("/campaigns", function(req, res) {
        db.Campaign.findAll({
    }).then(function(dbCampaign) {
        res.json(dbCampaign);
        });
    }); 



//GOOD get campaign by id
    app.get("/campaigns/:id", function(req, res) {
        db.Campaign.findOne({
            where: {
                id: req.params.id
            },
        }).then(function(dbCampaign) {
            console.log(dbCampaign);
            res.json(dbCampaign);
        });
    });

//GOOD update a campaign
  app.put("/campaigns", function(req, res) {
    db.Campaign.update(req.body, {
        where: {
            id: req.body.id
        }
        }).then(function(dbCampaign) {
            res.json(dbCampaign);
        });
    });

//GOOD delete a campaign
    app.delete("/campaigns/:id", function(req, res) {
        db.Campaign.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbCampaign) {
            res.json(dbCampaign);
        });
    });

    app.get("/findCampaign/:employerName", function(req, res) {
        const employerName = decodeURIComponent(req.params.employerName);
        db.Employer.findOne({
            where: {
                employerName: employerName
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            if(dbEmployer){
                var employer = dbEmployer.dataValues;
                var campArray = [];
                var camp = {};
                employer.Campaigns.forEach(function(campaign){
                    camp = campaign.dataValues;
                    camp.employer = employer.employerName || "";
                    camp.city = employer.city || "";
                    camp.state = employer.state || "";
                    camp.industry = employer.industry;
                    campArray.push(camp);
                });
            }else{
                //no campaigns found. status 204 used to signal frontend to load newcampaign.handlebars
                return res.status(204).end();
            }
                gd.employerQuery(camp.city = "", camp.state = "", employerName, function(data) {
                    var gdEmployers = data.employers[0];
                    if(false){//! gdEmployers.exactMatch){
                        //?
                        //emps = ?
                    }else{
                        for (key in gdEmployers){
                            for (let i = 0; i < campArray.length; i ++){
                                campArray[i][key] = gdEmployers[key];
                            }
                        }
                        return res.render("found", {campaigns: campArray})
                    }
                });
            });
    });

};


