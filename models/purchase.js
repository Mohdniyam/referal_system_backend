const { sequelize } = require('../config/connection');
const { DataTypes } = require('sequelize');

// Purchases Model
const Purchases = sequelize.define(
    'Purchases',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        userId: {
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
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING', // Can be 'PENDING', 'COMPLETED', or 'FAILED'
        },
    },
    {
        tableName: 'purchases',
        timestamps: true,
        defaultScope: {
            order: [['createdAt', 'DESC']],
        },
    }
);

module.exports = Purchases;
