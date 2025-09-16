const express = require("express");
const passport = require("passport");
require("../services/googleAuthService");
require("../services/githubAuthService");
const bcrypt = require("bcrypt");

const { Signup, login } = require("../controller/authController");
const User = require("../models/User");

const router = express.Router();
 
router.post("/signup", Signup);
router.post("/login", login);


router.post('/check-email', async (req, res) => {
  const {email , password} = req.body;
  try {
    const user = await User.findOne({ email });
    if(user && await bcrypt.compare(password, user.password)) {
      
      return res.status(200).json({exists: true});
    }
    else {
      return res.status(200).json({exists: false});
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({exists: false});
  }
});


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    if (!req.user || !req.user.token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { token, user } = req.user;

    // Redirect to frontend with both token + user info
    res.redirect(
      `https://skillchain-frontend.vercel.app/login-success?token=${token}&user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );
  }
);

 
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: false }),
  (req, res) => {
    if (!req.user || !req.user.token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { token, user } = req.user;

    // Redirect to frontend with both token + user info
    res.redirect(
      `https://skillchain-frontend.vercel.app/login-success?token=${token}&user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );
  }
);

module.exports = router;
