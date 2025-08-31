const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ------------------ GitHub Strategy ------------------
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
          user = await User.create({
            fullName: profile.displayName || profile.username,
            email,
            githubId: profile.id,
            profilePicture: profile.photos?.[0]?.value || undefined,
            role: "Developer",
          });
        }

        const token = generateToken(user);

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// ------------------ Google Strategy ------------------
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value || null;

//         let user = email
//           ? await User.findOne({ email })
//           : await User.findOne({ googleId: profile.id });

//         if (!user) {
//           user = await User.create({
//             fullName: profile.displayName || profile.username,
//             email,
//             googleId: profile.id,
//             profilePicture: profile.photos?.[0]?.value || undefined,
//             role: "Developer",
//           });
//         }

//         const token = generateToken(user);

//         return done(null, { user, token });
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// ------------------ Serialize / Deserialize ------------------
passport.serializeUser((obj, done) => {
  done(null, obj.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
