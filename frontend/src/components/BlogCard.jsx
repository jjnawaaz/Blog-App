// src/components/BlogCard.js
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h5">{blog.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {blog.content || "excerpt"}
        </Typography>
        <Button
          component={Link}
          to={`http://localhost:5173/blog/${blog._id}`}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
