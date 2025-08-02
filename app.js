require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const productsRouter = require("./routes/products.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/products", productsRouter);

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Error Handling Middleware
app.use(errorHandler);

// Vercel requires module.exports for serverless functions
// Only start local server if not in Vercel environment
if (process.env.VERCEL_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Graceful Shutdown for local development
  process.on("SIGINT", () => {
    server.close(() => {
      mongoose.connection.close(() => {
        console.log("Server and MongoDB connection closed");
        process.exit(0);
      });
    });
  });
}

// Export for Vercel serverless functions
module.exports = app;