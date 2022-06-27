export interface City {
  name: string;
  id: string;
}

export interface Weather {
    time: string;
    time_local: string;
    temperature: number;
    dewpoint: number;
    humidity: number;
    precipitation: number;
    precipitation_3: number;
    precipitation_6: number;
    snowdepth: number;
    windspeed: number;
    peakgust: number;
    winddirection: number;
    pressure: number;
    condition: number;
}

export interface HistoricalWeather {
  meta: Record<string, any>;
  data: Weather[];
}

/**
 * ApiService
 * 
 * Used to streamline typing and getting the expected responses from the api.
 */
export class ApiService {
  private _base = 'https://bh-weather-data.s3.amazonaws.com/';
  
  getCities(): Promise<City[]> {
    return fetch(`${this._base}stations.json`).then(response => response.json()).catch(this.handleError);
  }

  getCurrentWeather(id: string): Promise<Weather> {
    return fetch(`${this._base}current/${id}.json`).then(response => response.json()).catch(this.handleError);
  }

  getHistoricalWeather(id: string): Promise<HistoricalWeather> {
    return fetch(`${this._base}historical/${id}.json`).then(response => response.json()).catch(this.handleError);
  }

  handleError(e: any) {
    console.log('api error', e);
  }
}

export default new ApiService;
