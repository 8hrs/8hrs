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

};


