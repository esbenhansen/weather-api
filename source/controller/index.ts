import { RequestHandler } from 'express';
import { getForecastForCity, getForecastForCities } from '../client';
import {
  getKelvin, getMaxTempTomorrow, mapTemperatureCelcius, getCities, mapCity,
} from './mapper';

export const getTemperaturesForNextDays: RequestHandler<ParamType, unknown, unknown, unknown> = async (req, res) => {
  const { id } = req.params;
  const body = await getForecastForCity(id);
  const forecast = body.list;
  const temperatures = forecast.map(mapTemperatureCelcius);
  return res.status(200).json({
    temperatures,
  });
};

export const getSummary: RequestHandler<unknown, unknown, unknown, QueryTypes> = async (req, res) => {
  const { unit } = req.query;
  const temperature = getKelvin(Number(req.query.temperature), unit);
  const cityList = getCities(req.query.cities);
  const forecastForCities = await getForecastForCities(cityList);
  const cities = forecastForCities
    .map(getMaxTempTomorrow)
    .filter((cityForecast) => cityForecast.maxTemp > temperature).map(mapCity);
  return res.status(200).json({
    cities,
  });
};
