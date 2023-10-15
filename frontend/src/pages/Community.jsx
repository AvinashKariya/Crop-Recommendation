import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDetailsByCode } from "../api";
import CommunityCard from "../components/CommunityCard";
import firebaseapp, { auth } from "../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setReCaptcha = () => {
    window.recaptch = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };
  const getOTP = async () => {
    try {
      await setReCaptcha();
      let appVerifier = window.recaptch;
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((res) => {
          window.confirmaRes = res;
        })
        .catch((e) => console.log(e));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
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
      phone,
      district,
      state,
      country,
      city,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-post` ||
          "http://127.0.0.1:5000/create-post",
        data
      );
      const res = await response.data;
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
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-all-posts` ||
          "http://127.0.0.1:5000/get-all-posts"
      );
      const res = await response.data;
      console.log(response);
      setData(res);
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container maxWidth='xl' style={{ marginTop: "100px" }}>
      <Grid container justifyContent='flex-end'>
        <Button variant='contained' onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Post Details</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  onClick={getOTP}
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
              </Grid>
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
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleClose} color='error'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid container gap={5} marginTop='10px'>
        {data &&
          data.map((post, i) => (
            <Grid item key={i}>
              <CommunityCard data={post} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Community;
