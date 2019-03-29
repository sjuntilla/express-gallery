const express = require('express');
const router = express.Router();
const knex = require('../database/index.js');
const User = require('../models/Users.js');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');


//AUTHENTICATION
function isAuthenticated(req, res, done) {
    if (req.isAuthenticated()) {
        done();
    } else {
        res.redirect('/login');
    }
}

//METHODS
router.get('/register', (req, res) => {
    res.status(200);
    res.render('register', {
        message: 'error'
    });
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/gallery');
    }
    res.status(200);
    res.render('login', {
        message: 'error'
    });
});

router.post('/register', (req, res) => {
    User.where({
            email: req.body.email
        })
        .fetch()
        .then(dbUser => {
            if (dbUser) {
                return res.redirect('/register');
            }

            bcrypt.genSalt(12, (err, salt) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send(err)
                }

                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.send(err);
                    }

                    return new User({
                            email: req.body.email,
                            password: hash
                        })
                        .save()
                        .then((user) => {
                            res.redirect('/auth/login');
                        })
                        .catch((err) => {
                            return res.send('Something went wrong.');
                        });
                })
            })
        });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/auth/login',
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
});


router.get('/gallery', isAuthenticated, (req, res) => {
    res.send('Successfully logged in!');
});


module.exports = router;