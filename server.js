const knex = require("./database/index.js");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Gallery = require('./models/gallerymodel.js');

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


app.get("/", (req, res) => {
  return new Gallery().fetchAll()
    .then((gallerytable) => {
      return res.json(gallerytable);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//DISPLAYS A PAGE WITH FORM TO ADD AN IMAGE TO THE GALLERY
app.get("/gallery/new", (req, res) => {});

//ACTUALLY ADDS AN IMAGE TO THE GALLERY
app.post("/gallery", (req, res) => {
  const body = req.body;
  Gallery.forge({
    author: body.author,
    link: body.link,
    description: body.description,
    title: body.title
  }).save(null, {
    method: 'insert'
  }).then(() => {
    new Gallery({
      title: body.title
    }).fetch().then((img) => {
      return res.redirect(`/gallery/${img.id}`);
    })
  });
});

//RETRIEVES SPECIFIC IMAGE BY ID
app.get("/gallery/:id", (req, res) => {});

//DISPLAYS A PAGE WITH FORM THAT EDITS SPECIFIC IMAGE BY ID
app.get("/gallery/:id/edit", (req, res) => {
  let paramsId = req.params.id;
  Gallery.where({
    id: paramsId
  })
}).fetch().then((img) => {
  return res.render('./edit', {
    id: img.attributes.id,
    title: img.attributes.title,
    author: img.attributes.author,
    link: img.attributes.link,
    description: img.attributes.description
  })
});

//ACTUALLY EDITS AN IMAGE BY ID
app.put("/gallery/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  Gallery.where({
    id: paramsId
  }).fetch().then((img) => {
    new Gallery({
      id: paramsId
    }).save({
      title: body.title,
      link: body.link,
      description: body.description,
      author: body.author
    }, {
      patch: true
    }).then(() => {
      return res.redirect(`/gallery/${img.id}`);
    });
  });
});

//DELETES AN IMAGE BY ID
app.delete("/gallery/:id", (req, res) => {
  const paramsId = req.params.id;

  Gallery.where({
    id: paramsId
  }).fetch().then((img) => {
    new Gallery({
      id: paramsId
    }).destroy().then(() => {
      return res.redirect(`/gallery`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Whoever is listening on ${PORT} is a bitch!!!!!!`);
});