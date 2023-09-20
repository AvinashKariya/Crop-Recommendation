import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
const Predict = () => {
  const [nitrogen, setNitrogen] = useState(50.55);
  const [phosphorus, setPhosphrous] = useState(32.96);
  const [potassium, setPotassium] = useState(47.71);
  const [temperature, setTemperature] = useState(25.53);
  const [humidity, setHumidity] = useState(72.26);
  const [ph, setPh] = useState(6.45);
  const [rainfall, setRainfall] = useState(96.66);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isNaN(nitrogen) ||
      isNaN(phosphorus) ||
      isNaN(potassium) ||
      isNaN(temperature) ||
      isNaN(humidity) ||
      isNaN(ph) ||
      isNaN(rainfall)
    ) {
      return console.log("value should be in numbers");
    }

    try {
      const data = {
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall,
      };

      const response = await axios.post("http://127.0.0.1:5000/predict", data);

      const res = response.data;
      await console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Typography variant='h4' gutterBottom>
          Enter Crop Related Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                label='Nitrogen (N)'
                name='nitrogen'
                variant='outlined'
                fullWidth
                value={nitrogen}
                onChange={(e) => setNitrogen(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Phosphorus (P)'
                name='phosphorus'
                variant='outlined'
                fullWidth
                value={phosphorus}
                required
                onChange={(e) => setPhosphrous(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                label='Potassium (K)'
                name='potassium'
                required
                variant='outlined'
                fullWidth
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Temperature'
                required
                name='temperature'
                variant='outlined'
                fullWidth
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                label='Humidity'
                required
                name='humidity'
                variant='outlined'
                fullWidth
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='pH'
                required
                name='ph'
                variant='outlined'
                fullWidth
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                label='Rainfall'
                name='rainfall'
                variant='outlined'
                required
                value={rainfall}
                fullWidth
                onChange={(e) => setRainfall(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ width: "100px", padding: "10px" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Predict;
