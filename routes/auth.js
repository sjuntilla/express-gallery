const router = require('express').Router();
const Users = require('../models/Users.js');
const passport = require('passport');
const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    console.log('serialize user', user);
    return done(null, {
        email: user.email,
        ugh: 'AAAAUGH'
    })
});

passport.deserializeUser((user, done) => {
    new Users({
        email: user.email
    }).fetch().then(user => {
        user = user.toJSON();
        console.log(user);
        done(null, user)
    }).catch(err => {
        console.log('err', err);
    })
});

passport.use(new localStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    Users.where({
        email
    }).fetch().then(user => {
        if (user === null) {
            return done(null, false, {
                message: 'User does not exist.'
            });
        } else {
            user = user.toJSON();

            bcrypt.compare(password, user.password).then(res => {
                if (res) {
                    return done(null, user)
                } else {
                    return done(null, false, {
                        message: 'Incorrect username or password.'
                    });
                }
            });
        }
    }).catch(err => {
        return done(null, false)
    })
}));


router.post('/register', (req, res) => {
    const {
        email,
        password
    } = req.body;

    bcrypt.genSalt(12).then(salt => {
        console.log('salt', salt);
        return bcrypt.hash(password, salt)
    }).then(hash => {
        console.log('hash', hash);
        return Users.forge({
            email,
            password: hash
        }).save()
    }).then(user => {
        user = user.toJSON();
        res.json({
            user
        })
    }).catch(err => {
        console.log('err', err);
        res.json(err);
    })
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: 'http://google.com'
}), (req, res) => {
    res.send('???')
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isAuthenticated(req, res, done) {
    if (req.isAuthenticated()) {
        done();
    } else {
        res.redirect('/')
    }
};

module.exports = router;