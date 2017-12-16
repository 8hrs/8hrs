
var db = require("../models");
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User", {

		userName: { 
			type: DataTypes.STRING, 
		},
		email: {
			type: DataTypes.STRING,
			validate: {len: [1,140]},
			allowNull: false
        }
    });
    // User.associate = function(models) {
        
    // User.belongsToMany(models.Campaign, { 
    //     through: "CampaignUser",
    // }
//}
	return User;
};