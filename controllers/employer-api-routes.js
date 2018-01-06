const db = require("../models");
const gd = require("../ext_api/glassdoor.js");
const path = require("path");
console.log("employer-api-routes.js loaded.");
module.exports = function(app) {

//GOOD create an employer
    app.post("/employers", function(req, res) {
        db.Employer.findOne({
            where: {
                employerName: req.body.employerName
            }
        }).then(function(dbEmployer){
            if(! dbEmployer){
                db.Employer.create(req.body)
                .then(function(dbEmployer) {
                    res.status(201).end();
                    // res.json(dbEmployer);
                });
            }else{
                return console.log("Employer already in database");
            }

        })
        
});

//GOOD find all employers
    app.get("/employers", function(req, res) {
        db.Employer.findAll({
            include: [db.Campaign]
    }).then(function(dbEmployer) {
        res.json(dbEmployer);
        });
    });



    
    app.get("/findCampaign/:employerName", function(req, res) {
        db.Employer.findOne({
            where: {
                employerName: req.params.employerName
            },
            include: [db.Campaign]
        }).then(function(dbEmployer) {
            // console.log('dbEmployer', dbEmployer);
            if(dbEmployer){
                const employer = dbEmployer.dataValues;
                var campArray = [], camp, emps;
                employer.Campaigns.forEach(function(campaign){
                    camp = campaign.dataValues;
                    camp.employer = employer.employerName || "";
                    camp.city = employer.city || "";
                    camp.state = employer.state || "";
                    camp.industry = employer.industry;
                    campArray.push(camp);
                });
            }else{
                return res.status(204).end();
                // return res.sendFile(path.join(__dirname, "../views/newcampaign.handlebars"));
            }
                gd.employerQuery(camp.city = "", camp.state = "", camp.employer, function(data) {
                    var gdEmployers = data.employers[0];
                    if(! gdEmployers.exactMatch){
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