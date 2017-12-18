var db = require("../models");
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
        db.Employer.findOne({
            where: {
                employerName: req.params.employerName
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            console.log('dbEmployer', dbEmployer);
            let employer = dbEmployer.dataValues;
            let campArray = [], camp;
            console.log('employer', employer);
            let campaignsInReallyAnnoyingDataStructure = employer.Campaigns;
            campaignsInReallyAnnoyingDataStructure.forEach(function(campaign){
                camp = campaign.dataValues;
                camp.employer = employer.employerName;
                camp.city = employer.city;
                camp.state = employer.state;
                camp.industry = employer.industry;
                campArray.push(camp);
                console.log('campArray', campArray);
            })
            console.log('{campaigns: campArray}', {campaigns: campArray});

            res.render("found", {campaigns: campArray});
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