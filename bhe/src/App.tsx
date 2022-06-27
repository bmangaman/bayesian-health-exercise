import React from 'react';
import Select from 'react-select';

import './App.scss';
import ApiService, { City } from './api.service';
import CityWeather from './CityWeather/CityWeather';

export interface AppState {
  loaded: boolean,
  cities: { value: City, label: string }[];
  selectedCities: City[];
  savedCities: { value: City, label: string }[];
}

class App extends React.Component<{}, AppState> {
  readonly _localStorageKey: string = 'bayesian-health-exercie-selected-cities';

  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      cities: [],
      selectedCities:[],
      savedCities: [],
    };
  }

  componentDidMount() {
    /**
     * Get the list of cities and set the displayed city weather based on the settings
     * saved to local storage.
     * 
     * I know this is a bit ugly, but the select third party component was giving me some trouble with typing.
     */
    ApiService.getCities().then((cities: City[]) => {
      const options = cities.map((city: City) => ({ value: city, label: city.name }));
      const fromStorage = localStorage.getItem(this._localStorageKey);
      const selectedStorage = fromStorage ? JSON.parse(fromStorage) : [];
      const selectedCities = cities.filter((city: City) => selectedStorage.includes(city.id));
      const selectedOptions = selectedCities.map((city: City) => ({ value: city, label: city.name }));
      this.setState({ cities: options, selectedCities, savedCities: selectedOptions, loaded: true });
    });
  }

  /**
   * Handle when the city select changes.
   * Sets the state of the component and saves the list of cities to localstorage.
   *
   * @param selectedCities The cities to be selected.
   */
  handleChange = (selectedCities: any) => {
    const cities = selectedCities.map((mV: any) => mV.value);
    const cityIds: string[] = cities.map((city: City) => city.id);
    this.setState({ selectedCities: cities });
    localStorage.setItem(this._localStorageKey, JSON.stringify(cityIds));
  };

  render(): React.ReactNode {
    return (
      <div className="wrapper">
        <header>
          <h1>Weather Report 2000</h1>
          <div className="city-selector">
            <label>Select Cities</label>
            { this.state.loaded ? 
              <Select
                defaultValue={this.state.savedCities}
                onChange={this.handleChange}
                isMulti={true}
                options={this.state.cities as any}
              /> : null
            }
          </div>
        </header>
        <main>
          { this.state.selectedCities.map((city) => <CityWeather city={city} key={city.id} />) }
        </main>
      </div>
    );
  }

}

export default App;
