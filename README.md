Documentation: Multi-Level Referral and Earnings System

Table of Contents

System Overview
Setup
Prerequisites
Installation
Database Setup
System Architecture
API Endpoints
User Registration
Purchase Recording
Earnings Reports
Earnings Logic
Visualization
Example Use Cases
System Overview

This system implements a multi-level referral hierarchy that tracks and distributes profits based on user referrals and purchases. Users earn:

5% of profits from their direct referrals (Level 1).
1% of profits from their indirect referrals (Level 2).
Key Features:
A maximum of 8 direct referrals per user.
Profits are distributed only for purchases above 1000 Rs.
Real-time earnings reports and detailed breakdowns across referral levels.
APIs for user registration, purchase recording, and analytics.
Setup

1. Prerequisites
Node.js: Version 14+.
PostgreSQL: Installed and running.
Sequelize: ORM for database interaction.
2. Installation
Clone the repository:
git clone https://github.com/your-repo/referral-system.git
cd referral-system
Install dependencies:
npm install
3. Database Setup
Create a PostgreSQL database:
CREATE DATABASE referral_system;
Update the database configuration in config/connection.js:
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('referral_system', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = { sequelize };
Run database migrations:
npx sequelize-cli db:migrate
Seed the database (optional):
npx sequelize-cli db:seed:all
4. Start the Server
Run the application:

npm start
System Architecture

1. Components
Users Table:
Stores user profiles, referral codes, and relationships (parent-child hierarchy).
Purchases Table:
Tracks transactions made by users.
Direct and Indirect Earnings Tables:
Records profits for Level 1 and Level 2 referrals.
2. Flow Diagram
User Registration -> Validate Referral Code -> Assign Parent -> Save to Database
Purchase Recording -> Validate Amount -> Calculate Direct/Indirect Earnings -> Save to Database
Earnings Report -> Fetch Direct/Indirect Earnings -> Aggregate Data -> Send Response
API Endpoints

1. User Registration
Registers a new user with an optional referral code.

Endpoint: POST /api/users/register
Request Body:
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "referralCode": "ref_123456" // Optional
}
Response:
{
    "message": "User registered successfully",
    "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "referralCode": "ref_1671875738054",
        "parentId": "referrer-id",
        "level": 2
    }
}
2. Purchase Recording
Records a purchase and calculates earnings if eligible.

Endpoint: POST /api/purchases
Request Body:
{
    "userId": "user-id",
    "purchaseAmount": 2000
}
Response:
{
    "message": "Purchase recorded successfully.",
    "purchase": {
        "id": "purchase-id",
        "userId": "user-id",
        "amount": 2000,
        "status": "COMPLETED"
    }
}
3. Earnings Reports
Fetches real-time earnings reports for a user.

Endpoint: GET /api/reports/earnings/:userId
Response:
{
    "message": "Earnings report fetched successfully.",
    "report": {
        "userId": "user-id",
        "totalDirectEarnings": 5000,
        "totalIndirectEarnings": 2000,
        "totalEarnings": 7000
    }
}
4. Earnings Breakdown
Fetches detailed breakdown of earnings across referral levels.

Endpoint: GET /api/reports/earnings/breakdown/:userId
Response:
{
    "message": "Earnings breakdown fetched successfully.",
    "breakdown": {
        "userId": "user-id",
        "directEarnings": [
            {
                "amount": 500,
                "Referral": {
                    "userId": "referral-id",
                    "name": "John Doe",
                    "email": "john@example.com"
                }
            }
        ],
        "indirectEarnings": [
            {
                "amount": 100,
                "LevelOneReferral": {
                    "userId": "level1-id",
                    "name": "Jane Smith",
                    "email": "jane@example.com"
                },
                "LevelTwoReferral": {
                    "userId": "level2-id",
                    "name": "Alice",
                    "email": "alice@example.com"
                }
            }
        ]
    }
}
Earnings Logic

Threshold Check:
Only calculate earnings for purchases above 1000 Rs.
Direct Earnings (Level 1):
Calculate 5% of the purchase amount.
Example:
Purchase Amount: 2000 Rs
Direct Earnings: 2000 × 5% = 100 Rs
Indirect Earnings (Level 2):
Calculate 1% of the purchase amount.
Example:
Purchase Amount: 3000 Rs
Indirect Earnings: 3000 × 1% = 30 Rs
Visualization

Earnings Distribution:
Use a Pie Chart to show the percentage of earnings from direct and indirect referrals.
Libraries: Chart.js, Google Charts.
Referral Tree:
Use a Tree Diagram to show the hierarchical structure of referrals and their contribution to earnings.
Libraries: D3.js.
Example Use Cases

Register a User:
Input a referral code (if available) to associate the new user with their referrer.
Record a Purchase:
Log a transaction and calculate earnings for eligible referrals.
View Earnings Report:
Quickly view total earnings aggregated across direct and indirect referrals.
Analyze Referral Tree:
Visualize the hierarchical structure and earnings contributions using the referral tree diagram.