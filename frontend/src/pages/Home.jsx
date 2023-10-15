import React from "react";
import { CssBaseline, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { cropList } from "../utils";
import CropCard from "../components/CropCard";
const Home = () => {
  console.log(cropList);
  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' style={{ marginTop: "100px" }}>
        <Grid container gap={3}>
          {cropList.map((crop, i) => (
            <Link
              to={`/crop/${crop.id}`}
              style={{ textDecoration: "none" }}
              key={i}
            >
              <Grid item>
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
