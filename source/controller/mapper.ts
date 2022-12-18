const absoluteZero = -273;
const getKelvinFromCelsius = (celsius: number): number => Math.round(celsius - absoluteZero);
const getKelvinFromFahrenheit = (fahrenheit: number): number => Math.round(1.8 * (fahrenheit - absoluteZero) + 32);
const getCelsiusFromKelvin = (kelvin: number): number => Math.round(kelvin + absoluteZero);

const mapTemperature = (forecast: ListEntry): number => forecast.main.temp;
export const mapTemperatureCelcius = (forecast: ListEntry): number => getCelsiusFromKelvin(mapTemperature(forecast));
export const mapCity = (cityMaxTemp: CityMaxTemp): string => cityMaxTemp.name;

export const getCities = (cities: string): string[] => {
  if (typeof cities !== 'string') {
    throw new Error('City should be a string');
  }

  const cityList = cities.split(',');
  if (cityList.length < 1) {
    throw new Error('No cities specified');
  }
  return cityList;
};

export const getKelvin = (temperature: string, unit: TemperatureUnit): number => {
  const temp = Number(temperature);

  if (unit === 'celsius') {
    return getKelvinFromCelsius(temp);
  } if (unit === 'fahrenheit') {
    return getKelvinFromFahrenheit(temp);
  }
  throw new Error(`Unknown unit: ${unit}`);
};

const getTomorrowDate = (): string => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;
};

const isTomorrow = (l: ListEntry) => l.dt_txt.startsWith(getTomorrowDate());

const getForecastTomorrow = (forecast: ForecastResponse) => forecast.list.filter(isTomorrow).map(mapTemperature);

export const getMaxTempTomorrow = (forecastForCity: ForecastResponse): CityMaxTemp => ({
  name: forecastForCity.city.name,
  maxTemp: Math.max(...getForecastTomorrow(forecastForCity)),
});
