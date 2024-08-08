// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blog Application
        </Typography>
        <input type="text" placeholder="Enter " />
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
