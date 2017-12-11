// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
//const apiRoutes = require("/controllers/apiController.js");

// Set port
const PORT = process.env.PORT || 3000;

// Instantiate express server and routers
const app = express();
//const apiRouter = express.router();
const htmlRouter = express.router();

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Middleware routers
htmlRouter.use(express.static("public/"));
//apiRouter.use("/api", apiRoutes);


// Start server
app.listen(PORT, function(){
	console.log("please pay no attention to port", PORT);
	}
});