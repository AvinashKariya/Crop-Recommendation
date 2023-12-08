import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDetailsByCode } from "../api";
import CommunityCard from "../components/CommunityCard";
const Community = () => {
  const [open, setOpen] = useState(false);
  const [nitrogen, setNitrogen] = useState("");
  const [cropname, setCropname] = useState("");
  const [phosphrus, setPhosphrous] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loader_submit, setLoader_submit] = useState(false);
  const [openwarning, setOpenWarning] = useState(false);
  const [errorText, setErrorText] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenDialogue = (text) => {
    setOpenWarning(true);
    setErrorText(text);
  };

  const handleCloseDialogue = () => {
    setOpenWarning(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    //validating values
    if (
      !nitrogen ||
      !phosphrus ||
      !ph ||
      !potassium ||
      !rainfall ||
      !email ||
      !pincode
    ) {
      return handleClickOpenDialogue("All values should be filled!");
    } else if (
      isNaN(nitrogen) ||
      isNaN(phosphrus) ||
      isNaN(potassium) ||
      isNaN(ph) ||
      isNaN(rainfall) ||
      isNaN(temperature) ||
      isNaN(humidity)
    ) {
      return handleClickOpenDialogue("Values should be numbers");
    }

    const res = await getDetailsByCode(pincode);
    const city = res[0].area;
    const district = res[0].district;
    const state = res[0].state;
    const country = res[0].country_code;

    const data = {
      cropname,
      nitrogen,
      phosphrus,
      potassium,
      temp: temperature,
      humidity,
      ph,
      rainfall,
      email,
      district,
      state,
      country,
      city,
      status: "pending",
    };
    setLoader_submit(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/create-post",
        data
      );
      const res = await response.data;
      setLoader_submit(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setHumidity("");
    setEmail("");
    setNitrogen("");
    setPh("");
    setPhone("");
    setPhosphrous("");
    setPincode("");
    setPotassium("");
    setRainfall("");
    setTemperature("");
    handleClose();
    getPosts();
  };

  const getPosts = async () => {
    setLoader(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/get-all-posts");
      const res = await response.data;
      console.log(response);
      setData(res);
      console.log(res);
      setLoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container
      maxWidth='xl'
      style={{ marginTop: "90px", marginBottom: "10px" }}
    >
      <Grid container justifyContent='flex-end'>
        <Button
          variant='contained'
          onClick={handleClickOpen}
          style={{ backgroundColor: "#4F6F52", color: "white" }}
        >
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Post Details</DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  label='Phone'
                  name='phone'
                  variant='standard'
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant='contained'
                  sx={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Get OTP
                </Button>
              </Grid>
              <div id='recaptcha-container'></div>
              <Grid item xs={12}>
                <TextField
                  label='OTP'
                  name='otp'
                  variant='standard'
                  value={phone}
                  required
                  disabled
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant='contained'
                  sx={{ marginTop: "10px", marginLeft: "10px" }}
                  disabled
                >
                  Get OTP
                </Button>
              </Grid> */}
              <Grid item xs={6}>
                <TextField
                  label='Pincode'
                  name='pincode'
                  variant='standard'
                  fullWidth
                  value={pincode}
                  required
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name='email'
                  label='Email Address'
                  type='email'
                  fullWidth
                  variant='standard'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12}>
                <TextField
                  label='Crop Name'
                  name='cropname'
                  variant='outlined'
                  fullWidth
                  value={cropname}
                  required
                  onChange={(e) => setCropname(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label='Nitrogen (N)'
                  name='nitrogen'
                  variant='outlined'
                  fullWidth
                  value={nitrogen}
                  required
                  onChange={(e) => setNitrogen(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label='Phosphorus (P)'
                  name='phosphorus'
                  variant='outlined'
                  fullWidth
                  value={phosphrus}
                  required
                  onChange={(e) => setPhosphrous(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label='Potassium (K)'
                  name='potassium'
                  variant='outlined'
                  fullWidth
                  value={potassium}
                  required
                  onChange={(e) => setPotassium(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={6}>
                <TextField
                  label='Temperature (c)'
                  name='temperature'
                  variant='outlined'
                  fullWidth
                  value={temperature}
                  required
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Humidity'
                  name='humidity'
                  variant='outlined'
                  fullWidth
                  value={humidity}
                  required
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
                  required
                  onChange={(e) => setPh(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Rainfall (mm)'
                  name='rainfall'
                  variant='outlined'
                  fullWidth
                  value={rainfall}
                  required
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              sx={{ color: "#4F6F52" }}
              disabled={loader_submit}
            >
              {loader_submit ? (
                <CircularProgress
                  sx={{
                    display: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  color='success'
                />
              ) : (
                "submit"
              )}
            </Button>
            <Button onClick={handleClose} color='error'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openwarning}
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
            <Button onClick={handleCloseDialogue}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      {loader && (
        <CircularProgress
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
          }}
          color='success'
        />
      )}
      {data && (
        <Grid container gap={5} marginTop='10px'>
          {data &&
            !loader &&
            data.map((post, i) => (
              <Grid item key={i}>
                <CommunityCard data={post} />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Community;
