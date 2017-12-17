// Requiring our models
var db = require("../models");
const bodyParser = require("body-parser");

// Routes
// =============================================================
module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));
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
        console.log("****res**** -", res.body);
        res.render("found", res[0].Campaigns[0]);
        res.json(dbCampaign);
        });
    }); 
//     app.get("/weekday", function(req, res) {
//   res.render("index", lunches[0]);
// });


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
};
