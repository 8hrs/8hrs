var db = require("../models");
module.exports = function (sequelize, DataTypes) {
	var Campaign = sequelize.define("Campaign", {
		campaignName: { 
			type: DataTypes.STRING, 
			validate: {len: [1,140]},
			allowNull: false
        },
        message: {
            type: DataTypes.TEXT
        },
		wages: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        benefits: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        genderEquality: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        racialEquality: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        ageEquality: {
            type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        workingConditions: {
            type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
        others: {
            type: DataTypes.TEXT,
        },
        targetSignup: {
            type: DataTypes.INTEGER,
        },
    });

    //one campaign is associated with one org. 
    //There should be org ID in campaign table when we get campaign info
    //one campaign has many users
    //only one user is the initiator of the campaign
    //when we run campain table, there should be info of initiator of the campaign

    Campaign.associate = function(models) {

        // Associating Employer with Campaign
        // When an Employer is deleted, also delete any associated Campaigns
        Campaign.hasMany(models.User, { 
            onDelete: "cascade"
       })
    }
	return Campaign;
};