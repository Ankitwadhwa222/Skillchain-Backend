const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔑 Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role || "Developer" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

 
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;

     
        let user = email
          ? await User.findOne({ email })
          : await User.findOne({ githubId: profile.id });

        if (!user) {
          // 👤 Create new user
          user = await User.create({
            fullName: profile.displayName || profile.username,
            email,
            githubId: profile.id,
            avatar: profile.photos?.[0]?.value || null,
            provider: "github",
            role: "Developer",
          });
        }
 
        const token = generateToken(user);

 
        return done(null, { user, token });
      } catch (error) {
        console.error("❌ GitHub Auth Error:", error.message);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
