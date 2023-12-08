import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getDetailsByCode, getWeather } from "../api";
import { cropList } from "../utils";
import { Link } from "react-router-dom";
import { attribute_range } from "../range";
const Predict = () => {
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
  const [loader, setLoader] = useState(false);
  const [disable, setdisable] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [predictText, setPredictText] = useState(null);

  const [nitrogen, setNitrogen] = useState("");
  const [enableNitrogen, setEnableNitrogen] = useState(false);
  const [customInputNitrogen, setCustomInputNitrogen] = useState("");

  const [phosphorus, setPhosphrous] = useState("");
  const [enablePhosphorus, setEnablePhosphorus] = useState(false);
  const [customInputPhosphorus, setCustomInputPhoshorus] = useState("");

  const [potassium, setPotassium] = useState("");
  const [enablePottasium, setEnablePottasium] = useState(false);
  const [customInputPottasium, setCustomInputPottasium] = useState("");

  const [ph, setPh] = useState("");
  const [enablePh, setEnablePh] = useState(false);
  const [customInputPh, setCustomInputPh] = useState("");

  const [rainfall, setRainfall] = useState("");
  const [enableRainfall, setEnableRainfall] = useState(false);
  const [customInputRainfall, setCustomInputRainfall] = useState("");

  const [temperature, setTemperature] = useState("");
  const [month, setMonth] = useState("");
  const [season, setSeason] = useState("");
  const [enableTemp, setEnableTemp] = useState(false);
  const [customInputTemp, setCustomInputTemp] = useState("");
  const [customOption, setCustomOption] = useState("");

  const [humidity, setHumidity] = useState("");
  const [enableHumid, setEnableHumid] = useState(false);
  const [customInputHumid, setCustomInputHumid] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleClickOpen = (text) => {
    setErrorText(text);
    setOpenWarning(true);
  };
  const handleClose = () => {
    setOpenWarning(false);
    setOpenPrediction(false);
  };

  //main handle submit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nitrogen);
    console.log(phosphorus);
    console.log(potassium);
    console.log(ph);
    console.log(rainfall);
    console.log(temperature);
    console.log(humidity);
    if (
      !(nitrogen || customInputNitrogen) ||
      !(phosphorus || customInputPhosphorus) ||
      !(ph || customInputPh) ||
      !(potassium || customInputPottasium) ||
      !(rainfall || customInputRainfall)
    ) {
      return handleClickOpen("All values should be filled!");
    } else if (
      !(temperature || customInputTemp) ||
      !(humidity || customInputHumid)
    ) {
      return handleClickOpen(
        "If you don't know about weather conditions you can use above functionality to get weather details about your area"
      );
    } else if (
      isNaN(customInputNitrogen) ||
      isNaN(customInputPhosphorus) ||
      isNaN(customInputPottasium) ||
      isNaN(customInputPh) ||
      isNaN(customInputRainfall)
    ) {
      return handleClickOpen("Values should be in numbers format");
    }
    setLoader(true);
    setdisable(true);
    try {
      const data = {
        nitrogen: nitrogen || customInputNitrogen,
        phosphorus: phosphorus || customInputPhosphorus,
        potassium: potassium || customInputPottasium,
        temperature: temperature || customInputTemp,
        humidity: humidity || customInputHumid,
        ph: ph || customInputPh,
        rainfall: rainfall || customInputRainfall,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/predict` ||
          "http://127.0.0.1:5000/predict",
        data
      );
      const res = await response.data;
      getCropName(res);
      setLoader(false);
      setdisable(false);
      setOpenPrediction(true);

      setNitrogen("");
      setPhosphrous("");
      setPotassium("");
      setPh("");
      setRainfall("");
      setTemperature("");
      setHumidity("");
      setCustomInputNitrogen("");
      setCustomInputPhoshorus("");
      setCustomInputPottasium("");
      setCustomInputPh("");
      setCustomInputRainfall("");
      setCustomInputTemp("");
      setCustomInputHumid("");
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
  };

  const handleChangeNitrogen = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnableNitrogen(true);
    } else {
      setNitrogen(value);
      setEnableNitrogen(false);
    }
  };
  const handleCustomInputNitrogen = (event) => {
    setCustomInputNitrogen(event.target.value);
  };

  const handleChangePhosphorus = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnablePhosphorus(true);
    } else {
      setPhosphrous(value);
      setEnablePhosphorus(false);
    }
  };
  const handleCustomInputPhosphorus = (event) => {
    setCustomInputPhoshorus(event.target.value);
  };

  const handleChangePotassium = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnablePottasium(true);
    } else {
      setPotassium(value);
      setEnablePottasium(false);
    }
  };
  const handleCustomInputPotassium = (event) => {
    setCustomInputPottasium(event.target.value);
  };

  const handleChangePh = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnablePh(true);
    } else {
      setPh(value);
      setEnablePh(false);
    }
  };
  const handleCustomInputPh = (event) => {
    setCustomInputPh(event.target.value);
  };

  const handleChangeRainfall = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnableRainfall(true);
    } else {
      setRainfall(value);
      setEnableRainfall(false);
    }
  };
  const handleCustomInputRainfall = (event) => {
    setCustomInputRainfall(event.target.value);
  };

  const getWeatherByLatLan = async (e) => {
    console.log(e.target.value);
    const month =
      e.target.value < 9
        ? "0" + (e.target.value + 1).toString()
        : (e.target.value + 1).toString();
    console.log(month);
    console.log(new Date(2022, e.target.value + 1, 0).getDate());
    const tot_days = new Date(2022, e.target.value + 1, 0).getDate();
    const res = await getWeather(
      locationData.lat,
      locationData.lng,
      "01",
      tot_days.toString(),
      null,
      null,
      null,
      null,
      month
    );
    console.log(res);
    const res_temp = calculateTemp(res.hourly.temperature_2m);
    const res_humid = calculateHumid(res.hourly.relativehumidity_2m);
    setCustomInputTemp(res_temp);
    setCustomInputHumid(res_humid);
  };

  const calculateTemp = (data) => {
    const sum = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = sum / data.length;
    console.log("Average:", average);
    return average;
  };

  const calculateHumid = (data) => {
    const sum = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = sum / data.length;
    console.log("Average:", average);
    return average;
  };

  const handleChangeTemperature = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnableTemp(true);
    } else {
      setEnableTemp(false);
      setTemperature(value);
    }
  };
  const handleCustomOptionChange = (event) => {
    const option = event.target.value;
    setCustomOption(option);
  };
  const handleMonthSelect = async (event) => {
    const selectedMonth = event.target.value;
    console.log(selectedMonth);
    setMonth(selectedMonth);
    //api call
    await getWeatherByLatLan(event);
  };

  const handleSeasonSelect = async (event) => {
    const selectedSeason = event.target.value;
    setSeason(selectedSeason);
    console.log(selectedSeason);
    let st_month;
    let ed_month;
    let st_year;
    let ed_year;
    if (selectedSeason === "kharif") {
      st_month = "06";
      ed_month = "10";
      st_year = "2022";
      ed_year = "2022";
    } else if (selectedSeason === "rabi") {
      st_month = "10";
      ed_month = "03";
      st_year = "2022";
      ed_year = "2023";
    } else if (selectedSeason === "zaid") {
      st_month = "03";
      ed_month = "06";
      st_year = "2023";
      ed_year = "2023";
    }

    const res = await getWeather(
      locationData.lat,
      locationData.lng,
      "01",
      "30",
      st_month,
      ed_month,
      st_year,
      ed_year
    );
    console.log(res);
    const res_temp = calculateTemp(res.hourly.temperature_2m);
    const res_humid = calculateHumid(res.hourly.relativehumidity_2m);
    setCustomInputTemp(res_temp);
    setCustomInputHumid(res_humid);
  };

  const handleChangeHumid = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      setEnableHumid(true);
    } else {
      setHumidity(value);
      setEnableHumid(false);
    }
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
              <Button
                type='submit'
                variant='contained'
                style={{ backgroundColor: "#4F6F52", color: "white" }}
              >
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
              inputProps={{ readOnly: true }}
              variant='outlined'
              fullWidth
              value={locationData.country_code}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='State'
              name='state'
              inputProps={{ readOnly: true }}
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
              inputProps={{ readOnly: true }}
              variant='outlined'
              fullWidth
              value={locationData.district}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='City'
              name='taluka'
              inputProps={{ readOnly: true }}
              variant='outlined'
              fullWidth
              value={locationData.area}
            />
          </Grid>
        </Grid>
      </Container>
      <Container container style={{ marginBottom: "50px", marginTop: "50px" }}>
        <Typography variant='h4' gutterBottom>
          Enter Crop Related Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Nitrogen
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enableNitrogen ? "custom" : nitrogen}
                      label='Nitrogen'
                      onChange={handleChangeNitrogen}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[0].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enableNitrogen && (
                  <Grid item>
                    <TextField
                      label='Nitrogen (N)'
                      name='nitrogen'
                      variant='outlined'
                      value={customInputNitrogen}
                      required
                      onChange={handleCustomInputNitrogen}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Phosphorus
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enablePhosphorus ? "custom" : phosphorus}
                      label='Phosphorus'
                      onChange={handleChangePhosphorus}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[1].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enablePhosphorus && (
                  <Grid item>
                    <TextField
                      label='Phosphorus (P)'
                      name='phosphorus'
                      variant='outlined'
                      value={customInputPhosphorus}
                      required
                      onChange={handleCustomInputPhosphorus}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Potassium
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enablePottasium ? "custom" : potassium}
                      label='Potassium'
                      onChange={handleChangePotassium}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[2].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enablePottasium && (
                  <Grid item>
                    <TextField
                      label='Potassium (K)'
                      name='potassium'
                      variant='outlined'
                      value={customInputPottasium}
                      required
                      onChange={handleCustomInputPotassium}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Temperature
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enableTemp ? "custom" : temperature}
                      label='Temperature'
                      onChange={handleChangeTemperature}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[3].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enableTemp && (
                  <>
                    <Grid item>
                      <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id='demo-simple2-select-label'>
                          Select Type
                        </InputLabel>
                        <Select
                          labelId='demo-simple2-select-label'
                          id='demo-simple-select'
                          label='Select Month'
                          value={customOption}
                          onChange={handleCustomOptionChange}
                        >
                          <MenuItem value='Season'>Season</MenuItem>
                          <MenuItem value='Month'>Month</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {customOption === "Season" ? (
                      <Grid item>
                        <FormControl sx={{ minWidth: 150 }}>
                          <InputLabel id='demo-simple3-select-label'>
                            Select Season
                          </InputLabel>
                          <Select
                            labelId='demo-simple3-select-label'
                            id='demo-simple-select'
                            value={season}
                            label='Select Season'
                            onChange={handleSeasonSelect}
                          >
                            <MenuItem value='kharif'>Kharif</MenuItem>
                            <MenuItem value='rabi'>Rabi</MenuItem>
                            <MenuItem value='zaid'>Zaid</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : (
                      <Grid item>
                        <FormControl sx={{ minWidth: 150 }}>
                          <InputLabel id='demo-simple2-select-label'>
                            Select Month
                          </InputLabel>
                          <Select
                            labelId='demo-simple2-select-label'
                            id='demo-simple-select'
                            value={month}
                            label='Select Month'
                            onChange={handleMonthSelect}
                          >
                            {monthNames.map((item, i) => (
                              <MenuItem value={i} key={i}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Humidity
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enableHumid ? "custom" : humidity}
                      label='Humidity'
                      onChange={handleChangeHumid}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[4].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>pH</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enablePh ? "custom" : ph}
                      label='pH'
                      onChange={handleChangePh}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[5].range_value.map((item, i) => (
                        <MenuItem value={item} key={i}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enablePh && (
                  <Grid item>
                    <TextField
                      label='pH'
                      name='ph'
                      variant='outlined'
                      value={customInputPh}
                      required
                      onChange={handleCustomInputPh}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id='demo-simple-select-label'>
                      Rainfall
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={enableRainfall ? "custom" : rainfall}
                      label='Rainfall'
                      onChange={handleChangeRainfall}
                    >
                      <MenuItem value='custom'>Custom</MenuItem>
                      {attribute_range[6].range_value.map((item, i) => (
                        <MenuItem value={item.imputed_value} key={i}>
                          {item.min} - {item.max}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {enableRainfall && (
                  <Grid item>
                    <TextField
                      label='Rainfall (mm)'
                      name='rainfall'
                      variant='outlined'
                      value={customInputRainfall}
                      required
                      onChange={handleCustomInputRainfall}
                    />
                  </Grid>
                )}
              </Grid>
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
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "#4F6F52",
                  color: "white",
                }}
                disabled={disable}
                //add disabled button
              >
                {loader ? (
                  <CircularProgress
                    sx={{
                      display: "flex",
                    }}
                    color='inherit'
                  />
                ) : (
                  "submit"
                )}
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
              🌱 Here's the result:
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
