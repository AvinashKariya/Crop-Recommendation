import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getDetailsByCode, getWeather } from "../api";
import { cropList } from "../utils";
import { Link } from "react-router-dom";
const Predict = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphrous] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [pincode, setPincode] = useState("");
  const [locationData, setLocationData] = useState({
    country_code: "",
    district: "",
    area: "",
    state: "",
    lat: "",
    lng: "",
  });
  const [openWarning, setOpenWarning] = useState(false);
  const [openPrediction, setOpenPrediction] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [predictText, setPredictText] = useState(null);
  const handleClickOpen = (text) => {
    setErrorText(text);
    setOpenWarning(true);
  };
  const handleClose = () => {
    setOpenWarning(false);
    setOpenPrediction(false);
  };

  const fillDefaultValues = (e) => {
    if (e.target.checked) {
      setNitrogen(nitrogen ? nitrogen : 50.55);
      setPhosphrous(phosphorus ? phosphorus : 32.96);
      setPotassium(potassium ? potassium : 47.71);
      setPh(ph ? ph : 6.45);
      setRainfall(rainfall ? rainfall : 96.66);
    }
    if (!e.target.checked) {
      setNitrogen("");
      setPhosphrous("");
      setPotassium("");
      setPh("");
      setRainfall("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nitrogen &&
      !phosphorus &&
      !potassium &&
      !ph &&
      !rainfall &&
      temperature &&
      humidity
    ) {
      return handleClickOpen(
        "If you don't know the soil details then you can just check given box above submit, it will add values automatically. But that values could not be same as your soil so it can give different result!"
      );
    } else if (
      !nitrogen &&
      !phosphorus &&
      !potassium &&
      !ph &&
      !rainfall &&
      !temperature &&
      !humidity
    ) {
      return handleClickOpen(
        "All fields should be filled, atleast enter 3 or 4 details"
      );
    } else if (
      nitrogen &&
      phosphorus &&
      potassium &&
      ph &&
      rainfall &&
      !temperature &&
      !humidity
    ) {
      return handleClickOpen(
        "If you don't know about weather conditions you can use above functionality to get weather details about your area"
      );
    } else if (
      isNaN(nitrogen) ||
      isNaN(phosphorus) ||
      isNaN(potassium) ||
      isNaN(temperature) ||
      isNaN(humidity) ||
      isNaN(ph) ||
      isNaN(rainfall)
    ) {
      handleClickOpen("Values should be in numbers format");
      return;
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
      const res = await response.data;
      getCropName(res);
      setOpenPrediction(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getCropName = (res) => {
    console.log(res);
    const foundCrop = cropList.find(
      (crop) => crop.id === parseInt(res.crop_id)
    );
    setPredictText(foundCrop ? foundCrop : null);
    console.log(predictText);
  };
  const getByCode = async (e) => {
    e.preventDefault();
    const res = await getDetailsByCode(pincode);
    console.log(res);
    setLocationData({
      country_code: res[0].country_code,
      district: res[0].district,
      area: res[0].area ? res[0].area : res[0].district,
      state: res[0].state,
      lat: res[0].lat,
      lng: res[0].lng,
    });
    setButtonEnable(false);
  };

  const getWeatherByLatLan = async () => {
    const res = await getWeather(locationData.lat, locationData.lng);
    console.log(res);
    setTemperature(res.current.temp_c);
    setHumidity(res.current.humidity);
  };

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Typography variant='h4' gutterBottom>
          Enter Location Details
        </Typography>
        <form onSubmit={getByCode}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <TextField
                label='Pincode'
                name='pincode'
                variant='outlined'
                value={pincode}
                required
                onChange={(e) => setPincode(e.target.value)}
              />
              <Button type='submit' variant='contained' color='primary'>
                Get details
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={6}>
            <TextField
              label='Country Code'
              name='country'
              disabled
              variant='outlined'
              fullWidth
              value={locationData.country_code}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='State'
              name='state'
              disabled
              variant='outlined'
              fullWidth
              value={locationData.state}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={6}>
            <TextField
              label='District'
              name='district'
              disabled
              variant='outlined'
              fullWidth
              value={locationData.district}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='City'
              name='taluka'
              disabled
              variant='outlined'
              fullWidth
              value={locationData.area}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Grid item xs={6}>
            <TextField
              label='Latitude'
              name='latitude'
              disabled
              variant='outlined'
              value={locationData.lat}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Longitude'
              name='longitude'
              disabled
              variant='outlined'
              value={locationData.lng}
              fullWidth
            />
          </Grid>
        </Grid> */}
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
              disabled={buttonEnable}
              onClick={() => getWeatherByLatLan()}
            >
              Get Weather Details
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container style={{ marginBottom: "50px" }}>
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
                onChange={(e) => setPhosphrous(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <TextField
                label='Potassium (K)'
                name='potassium'
                variant='outlined'
                fullWidth
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Temperature (c)'
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
                label='Rainfall (mm)'
                name='rainfall'
                variant='outlined'
                value={rainfall}
                fullWidth
                onChange={(e) => setRainfall(e.target.value)}
              />
            </Grid>
          </Grid>
          <Typography sx={{ p: 2 }}>
            <Checkbox onClick={(e) => fillDefaultValues(e)} />
            *If you don't know values then machine can use default values which
            can be inacurrate in some caes. If you are agree then just check the
            box.
          </Typography>
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
        <Dialog
          open={openWarning}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {"Invalid Input Fields !"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {errorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPrediction}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {`Predicted Crop - ${predictText ? predictText["Crop Name"] : ""}!`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Just predicted the crop according to given information! <br />
              🌱 Here's the result: $
              {predictText ? predictText["Crop Name"] : ""}🌾
              <br />
              <br />
              if you want to check details about predicted crop,{" "}
              <Link to={`/crop/${predictText ? predictText.id : ""}`}>
                Click here
              </Link>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Predict;
