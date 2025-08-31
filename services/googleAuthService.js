const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔑 Helper to create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Example: https://skillchain-backend.onrender.com/api/auth/google/callback
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: null, // since OAuth users don’t need a password
            avatar: profile.photos?.[0]?.value || null,
            provider: "google",
          });
        }

        // Generate JWT for the user
        const token = generateToken(user._id);

        // Pass token & user to `req.user`
        return done(null, { ...user.toObject(), token });
      } catch (err) {
        console.error("❌ Google Auth Error:", err.message);
        return done(err, null);
      }
    }
  )
);

// Required for passport
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
