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
      const existingUser = await User.findOne({ email });

      const token = jwt.sign({ userId: existingUser.username }, SECRET_KEY, {
        expiresIn: "2h",
      });

      const user = {
        token,
        refreshToken,
        ...profile,
      };

      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id);
});
