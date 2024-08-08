const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const auth = require("../middlewares/auth");
const router = express.Router();

// @route  POST api/blogs
// @desc   Create a blog
// @access Private
router.post("/", auth, createBlog);

// @route  GET api/blogs
// @desc   Get all blogs
// @access Public
router.get("/", getBlogs);

// @route  GET api/blogs/:id
// @desc   Get blog by ID
// @access Public
router.get("/:id", getBlogById);

// @route  PUT api/blogs/:id
// @desc   Update a blog
// @access Private
router.put("/:id", auth, updateBlog);

// @route  DELETE api/blogs/:id
// @desc   Delete a blog
// @access Private
router.delete("/:id", auth, deleteBlog);

module.exports = router;
