import React from 'react';
import './App.scss';
import ApiService, { City } from './api.service';
import CityWeather from './CityWeather/CityWeather';

export interface AppState {
  allCities: City[];
  visibleCities: City[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      allCities: [],
      visibleCities: [],
    };
  }

  componentDidMount() {
    ApiService.getCities().then((cities: City[]) => this.setState({ allCities: cities, visibleCities: cities }));
  }

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <header>
          <h1>Weather Report 2000</h1>
          <button>+ Add City</button>
        </header>
        <main>
          { this.state.visibleCities.map((city) => <CityWeather city={city} key={city.id} />) }
        </main>
      </div>
    );
  }

}

export default App;
