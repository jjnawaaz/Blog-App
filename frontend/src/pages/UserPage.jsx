import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogsByUserId, deleteBlog } from "../redux/actions/blogActions";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  Box,
  Paper,
} from "@mui/material";
import Header from "../components/Header";

const UserPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userBlogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogsByUserId(userId));
  }, [dispatch, userId]);

  const handleDelete = (blogId) => {
    if (
      window.confirm(
        "Do you want to delete this blog? Changes can't be undone."
      )
    ) {
      dispatch(deleteBlog(blogId));
    }
  };

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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Container sx={{ flex: 1, marginTop: 2, maxWidth: "lg" }}>
        <Paper
          elevation={3}
          sx={{ padding: 2, marginBottom: 2, width: "100%" }}
        >
          <Typography variant="h4" gutterBottom>
            User's Blogs
          </Typography>
          <List>
            {userBlogs.length > 0 ? (
              userBlogs.map((blog) => (
                <ListItem
                  key={blog._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: 2,
                    padding: 2,
                    borderRadius: "8px",
                    boxShadow: 2,
                  }}
                >
                  <ListItemText
                    primary={<Typography variant="h6">{blog.title}</Typography>}
                    secondary={
                      <Typography variant="body2">
                        {blog.content.slice(0, 1000) + "..."}
                      </Typography>
                    }
                  />
                  <Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/edit-blog/${blog._id}`)}
                      sx={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      sx={{ marginRight: "10px" }}
                    >
                      Read More
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No blogs found for this user" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default UserPage;
