const knex = require('./database/index.js');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//PORT STUFF
const PORT = 5432;
if (!PORT) {
    console.log('Port not found!');
};

// EXPRESS SERVER STUFF
const app = express();
// const galleryForm = require('./routes/galleryForm.js');


app.get('/', (req, res) => {
    res.send({
        'fuck': 'fuck'
    })
});

//DISPLAYS A PAGE WITH FORM TO ADD AN IMAGE TO THE GALLERY
app.get('/gallery/new', (req, res) => {});
//ACTUALLY ADDS AN IMAGE TO THE GALLERY
app.post('/gallery', (req, res) => {});

//RETRIEVES SPECIFIC IMAGE BY ID
app.get('/gallery/:id', (req, res) => {});

//DISPLAYS A PAGE WITH FORM THAT EDITS SPECIFIC IMAGE BY ID
app.get('/gallery/:id/edit', (req, res) => {});
//ACTUALLY EDITS AN IMAGE BY ID
app.put('/gallery/:id', (req, res) => {});

//DELETES AN IMAGE BY ID
app.delete('/gallery/:id', (req, res) => {});

app.listen(PORT, () => {
    console.log(`Whoever is listening on ${PORT} is a bitch!!!!!!`);
});