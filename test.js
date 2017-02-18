const request = require('supertest');
const expect = require("expect");
const { app } = require("./index");
const { Blog } = require("./models/blog");
const { seedDB, posts } = require("./seed");


describe("\nTesting for Blog API\n", () => {

    describe("Seeding the Database....", () => {
        seedDB();
    })

    describe("\n/GET", () => {
        it('should get all blog posts', done => {
            request(app)
                .get("/blogs")
                .expect(200)
                .end(() => {
                    Blog.find({}).then(blogs => {
                        expect(blogs.length).toBe(2);
                        expect(blogs).toExist();
                        done();
                    }).catch(e => console.log(e));
                });
            });

        it("should get blog post by id", done => {
            var id = posts[0]._id;
            request(app)
                .get(`/blogs/${id}`)
                .expect(200)
                .end(() => {
                    Blog.findById(id).then(blog => {
                        expect(blog).toExist();
                        done();
                    }).catch(e => console.log(e))
                });
        });
    });

    describe("\n/POST\n", () => {
        var blogToCreate = {title: "Testing is Cool", subtitle:"cool", body:"wow"};
        it('should add a new blog', done => {
            request(app)
                .post("/blogs")
                .expect(200)
                .end(() => {
                    Blog.create(blogToCreate).then(blog => {
                        expect(blog).toExist();
                        expect(blog.title).toBe(blogToCreate.title);
                        done();
                    })
                })
        })
    })

    describe("\n/DELETE\n", () => {
        const id = posts[0]._id;
        it('should delete a blog', (done) => {
            request('app')
                .delete(`/blogs/${id}`)
                .expect(200)
                .end(() => {
                    Blog.findByIdAndRemove(id).then(blog => {
                    }).then(() => {
                        Blog.findById(id).then(blog => {
                            console.log(blog);
                            expect(blog).toNotExist();
                            done();
                        }).catch(e => console.log(e));
                    })
                })
        })
    })
    
});