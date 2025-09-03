require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");


require("./services/githubAuthService"); 
require("./services/googleAuthService"); 

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

 
app.use(passport.initialize());

 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

 
app.get("/", (req, res) => {
  res.send("API is running...");
});

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error", error: err.message });
});

 
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
