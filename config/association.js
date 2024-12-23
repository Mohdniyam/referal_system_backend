const {Users,Purchases, DirectEarnings, IndirectEarnings,Notifications} = require('../models');


// Define Relationships
Users.hasMany(Purchases, { foreignKey: 'userId' });
Purchases.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(DirectEarnings, { foreignKey: 'parentUserId' });
DirectEarnings.belongsTo(Users, { foreignKey: 'parentUserId' });

Users.hasMany(IndirectEarnings, { foreignKey: 'grandParentUserId' });
IndirectEarnings.belongsTo(Users, { foreignKey: 'grandParentUserId' });

Users.hasMany(Notifications, { foreignKey: 'userId' });
Notifications.belongsTo(Users, { foreignKey: 'userId' });
