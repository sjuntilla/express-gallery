const knex = require("./database/index.js");
const express = require("express");
const Users = require('./models/Users.js');
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require('fs');
const session = require('express-session');
const redis = require('connect-redis')(session);
const passport = require('passport');
const localStrategy = require('passport-local');
const gRouter = require('./routes/gallery.js');
const auth = require('./routes/auth.js');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT;
if (!PORT) {
  console.log("Port not found!");
}

const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;
// EXPRESS SERVER STUFF
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(session({
  store: new redis(),
  secret: 'uuugh',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "handlebars",
  hbs({
    defaultLayout: "index"
  })
);
app.set("view engine", "handlebars");

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  return new Users({
      email: user.email
    }).fetch()
    .then(user => {
      return done(null, {
        email: user.email
      });
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});

passport.use(new localStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  return new Users({
      email: email
    })
    .fetch()
    .then(user => {
      console.log(user)
      user = user.toJSON();

      if (user === null) {
        return done(null, false, {
          message: 'Invalid credentials.'
        });
      } else {
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'Invalid credentials.'
              });
            }
          });
      }
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err);
    });
}));

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