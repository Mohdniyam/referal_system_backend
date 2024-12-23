# **Multi-Level Referral and Earnings System**

## **Table of Contents**
1. [System Overview](#system-overview)
2. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Database Setup](#database-setup)
3. [System Architecture](#system-architecture)
4. [API Endpoints](#api-endpoints)
   - [User Registration](#1-user-registration)
   - [Purchase Recording](#2-purchase-recording)
   - [Earnings Reports](#3-earnings-reports)
   - [Earnings Breakdown](#4-earnings-breakdown)
5. [Earnings Logic](#earnings-logic)
6. [Visualization](#visualization)
7. [Example Use Cases](#example-use-cases)

---

## **System Overview**
This system implements a **multi-level referral hierarchy** that tracks and distributes profits based on user referrals and purchases. Users earn:
- **5%** of profits from their direct referrals (**Level 1**).
- **1%** of profits from their indirect referrals (**Level 2**).

### **Key Features:**
- A maximum of **8 direct referrals** per user.
- Profits are distributed only for purchases above **1000 Rs**.
- Real-time earnings reports and detailed breakdowns across referral levels.
- APIs for user registration, purchase recording, and analytics.

---

## **Setup**

### **1. Prerequisites**
- **Node.js**: Version 14+.
- **PostgreSQL**: Installed and running.
- **Sequelize**: ORM for database interaction.

### **2. Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/referal_system_backend.git
   cd referal_system_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### **3. Database Setup**
1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE referral_system;
   ```

2. Update the database configuration in `config/connection.js`:
   ```javascript
   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize('referral_system', 'username', 'password', {
       host: 'localhost',
       dialect: 'postgres',
   });

   module.exports = { sequelize };
   ```

<!-- 3. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

4. Seed the database (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ``` -->

### **4. Start the Server**
Run the application:
```bash
npm start
```

---

## **System Architecture**

### **1. Components**
- **Users Table**:
  Stores user profiles, referral codes, and relationships (parent-child hierarchy).
- **Purchases Table**:
  Tracks transactions made by users.
- **Direct and Indirect Earnings Tables**:
  Records profits for Level 1 and Level 2 referrals.

### **2. Flow Diagram**
```plaintext
User Registration -> Validate Referral Code -> Assign Parent -> Save to Database
Purchase Recording -> Validate Amount -> Calculate Direct/Indirect Earnings -> Save to Database
Earnings Report -> Fetch Direct/Indirect Earnings -> Aggregate Data -> Send Response
```

---

## **API Endpoints**

### **1. User Registration**
Registers a new user with an optional referral code.

- **Endpoint**: `POST /api/users/register`
- **Request Body**:
  ```json
  {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "referralCode": "ref_123456" // Optional
  }
  ```
- **Response**:
  ```json
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
  ```

---

### **2. Purchase Recording**
Records a purchase and calculates earnings if eligible.

- **Endpoint**: `POST /api/purchases`
- **Request Body**:
  ```json
  {
      "userId": "user-id",
      "purchaseAmount": 2000
  }
  ```
- **Response**:
  ```json
  {
      "message": "Purchase recorded successfully.",
      "purchase": {
          "id": "purchase-id",
          "userId": "user-id",
          "amount": 2000,
          "status": "COMPLETED"
      }
  }
  ```

---

### **3. Earnings Reports**
Fetches real-time earnings reports for a user.

- **Endpoint**: `GET /api/reports/earnings/:userId`
- **Response**:
  ```json
  {
      "message": "Earnings report fetched successfully.",
      "report": {
          "userId": "user-id",
          "totalDirectEarnings": 5000,
          "totalIndirectEarnings": 2000,
          "totalEarnings": 7000
      }
  }
  ```

---

### **4. Earnings Breakdown**
Fetches detailed breakdown of earnings across referral levels.

- **Endpoint**: `GET /api/reports/earnings/breakdown/:userId`
- **Response**:
  ```json
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
  ```

---

## **Earnings Logic**

1. **Threshold Check**:
   - Only calculate earnings for purchases above **1000 Rs**.

2. **Direct Earnings (Level 1)**:
   - Calculate **5%** of the purchase amount.
   - Example:
     ```plaintext
     Purchase Amount: 2000 Rs
     Direct Earnings: 2000 × 5% = 100 Rs
     ```

3. **Indirect Earnings (Level 2)**:
   - Calculate **1%** of the purchase amount.
   - Example:
     ```plaintext
     Purchase Amount: 3000 Rs
     Indirect Earnings: 3000 × 1% = 30 Rs
     ```

---

## **Visualization**

1. **Earnings Distribution**:
   - Use a **Pie Chart** to show the percentage of earnings from direct and indirect referrals.
   - Libraries: [Chart.js](https://www.chartjs.org/), [Google Charts](https://developers.google.com/chart).

2. **Referral Tree**:
   - Use a **Tree Diagram** to show the hierarchical structure of referrals and their contribution to earnings.
   - Libraries: [D3.js](https://d3js.org/).

---

## **Example Use Cases**

1. **Register a User**:
   - Input a referral code (if available) to associate the new user with their referrer.

2. **Record a Purchase**:
   - Log a transaction and calculate earnings for eligible referrals.

3. **View Earnings Report**:
   - Quickly view total earnings aggregated across direct and indirect referrals.

4. **Analyze Referral Tree**:
   - Visualize the hierarchical structure and earnings contributions using the referral tree diagram.

---

### **Happy Coding!** 😊
