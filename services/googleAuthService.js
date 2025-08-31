// passpport js is used in this 

const passport = require("passport");
const googleStratergy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(new googleStratergy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
  scope: ["profile", "email"],
  
}, async (accessToken, refreshToken, profile, done) => {
   try {
     const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        // Find or create user
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
          fullName: profile.displayName,
          email,
          googleId: profile.id,    
          profilePicture: profile.photos?.[0]?.value || undefined,
          role: "Developer",
          });
     }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


