import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);
  const maxContentLength = 300; // Adjust as needed

  return (
    <Card style={{ marginBottom: "20px", maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5">{blog.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {showMore
            ? blog.content
            : `${blog.content.substring(0, maxContentLength)}${
                blog.content.length > maxContentLength ? "..." : ""
              }`}
        </Typography>
        <Button
          component={Link}
          to={`/blog/${blog._id}`} // Adjust path if needed
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read Less" : "Read More"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
