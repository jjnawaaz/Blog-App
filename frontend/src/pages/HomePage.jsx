import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import { fetchBlogs } from "../redux/actions/blogActions";
import Header from "../components/Header";
import { Button, Container, Box, Typography, Paper } from "@mui/material";

const categories = ["Technology", "Travel", "Food", "Lifestyle"];

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs()); // Fetch blogs when the component mounts
  }, [dispatch]);

  // Filter blogs based on selected category
  const filteredBlogsByCategory =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  // Further filter blogs based on search term
  const filteredBlogs = filteredBlogsByCategory.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header onSearch={handleSearch} />
      <Container sx={{ flex: 1, marginTop: 2, maxWidth: "lg" }}>
        <Paper
          elevation={3}
          sx={{ padding: 2, marginBottom: 2, width: "100%" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            mb={2}
          >
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant={selectedCategory === "All" ? "contained" : "outlined"}
                onClick={() => setSelectedCategory("All")}
                color="primary"
                sx={{
                  borderRadius: "20px",
                  padding: "6px 16px",
                  textTransform: "none",
                }}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "contained" : "outlined"
                  }
                  onClick={() => setSelectedCategory(category)}
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    padding: "6px 16px",
                    textTransform: "none",
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Box>
          <BlogList blogs={filteredBlogs} />
        </Paper>
      </Container>
    </div>
  );
};

export default HomePage;
