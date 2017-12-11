// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const apiRoutes = require("./controllers/api-controller.js");
const htmlRoutes = require("./routes/html-routes.js");

// Set port
const PORT = process.env.PORT || 3000;

// Instantiate express server
const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Middleware routers
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start server
app.listen(PORT, function(){
	console.log("please pay no attention to port", PORT);
});