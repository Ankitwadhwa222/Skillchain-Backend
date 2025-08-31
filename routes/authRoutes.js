const express = require("express");
const passport = require("passport");
require("../services/googleAuthService");
const router = express.Router();

const { Signup, login } = require("../controller/authController");

// Auth routes
router.post("/signup", Signup);
router.post("/login", login);

// Google / GitHub login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
     
    const token = req.user.token;

    res.redirect(`https://skillchain-frontend.vercel.app/login-success?token=${token}`);
  }
);

// GitHub callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: false }),
  (req, res) => {
     
    const token = req.user.token;

    res.redirect(`https://skillchain-frontend.vercel.app/login-success?token=${token}`);
  }
);

module.exports = router;
