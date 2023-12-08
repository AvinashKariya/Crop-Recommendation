import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ backgroundColor: "#4F6F52", width: "15%", height: "100vh" }}>
        <List>
          <ListItem
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemButton>
              <ListItemText primary='All Post' />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/accepted-post");
            }}
          >
            <ListItemButton>
              <ListItemText primary='Accepted Post' />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/rejected-post");
            }}
          >
            <ListItemButton>
              <ListItemText primary='Rejected Post' />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate("/pending-post");
            }}
          >
            <ListItemButton>
              <ListItemText primary='Pending Post' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Navbar;
