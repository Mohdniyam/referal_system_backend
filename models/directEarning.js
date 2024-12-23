const { sequelize } = require('../config/connection');
const { DataTypes } = require('sequelize');

// Define Direct Earnings Model
const DirectEarnings = sequelize.define(
    'DirectEarnings',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        parentUserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
        referralUserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        purchaseId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'purchases',
                key: 'id',
            },
        },
        percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            defaultValue: 5.0, // Direct referral earnings percentage
        },
    },
    {
        tableName: 'direct_earnings',
        timestamps: true,
        defaultScope: {
            order: [['createdAt', 'DESC']],
        },
    }
);

module.exports = DirectEarnings;
