// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


//GOOD create a new user
    app.post("/users", function(req, res) {
        db.User.create(req.body)
        .then(function(dbUser) {
            res.json(dbUser);
        });
    });

//GOOD get all users
    app.get("/users", function(req, res) {
        db.User.findAll({
            //include: [db.Campaign]
    }).then(function(dbUser) {
        res.json(dbUser);
        });
    });


//GOOD get user by id
    app.get("/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

//GOOD update user by id
    app.put("/users", function(req, res) {
        db.User.update(req.body,{
            where: {
                id: req.body.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });


//GOOD delete a user by id
    app.delete("/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });


};
