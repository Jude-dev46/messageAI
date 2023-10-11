const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const clientID = process.env.GOOGLE_CLIENT_ID;
const secretKey = process.env.GOOGLE_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: secretKey,
      callbackURL: "https://messageai-api.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.email;
      let user;

      try {
        user = await User.findOne({ email });
      } catch (error) {
        return done(error, null);
      }

      if (!user) {
        // Handle the case when the user doesn't exist.
        return done(null, null);
      }

      const token = jwt.sign({ userId: user.username }, SECRET_KEY, {
        expiresIn: "2h",
      });

      const updatedUser = {
        token: token,
        ...profile,
      };
      user.refreshToken = refreshToken;

      return done(null, updatedUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id);
});
