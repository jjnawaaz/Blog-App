const Blog = require("../models/Blog");
const User = require("../models/User");

exports.createBlog = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const blog = new Blog({
      title,
      content,
      author: req.user.id,
      category,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", ["name", "email"]);
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", [
      "name",
      "email",
    ]);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content, category } },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await blog.deleteOne({ _id: req.params.id });
    res.json({ msg: "Blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getBlogsByUserId = async (req, res) => {
  try {
    // Find blogs created by the currently logged-in user
    const blogs = await Blog.find({ author: req.user.id }).populate("author", [
      "name",
      "email",
    ]);

    if (!blogs.length) {
      return res.status(404).json({ msg: "No blogs found for this user" });
    }

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
