import React from "react";
import { CssBaseline, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { cropList } from "../utils";
import CropCard from "../components/CropCard";
import Navbar from "../components/Navbar";
const Home = () => {
  console.log(cropList);
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' style={{ marginTop: "100px" }}>
        <Grid container gap={3}>
          {cropList.map((crop, i) => (
            <Link to={`/crop/${crop.id}`} style={{ textDecoration: "none" }}>
              <Grid item key={i}>
                <CropCard data={crop} />
              </Grid>
            </Link>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
