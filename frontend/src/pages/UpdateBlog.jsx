import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog, fetchBlogById } from "../redux/actions/blogActions";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const UpdateBlog = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current blog and loading status from the state
  const blog = useSelector((state) => state.blog.currentBlog);
  const loading = useSelector((state) => state.blog.loading);
  const error = useSelector((state) => state.blog.error);

  // Local state for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [permission, setPermission] = useState("view");

  // State for validation errors
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: "",
  });

  // Fetch blog details on component mount
  useEffect(() => {
    if (_id) {
      dispatch(fetchBlogById(_id));
    }
  }, [dispatch, _id]);

  // Populate the form fields with the fetched blog data
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategory(blog.categoryId); // Assuming categoryId is returned from the backend
      setPermission(
        blog.sharedWith && blog.sharedWith.length > 0
          ? blog.sharedWith[0].permission
          : "view"
      );
    }
  }, [blog]);

  // Handle form submission
  const handleUpdate = async () => {
    // Reset error states
    setErrors({
      title: "",
      content: "",
      category: "",
    });

    let valid = true;

    // Validation checks
    if (title.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required.",
      }));
      valid = false;
    }
    if (content.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        content: "Content is required.",
      }));
      valid = false;
    }
    if (category.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "Category is required.",
      }));
      valid = false;
    }

    try {
      await dispatch(
        updateBlog(_id, {
          title,
          content,
          category,
          sharedWith: [{ userId: "user-id-placeholder", permission }],
        })
      );
      navigate(`/user`); // Redirect to the blog detail page after updating
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Handle permission radio button change
  const handlePermissionChange = (e) => {
    setPermission(e.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit Blog
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                fullWidth
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                error={!!errors.category}
                helperText={errors.category}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                multiline
                rows={4}
                fullWidth
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                error={!!errors.content}
                helperText={errors.content}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="h6" gutterBottom>
                  Permission
                </Typography>
                <RadioGroup
                  value={permission}
                  onChange={handlePermissionChange}
                  row
                  sx={{ marginBottom: 2 }}
                >
                  <FormControlLabel
                    value="view"
                    control={<Radio />}
                    label="View"
                  />
                  <FormControlLabel
                    value="edit"
                    control={<Radio />}
                    label="Edit"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={loading}
                sx={{ marginRight: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Save"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {error}
                </Alert>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default UpdateBlog;
