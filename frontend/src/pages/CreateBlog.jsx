import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../redux/actions/blogActions"; // Ensure this import is correct
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
import { useNavigate } from "react-router-dom";

const CreateBlog = ({ existingBlog }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingBlog ? existingBlog.title : "");
  const [content, setContent] = useState(
    existingBlog ? existingBlog.content : ""
  );
  const [category, setCategory] = useState(
    existingBlog ? existingBlog.category : ""
  );
  const [permission, setPermission] = useState("view"); // Default permission
  const [sharedWith, setSharedWith] = useState(
    existingBlog ? existingBlog.sharedWith : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    try {
      await dispatch(
        createBlog({
          title,
          content,
          category,
          sharedWith: [{ userId: "user-id-placeholder", permission }],
        })
      ); // Replace 'user-id-placeholder' with actual user ID
      setLoading(false);
      navigate("/user");
    } catch (err) {
      setLoading(false);
      setError("Failed to create blog. Please try again.");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setSharedWith([]);
    setPermission("view");
  };

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
        {existingBlog ? "Edit Blog" : "Create Blog"}
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
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                placeholder="Technology,Travel,Food,Lifestyle"
                fullWidth
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                onClick={handleCreate}
                disabled={loading}
                sx={{ marginRight: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : existingBlog ? (
                  "Save"
                ) : (
                  "Create"
                )}
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

export default CreateBlog;
