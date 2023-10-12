const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      try {
        const email = profile.emails[0].value;
        const userName = profile.displayName;
        const password = profile.name.givenName;

        const user = await User.findOne({ email });
        const hashPassword = await bcrypt.hash(password, 10);

        if (!user) {
          const refreshToken = jwt.sign({ userId: userName }, SECRET_KEY, {
            expiresIn: "1d",
          });

          const newUser = await User({
            email: email,
            username: userName,
            password: hashPassword,
            refreshToken: refreshToken,
          });

          const token = jwt.sign({ userId: userName }, SECRET_KEY, {
            expiresIn: "2h",
          });

          const updatedUser = {
            token: token,
            ...profile,
          };

          await newUser.save();
          return done(null, updatedUser);
        } else {
          const token = jwt.sign({ userId: user.username }, SECRET_KEY, {
            expiresIn: "2h",
          });

          const updatedUser = {
            token: token,
            ...profile,
          };

          await user.save();
          return done(null, updatedUser);
        }
      } catch (error) {
        return done(error, false, { message: "Error finding user" });
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
