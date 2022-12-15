import { RequestHandler } from 'express';
import { getFiveDayForecast, getTemperatureForCity } from "../client";

const absoluteZero = -273;
const getTemperatureCelcius = (tempKelvin: number) => Math.round(tempKelvin + absoluteZero)
const getTemperatureFahrenheit = (tempKelvin: number) => Math.round(1.8 * (tempKelvin + absoluteZero) + 32)

const getTemperature = (temperature: string, unit: "celcius" | "fahrenheit") => {
  const temp = Number(temperature);
  if (temp < 0) {
    throw new Error("Temperature should be above 0");
  }

  if (unit == "celcius") {
    return getTemperatureCelcius(temp);
  } else if (unit == "fahrenheit") {
    return getTemperatureFahrenheit(temp);
  } 
  throw new Error(`Unknown unit: ${unit}`);
}

const getCities = (cities: string) => {
  if (typeof cities != "string") {
    throw new Error("City should be a string");
  }

  const cityList = cities.split(",");
  if (cityList.length < 1) {
    throw new Error("No cities specified");
  }
  return cityList;
}

export const getForecast: RequestHandler<ParamType, unknown, unknown, unknown> = async (req, res) => {
  const id = req.params.id;
  const body = await getFiveDayForecast(id);
  const forecast = body.list;
  const temp = getTemperatureCelcius(forecast[0].main.temp);
  return res.status(200).json({
    message: temp
  });
}

export const getSummary: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
  const unit = req.query.unit;
  const temperature = getTemperature(req.query.temperature, unit);
  const cities = getCities(req.query.cities);
  const temperatureForCities = cities.map(getTemperatureForCity).filter;

  return res.status(200).json({
    message: "temp"
  });
}
