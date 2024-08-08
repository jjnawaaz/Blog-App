import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
    localStorage.removeItem("userInfo"); // Remove user info from local storage
    navigate("/"); // Redirect to login page
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to parent component
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="Home" />
      </ListItem>
      {userInfo ? (
        <>
          <ListItem
            button
            component={Link}
            to="/user"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/user/createblog"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Create Blog" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <ListItem
          button
          component={Link}
          to="/login"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Login/Sign Up" />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hidden on small screens */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Blog Application
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                marginRight: 2,
                backgroundColor: "white",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "skyblue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "skyblue",
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              marginRight: 3,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter search term"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                marginRight: 2,
                backgroundColor: "white",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "skyblue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "skyblue",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {userInfo ? (
              <>
                <Button color="inherit" component={Link} to="/user">
                  Profile
                </Button>
                <Button color="inherit" component={Link} to="/user/createblog">
                  Create Blog
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login/Sign Up
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Header;
