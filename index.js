const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("./config/association");
require("dotenv").config();

const app = express();

const { sequelize, startDatabaseConnection } = require("./config/connection");
const { initSocket } = require("./config/socket");
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const earningsRoutes = require('./routes/earningsRoutes.js');
const reportsRoutes = require('./routes/reportsRoutes');


const port = process.env.PORT || 3000; // Define port here
const server = createServer(app);
app.use(express.json());

const io = new Server(server);

function startServer() {

    return new Promise(async (resolve, reject) => {
      try {
        await startDatabaseConnection();
        await sequelize.sync({
          alter: true,
        });

         // start io connection
        initSocket(io);

        server.listen(port, () => {
          console.log(`Server listening on port http://localhost:${port}/`)

          resolve();
        });
      } catch (error) {
        reject(error);
      }
  
    });
  }

// Start the Server
(async () => {
    try {
      await startServer();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  })();

  // testing route
  app.get("/", (req, res, next) => {
    res.send("Home page");
  });

// Routes
app.use('/api/users', userRoutes);  

app.use('/api/purchases', purchaseRoutes);

app.use('/api/earnings', earningsRoutes);

app.use('/api/reports', reportsRoutes);


module.exports = server;
