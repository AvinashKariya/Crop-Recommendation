import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar>
      <Toolbar>
        <LocalFloristIcon
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 2 }}>
          Crop Prediction and Showcasing
        </Typography>
        <Button
          variant='text'
          color='inherit'
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}
        >
          Commodity Price
        </Button>
        <Button
          variant='text'
          color='inherit'
          onClick={() => navigate("/community")}
          sx={{ mr: 2 }}
        >
          Community
        </Button>
        {location.pathname.match("/predict") ? (
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        ) : (
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => navigate("/predict")}
          >
            Predict
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
