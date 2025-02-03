const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Middleware for CORS handling

// Import Todo routes
const todoRoutes = require("./routes/todoRoutes");

// Use Todo routes
app.use("/", todoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });
