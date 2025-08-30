const express = require("express");
const passport = require("passport");
require("../services/googleAuthService");
const router = express.Router();
const jwt = require("jsonwebtoken");   


const {Signup , login} = require("../controller/authController");



router.post("/signup", Signup);
router.post("/login", login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" , session: false }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Redirect frontend with token
    res.redirect(`http://localhost:5173/login-success?token=${token}`);
  }
);

router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful login
    res.redirect("/dashboard"); // or wherever you want
  }
);

module.exports = router;
