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

  app.get("/found", function(req, res) {
      console.log("/found called");
      res.status(200).end()
      // var campArray = res.locals;
      // console.log('campArray', campArray);
      // return res.render("found", {campaigns: campArray});
  });

};
