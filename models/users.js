const { sequelize } = require('../config/connection');
const { DataTypes } = require('sequelize');

// Users Model
const Users = sequelize.define(
    'Users',
    {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        referralCode: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.UUID,
            allowNull: true, // Null for root users without parents
            references: {
                model: 'users', // Self-referential relationship
                key: 'userId',
            },
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Level 1 for direct referrals, increment for deeper levels
        },
        isActive : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            order: [['createdAt', 'DESC']],
        },
    }
);

module.exports = Users;
