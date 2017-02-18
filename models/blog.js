const mongoose = require("mongoose");
mongoose.Promise = Promise;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: "My First Blog",
//     subtitle: "This is great",
//     body: "This is some text"
// }).then(blog => {
//     console.log("blog created: ", blog);
// })

module.exports.Blog = Blog;