import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import MongoStoreFactory from "connect-mongo";

import verifyJWT from "./middleware/verifyJWT.js";
import InitiateMongoServer from "./config/db.js";
import signupRoute from "./routes/signUp.js";
import loginRoute from "./routes/loginRoute.js";
import completionsRoute from "./routes/completions.mjs";
import googleAuthRoute from "./routes/googleAuth.js";
import "./controllers/googleAuthController.js";

const PORT = 8001;
const app = express();
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

app.use(express.json());
app.use(
  cors({ origin: ["https://messageai.onrender.com", "http://localhost:3002"] })
);

InitiateMongoServer()
  .then(() => {
    const secret_key = process.env.PASSPORT_KEY;
    const MongoStore = new MongoStoreFactory({ mongoUrl: dbUrl });

    app.use(
      session({
        secret: `${secret_key}`,
        resave: false,
        saveUninitialized: true,
        store: MongoStore,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth/signUp", signupRoute);
    app.use("/auth/login", loginRoute);
    app.use("/", googleAuthRoute);

    app.use(verifyJWT);
    app.use("/completions", completionsRoute);

    app.listen(PORT, () =>
      console.log("Your server is running on port " + PORT)
    );
  })
  .catch((e) => {
    console.log(e);
    console.log("An error occurred!");
  });
