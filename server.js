// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const handlebars = require("express-handlebars");
const ext_apiRoutes = require("./routes/ext-api-routes.js")
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Handlebars
app.engine("handlebars", handlebars({layout: false}));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
app.use("/ext_api", ext_apiRoutes);
require("./controllers/campaign-api-routes.js")(app);
require("./controllers/user-api-routes.js")(app);
require("./controllers/employer-api-routes.js")(app);
require("./routes/html-routes.js")(app);
console.log("app info:", app.__router);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
