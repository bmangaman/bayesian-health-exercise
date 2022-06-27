import React from 'react';
import './CityWeather.scss';
import ApiService, { City, HistoricalWeather, Weather } from '../api.service';

export interface CityWeatherProps {
  city: City;
}

export interface CityWeatherState {
    current: Weather;
    historic: Weather[];
  }

class CityWeather extends React.Component<CityWeatherProps, CityWeatherState> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: {} as Weather,
      historic: [],
    };
  }

  componentDidMount() {
    Promise.all([
      ApiService.getCurrentWeather(this.props.city.id),
      ApiService.getHistoricalWeather(this.props.city.id)
    ]).then((responses: [Weather, HistoricalWeather]) => {
      this.setState({ current: responses[0], historic: responses[1].data });
    });
  }

  render(): React.ReactNode {
    return (
      <div className="city-weather">
        <div>
          <h2 className="city-weather__name">{this.props.city.name}</h2>
          <div className="city-weather__current">
            <table>
              <tbody>
                { Object.entries(this.state.current).map((weather) =>
                  <tr key={weather[0]}>
                    <td>{weather[0]}</td>
                    <td>{weather[1] || '-'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="city-weather__historical"></div>
      </div>
    );
  }

}

export default CityWeather;
