const express = require("express");
const passport = require("passport");
require("../services/googleAuthService");
require("../services/githubAuthService");

const { Signup, login } = require("../controller/authController");

const router = express.Router();

// ------------------ Local Auth ------------------ //
router.post("/signup", Signup);
router.post("/login", login);

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

// ------------------ GitHub Auth ------------------ //
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
