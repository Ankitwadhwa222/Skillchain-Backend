const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

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
        // Get email
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        // Find user by email or GitHub ID
        let user;
        if (email) {
          user = await User.findOne({ email });
        } else {
          user = await User.findOne({ githubId: profile.id });
        }

        // If user does not exist, create one
        if (!user) {
          user = await User.create({
            fullName: profile.displayName || profile.username,
            email,
            githubId: profile.id,
            role: "Developer",
            profilePicture: profile.photos?.[0]?.value || null,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
