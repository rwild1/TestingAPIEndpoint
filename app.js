// import package
import express  from 'express';

// creat an express application
const app = express();
// setting the environment to port or 3000 if there's nothing there
const port = process.env.PORT || 3000;

// access mongodb
const MongoClient = require('mongodb').MongoClient;
//connection url
const mongourl = 'mongodb://127.0.0.1:27017/';
// database name
const dbName = 'movies';
// collection name
const collectionName = 'movies';
let db;

// use connect method to connect to the server
MongoClient.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) throw err;

    db = client.db(dbName);

    // listen for connection on the specified port
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

// middleware that only parses urlencoded bodies
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// landing page
app.get('/', (req, res) => {
    res.send('Welcome to Testing API Endpoint with Mocha and Chai')
});

// post request to add movie into db
app.post('/addMovie', (req, res) => {
    // if valid, insert into db
    if (req.body.name) {
        db.collection(collectionName).insertOne(req.body)
            .then(result => {
                res.send('data inserted');
                console.log('result : ', result);
            })
            .catch(err => console.error(`Failed to insert: ${err}`));
    } else {
        res.sendStatus(400);
    }
});

// get request to query db by movie name
app.get('/getMovie/:name', (req, res) => {
    const name = req.params.name;
    console.log('req.params.name : ', req.params.name);

    db.collection(collectionName).find({"name": name}).toArray((err, result) => {
        if (err) throw err;
        if (result.length){
            res.send(result);
        } else {
            res.sendStatus(404)
        }
    });
});


// put request to update movie in db
app.put('/updateMovie', (req, res) => {
    // if valid, update data in db
    if (req.body.name) {
        console.log('req.params.name : ', req.params.name);

        db.collection(collectionName).findOneAndUpdate({"name": req.body.name}, {
            $set: {
                name: req.body.name,
                genre: req.body.genre,
                rating: req.body.rating,
                language: req.body.language
            }
        }, {
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        })
    } else {
        res.sendStatus(400);
    }
});

// delete request to delete movie from db
app.delete('/deleteMovie/:name', (req, res) => {
    const name = req.params.name;
    console.log('req.params.name : ', req.params.name);

    db.collection(collectionName).findOneAndDelete({
        "name": name
    }, (err, result) => {
        if (err) return res.send(err);
        console.log(result);
        if (result.value) {
            res.send({message: 'Movie deleted'});
        } else {
            res.sendStatus(404);
        }
    });
});
