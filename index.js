const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const {Blog} = require("./models/blog");
const { ObjectID } = require("mongodb");
var bodyParser = require('body-parser');
//parses the incoming req.body
//i always forget about this  :')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use es6 promises with mongoose
mongoose.Promise = Promise;
//use production db with heroku and test with local.
process.env.PORT ? 
mongoose.connect("mongodb://saxal28:gatorade2@ds153659.mlab.com:53659/blog")
: 
mongoose.connect('mongodb://localhost/blog')

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//routes
//home route
app.get("/", (req, res) => {
    res.send({
        author: "Alan Sax",
        dateCreated: "Feb 17, 2017"
    });
});

//gets blogs
app.get("/blogs", (req, res) => {
    Blog.find({}).then(blogs => {
        if(!blogs) {
            res.status(404).send({err: "No Blogs Found!"});
        }
        res.send({blogs});
    })
});

//gets blog by id

//adds new blog
app.post("/blogs", (req, res) => {
    Blog.create(req.body).then(createdBlog => {
        console.log('blog created');
        res.send({createdBlog});
    }).catch(e => res.status(400).send({e}))
});

//updates blog

//deletes blog post
app.delete("/blogs/:id", (req, res) => {

    if(ObjectID.isValid(req.params._id)) {
        return res.status(400).send({err: "Not valid object id"});
    }

    Blog.findByIdAndRemove(req.params.id).then(deletedBlog => {
        console.log("deleted blog");
        res.send({deletedBlog});
    }).catch(e => res.status(400).send({err: e}));

})

app.listen(port, () => {
    console.log("app started");
});

//for testing
module.exports = {app}