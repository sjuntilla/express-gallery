const knex = require("./database/index.js");
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
const Gallery = require("./models/gallerymodel.js");

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

//HBS STUFF
app.engine(
  "handlebars",
  hbs({
    defaultLayout: "index"
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
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

app.get("/gallery", (req, res) => {
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
//DISPLAYS A PAGE WITH FORM TO ADD AN IMAGE TO THE GALLERY
app.get("/gallery/new", (req, res) => {
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

//ACTUALLY ADDS AN IMAGE TO THE GALLERY
app.post("/gallery", (req, res) => {
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
          return res.json({
            eat: "my entire ass"
          });
        });
    });
});

//RETRIEVES SPECIFIC IMAGE BY ID
app.get("/gallery/:id", (req, res) => {
  let reqParams = req.params.id;
  return new Gallery()
    .where({
      id: reqParams
    })
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
app.get("/gallery/:id/edit", (req, res) => {
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

//ACTUALLY EDITS AN IMAGE BY ID
app.put("/gallery/:id", (req, res) => {
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
        .save(
          {
            link: body.link,
            description: body.description,
            author: body.author
          },
          {
            patch: true
          }
        )
        .then(() => {
          return res.json({
            "i hate": "bookshelf"
          });
        });
    });
});

//DELETES AN IMAGE BY ID
app.delete("/gallery/:id", (req, res) => {
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

app.get("/css/styles.css", (req, res) => {
  fs.readFile("./public/css/styles.css", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.write(data.toString());
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Whoever is listening on ${PORT} is a bitch!!!!!!`);
});
