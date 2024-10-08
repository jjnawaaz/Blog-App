import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../redux/actions/blogActions";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Container, Paper, CircularProgress, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const BlogDetailPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.currentBlog);
  const loading = useSelector((state) => state.blog.loading);

  useEffect(() => {
    if (_id) {
      dispatch(fetchBlogById(_id));
    }
  }, [dispatch, _id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="textSecondary">
          Blog not found
        </Typography>
      </Container>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Header />
        <Container>
          <Paper style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {blog.author ? blog.author.name : "Unknown Author"} |{" "}
              {new Date(blog.date).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              style={{ lineHeight: 1.6 }}
            >
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </Typography>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default BlogDetailPage;
