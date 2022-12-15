import axios from "axios";

const endPoint = "http://api.openweathermap.org/data/2.5/forecast"
const appid = process.env.APP_ID;

export const getBody = async (params: any) => {
  const search = new URLSearchParams(params).toString();
  const request = [endPoint, search].join("?");
  try {
    const res = await axios.get(request, {responseType: 'json'});
    return res.data;
  } catch (error) {
    console.log("Error fetch data", error);

    throw new Error("Error");
  }
}

export const getFiveDayForecast = async (id: string) => {
  const params = {
    id,
    appid,
  };
 
  return getBody(params);
}

export const getTemperatureForCity = async (id: string) => {
  return getFiveDayForecast;
}

