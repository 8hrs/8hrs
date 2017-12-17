module.exports = function (sequelize, DataTypes) {
	var Employer = sequelize.define("Employer", {

	    employerName: { 
			type: DataTypes.STRING, 
			validate: {len: [1,140]},
			allowNull: false
		},
		streetAddress: {
			type: DataTypes.STRING
        },
        city: {
			type: DataTypes.STRING,
            validate: {len: [1,140]},
			allowNull: false
        },
        state: {
			type: DataTypes.STRING,
            validate: {len: [1,140]},
			allowNull: false
        },
        zip: {
			type: DataTypes.INTEGER
        },
        size: {
			type: DataTypes.INTEGER
        },
        industry: {
			type: DataTypes.STRING
		}
    });

    //one employer can be associated with more than one campaign. 
    //There should campaign(s) info of this org shown
    
    Employer.associate = function(models) {
        // Associating Employer with Campaign
        // When an Employer is deleted, also delete any associated Campaigns
        // With this association, there now is employerId in Campaign table
        // With this association, instances of Employer now get the accessors getCampaign and setCampaign (with s)
        Employer.hasMany(models.Campaign, {
            onDelete: "cascade"
        });
    };

	return Employer;
};