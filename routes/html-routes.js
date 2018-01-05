// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
    //res.sendFile(path.join(__dirname, "../public/index.html"));
  });

 app.get("/newcampaign", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newcampaign.html")); //path.join(__dirname, "/newcampaign.html"));
  });


};
