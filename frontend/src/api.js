import axios from "axios";

export const getDetailsByCode = async (pincode) => {
  const options = {
    method: "GET",
    url: "https://global-zip-codes-with-lat-and-lng.p.rapidapi.com/api/v1/geocode",
    params: { code: pincode },
    headers: {
      "X-RapidAPI-Key": "9c81aa346emshada7b8b4e005980p1ec840jsnd13fbf24d352",
      "X-RapidAPI-Host": "global-zip-codes-with-lat-and-lng.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  const res = await response.data;
  return res;
};

export const getWeather = async (
  lat,
  lan,
  st_dt,
  ed_dt,
  st_mnt,
  ed_mnt,
  st_yr,
  ed_yr,
  month
) => {
  console.log(st_dt, ed_dt, lat, lan);
  const options = {
    method: "GET",
    url: `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lan}&hourly=temperature_2m,relativehumidity_2m&start_date=${
      st_yr || `2022`
    }-${st_mnt || month}-${st_dt}&end_date=${ed_yr || "2022"}-${
      ed_mnt || month
    }-${ed_dt}`,
  };

  try {
    const response = await axios.request(options);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const sendSms = async (phone) => {
  const phone2 = "+91" + phone;
  const options = {
    method: "POST",
    url: "https://textflow-sms-api.p.rapidapi.com/send-sms",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "9c81aa346emshada7b8b4e005980p1ec840jsnd13fbf24d352",
      "X-RapidAPI-Host": "textflow-sms-api.p.rapidapi.com",
    },
    data: {
      phone_number: phone,
      text: "Test message from TextFlow",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
