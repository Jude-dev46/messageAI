const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const profile = req.user;

    res.cookie("jwt", profile.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("https://messageai.onrender.com?auth=success");
  }
);

module.exports = router;
