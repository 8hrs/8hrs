const db = require("../models");
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