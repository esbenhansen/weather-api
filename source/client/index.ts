import axios from 'axios';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const forecastCache = new CacheContainer(new MemoryStorage());

const endPoint = 'http://api.openweathermap.org/data/2.5/forecast';

const appid = process.env.APP_ID;

if (!appid || appid === '') {
  console.log('Please set APP_ID env variable'); // eslint-disable-line no-console
  process.exit(1);
}

export const getForecast = async (id: string): Promise<ForecastResponse> => {
  const search = new URLSearchParams({ id, appid }).toString();
  const request = [endPoint, search].join('?');
  try {
    const res = await axios.get(request, { responseType: 'json' });
    return res.data;
  } catch (error) {
    console.log('Error fetch data', error); // eslint-disable-line no-console

    throw new Error('Error');
  }
};

export const getForecastForCity = async (id: string): Promise<ForecastResponse> => {
  const cachedForecast = await forecastCache.getItem<ForecastResponse>(id);

  if (cachedForecast != null) {
    return cachedForecast;
  }

  const forecast = await getForecast(id);
  await forecastCache.setItem(id, forecast, { ttl: 60 * 60 });
  return forecast;
};

export const getForecastForCities = async (ids: string[]): Promise<ForecastResponse[]> => Promise.all(ids.map(getForecastForCity));
