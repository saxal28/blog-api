const { Blog } = require("./models/blog");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
require("colors");

//static created posts
const posts = [
    {title:"My First Post", subtitle:"My First Subtitle", body: 'first', _id: new ObjectID()},
    {title: "My Second Post", subtitle:"My Second Subtitle", body: "second",  _id: new ObjectID()}
]

function seedDB() {
    //delete all blog posts
    Blog.remove({}).then(() => {
    console.log("removed posts....".red);
    //create two blog posts
        Blog.create(posts).then(createdPosts => {
            console.log("created posts....".green);
        }).catch(e => console.log(e));
    });
}

module.exports = {
    seedDB,
    posts
}
