import React from "react";
import BlogCard from "./BlogCard";
import { Grid, Container } from "@mui/material";

const BlogList = ({ blogs }) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList;
