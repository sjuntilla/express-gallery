const knex = require("./database/index.js");
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require('express-session');
const redis = require('connect-redis')(session);
const passport = require('passport');

const Gallery = require("./models/gallerymodel.js");
const gRouter = require('./routes/gallery.js');
const auth = require('./routes/auth.js');

const PORT = process.env.PORT;
if (!PORT) {
  console.log("Port not found!");
}

// EXPRESS SERVER STUFF
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(session({
  store: new redis({
    url: 'redis://redis-server:6379',
    logErrors: true
  }),
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "handlebars",
  hbs({
    defaultLayout: "index"
  })
);
app.set("view engine", "handlebars");

app.get("/css/styles.css", (req, res) => {
  fs.readFile("./public/css/styles.css", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.write(data.toString());
    res.end();
  });
});

app.use('/gallery', gRouter);
app.use('/auth', auth);
app.use('/', gRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});