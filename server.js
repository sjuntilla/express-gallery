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

// EXPRESS SERVER STUFF
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(session({
  store: new redis({
    url: 'REDIS_HOSTNAME',
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

// after login
passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    email: user.email
  });
});

// after every request
passport.deserializeUser((user, done) => {
  console.log('deserializing');
  return new Users({
      id: user.id
    }).fetch()
    .then(user => {
      return done(null, {
        id: user.id,
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
          message: 'bad email or password'
        });
      } else {
        bcrypt.compare(password, user.password)
          .then((res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: 'bad email or password'
              });
            }
          });
      }
    })
    .catch(err => {
      console.log('error: ', err);
      return done(err); //500 error
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