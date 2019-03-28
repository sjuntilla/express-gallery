const express = require('express');
const router = require('express').Router();
const Gallery = require('../models/gallerymodel.js');
const auth = require('./auth.js');
const passport = require('passport');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}
router.get("/", (req, res) => {
    return new Gallery()
        .fetchAll()
        .then(photo => {
            console.log(photo.models);
            let arr = [];
            photo.models.forEach(i => {
                arr.push(i.attributes);
            });
            return res.render("main", {
                arr
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/gallery/new", isAuthenticated, (req, res) => {
    return new Gallery()
        .fetchAll()
        .then(gallerytable => {
            return res.render("new", {
                gallerytable
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post("/gallery", (req, res) => {
    const body = req.body;
    return Gallery.forge({
            author: body.author,
            link: body.link,
            description: body.description
        })
        .save(null, {
            method: "insert"
        })
        .then(() => {
            new Gallery({
                    link: body.link
                })
                .fetch()
                .then(img => {
                    return res.redirect("/gallery");
                });
        });
});

router.get("/gallery/:id", (req, res) => {
    let reqParams = req.params.id;
    return new Gallery()
        .where({
            id: reqParams
        })
        .fetch()
        .then(img => {
            let photo = img.attributes;

            return res.render("id", photo);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/gallery/:id/edit", (req, res) => {
    let paramsId = req.params.id;
    return Gallery.where({
            id: paramsId
        })
        .fetch()
        .then(img => {
            console.log(img.attributes);
            let id = img.attributes.id;
            let galleryObj = img.attributes;
            res.render("edit", galleryObj);
        });
});

router.put("/gallery/:id", (req, res) => {
    const body = req.body;
    const paramsId = req.params.id;

    Gallery.where({
            id: paramsId
        })
        .fetch()
        .then(img => {
            new Gallery({
                    id: paramsId
                })
                .save({
                    link: body.link,
                    description: body.description,
                    author: body.author
                }, {
                    patch: true
                })
                .then(() => {
                    return res.redirect("/gallery");
                });
        });
});

router.post("/gallery/:id", (req, res) => {
    const body = req.body;
    const paramsId = req.params.id;

    Gallery.where({
            id: paramsId
        })
        .fetch()
        .then(img => {
            new Gallery({
                    id: paramsId
                })
                .save({
                    link: body.link,
                    description: body.description,
                    author: body.author
                }, {
                    patch: true
                })
                .then(() => {
                    return res.redirect("/gallery");
                });
        });
});

router.delete("/gallery/:id", (req, res) => {
    const paramsId = req.params.id;

    Gallery.where({
            id: paramsId
        })
        .fetch()
        .then(img => {
            new Gallery({
                    id: paramsId
                })
                .destroy()
                .then(() => {
                    return res.redirect("/gallery");
                });
        });
});

router.get("/gallery/:id/delete", (req, res) => {
    const paramsId = req.params.id;

    Gallery.where({
            id: paramsId
        })
        .fetch()
        .then(img => {
            new Gallery({
                    id: paramsId
                })
                .destroy()
                .then(() => {
                    return res.redirect("/gallery");
                });
        });
});

module.exports = router;