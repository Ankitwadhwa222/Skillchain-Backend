const passport = require("passport");
const githubStratergy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.use(new githubStratergy({
     clientID : process.env.GITHUB_CLIENT_ID,
     clientSecret : process.env.GITHUB_CLIENT_SECRET,
     callbackURL : process.env.GITHUB_CALLBACK_URL,
     scope: ["user:email"]
     
},
async (accessToken, refreshToken, profile, done) => {
     try {
           const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

             let user = email
          ? await User.findOne({ email })
          : await User.findOne({ githubId: profile.id });
        
          if(!user) {
               user = await User.create ({
                    fullName : profile.displayName || profile.username,
                    email,
                    githubId : profile.id,
                    role: "Developer",
                    profilePicture: profile.photos[0]?.value
               })
          }
          return done(null , user);
     } catch (error) {
          return done(error);
     }
}
));
passport.serializeUser((user, done) => {
     done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
     try {
          const user = await User.findById(id);
          done(null, user);
     } catch (error) {
          done(error);
     }
});
