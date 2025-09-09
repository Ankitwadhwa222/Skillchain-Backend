const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

  
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role || "Developer" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,  
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // 🔎 Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
          // 👤 Create new user
          user = await User.create({
            fullName: profile.displayName,
            email,
            avatar: profile.photos?.[0]?.value || null,
            provider: "google",
            role: "Developer",
          });
        }
 
        const token = generateToken(user);

   
        return done(null, { user, token });
      } catch (err) {
        console.error("❌ Google Auth Error:", err.message);
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
