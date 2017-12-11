// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
//const apiRoutes = require("/controllers/apiController.js");

// Set port
const PORT = process.env.PORT || 3000;

// Instantiate express server
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Middleware routers
app.use(express.static("public/"));
//app.use("/api", apiRoutes);


// Start server
app.listen(PORT, function(){
	console.log("please pay no attention to port", PORT);
});