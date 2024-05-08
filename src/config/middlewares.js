import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import config from "../config.js";

const app = express();

const DB_URL = config.mongo_url;

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sesión MongoD (DB)
app.use(session({
  store: new MongoStore({
    mongoUrl: DB_URL,
    ttl: 3600
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

//Init Passport 
app.use(passport.initialize())
app.use(passport.session())

export default app;