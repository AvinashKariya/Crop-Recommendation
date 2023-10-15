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

export const getWeather = async (lat, lan) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: {
      q: `${lat},${lan}`,
    },
    headers: {
      "X-RapidAPI-Key": "9c81aa346emshada7b8b4e005980p1ec840jsnd13fbf24d352",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const res = await response.data;
    return res;
  } catch (error) {
    console.error(error);
  }
};
