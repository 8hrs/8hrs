const Connection = (function(){
	const mysql = require("mysql2");
	let connection;
	const PORT = process.env.PORT || 3306;

	if (process.env.JAWSDB_URL) {
		connection = mysql.createConnection(process.env.JAWSDB_URL);
	} else {
		connection = mysql.createConnection({
			port: PORT,
			host: "y06qcehxdtkegbeb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
			database: "x14009ytzpb9k3uv",
			user: "vmx3flztkz310b61",
			password: process.env.MYSQL_PASSWORD
		});
	}

	connection.connect(function(error){
		if (error){
			return console.log("error:", error.stack);
		}
		return console.log("connected to database as id", connection.threadId);
	});

	return connection;
})();

console.log("connection.js loaded");
module.exports = Connection;