const { sequelize } = require('../config/connection');
const { DataTypes } = require('sequelize');

const IndirectEarnings = sequelize.define(
    'IndirectEarnings',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        grandParentUserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
        levelOneReferralId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
        levelTwoReferralId: {
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
            defaultValue: 1.0, // Indirect referral earnings percentage
        },
    },
    {
        tableName: 'indirect_earnings',
        timestamps: true,
        defaultScope: {
            order: [['createdAt', 'DESC']],
        },
    }
);

module.exports = IndirectEarnings;
