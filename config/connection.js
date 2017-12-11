const Connection = (function(){
	const mysql = require("mysql2");
	let connection;
	const PORT = process.env.PORT || 3306;

	if (process.env.JAWSDB_URL) {
		connection = mysql.createConnection(process.env.JAWSDB_URL);
	} else {
		connection = mysql.createConnection({
			port: PORT,
			host: "localhost",
			database: "burgers_db",
			user: "root",
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