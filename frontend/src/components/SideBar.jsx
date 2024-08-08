// src/components/Sidebar.js
import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const categories = ["Technology", "Travel", "Food", "Lifestyle"];

const Sidebar = () => {
  return (
    <div style={{ width: "250px", padding: "20px" }}>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            component={Link}
            to={`/category/${category}`}
            key={category}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/search">
          <ListItemText primary="Search" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
