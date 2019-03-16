const knex = require("./database/index.js");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Gallery = require("./models/gallerymodel.js");

//PORT STUFF
const PORT = process.env.PORT;
if (!PORT) {
  console.log("Port not found!");
}

// EXPRESS SERVER STUFF
const app = express();
app.use(bodyParser.json({
  extended: true
}));
// const galleryForm = require('./routes/galleryForm.js');

app.get("/gallery", (req, res) => {
  return new Gallery()
    .fetchAll()
    .then(gallerytable => {
      return res.json(gallerytable);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//DISPLAYS A PAGE WITH FORM TO ADD AN IMAGE TO THE GALLERY
app.get("/gallery/new", (req, res) => {});

//ACTUALLY ADDS AN IMAGE TO THE GALLERY
app.post("/gallery", (req, res) => {
<<<<<<< HEAD
  const author = req.body.author;
  const url = req.body.link;
  const desc = req.body.description;
  return new Gallery({
    author,
    url,
    desc
  }).save().then((gallery) => {
    return res.json({
      success: true
    }).catch((err) => {
      res.status(500);
    });
=======
  let body = req.body;
  knex("gallerytable").insert({
    author: req.author,
    link: req.link,
    description: req.description
>>>>>>> 867c2511f6481af2d206eb169f1da229ff3d3d69
  });
});

//RETRIEVES SPECIFIC IMAGE BY ID
app.get("/gallery/:id", (req, res) => {
  let reqParams = req.params.id;
  return new Gallery()
    .where({ id: reqParams })
    .fetch()
    .then(gallerytable => {
      return res.json(gallerytable);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//DISPLAYS A PAGE WITH FORM THAT EDITS SPECIFIC IMAGE BY ID
app.get("/gallery/:id/edit", (req, res) => {});
//ACTUALLY EDITS AN IMAGE BY ID
app.put("/gallery/:id", (req, res) => {});

//DELETES AN IMAGE BY ID
app.delete("/gallery/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Whoever is listening on ${PORT} is a bitch!!!!!!`);
});
