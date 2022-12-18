/* eslint-disable @typescript-eslint/no-unused-vars */
type ParamType = {
  id: string
};

type TemperatureUnit = 'celsius' | 'fahrenheit';

type QueryTypes = {
  unit: TemperatureUnit
  temperature: string
  cities: string
};

type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
};

type Weather = {
  id: number
  main: string
  description: string
  icon: string
};

type ListEntry = {
  dt: number
  main: Main
  weather: Weather
  clouds: any
  wind: any
  visibility: number
  pop: number
  snow: any
  sys: any
  dt_txt: string
};

type ForecastResponse = {
  cod: string
  message: number
  cnt: number
  list: ListEntry[]
  city: City
};

type City = {
  name: string
  country: string
  timezone: string
};

type CityMaxTemp = {
  name: string
  maxTemp: number
};

type GetForecastResponse = {
  temperatures: number[]
};
