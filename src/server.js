import express from "express";
import session from "express-session";
import passport from "passport";
import authRouter from "./auth/auth.js";
import streamRouter from "./api/stream.js";
import config from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

app.use("/auth", authRouter);

app.get('/chat', ensureAuth, (req, res) => {
  const userName = req.user ? req.user.displayName : 'Guest';
  res.render('chat', { userName });
});

app.use("/api", streamRouter);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
