import React from 'react';

import { Chart as ChartJs, ChartOptions, TimeScale } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import { Weather } from '../../api.service';

export interface HistoricGraphProps {
  weather: Weather[];
}

export interface HistoricGraphState {
  data: any;
}

class HistoricGraph extends React.Component<HistoricGraphProps, HistoricGraphState> {
  options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time'
      }
    },
  };

  constructor(props: any) {
    super(props);

    ChartJs.register(TimeScale)


    const chartData = {
      datasets: this.props.weather.map((w: Weather) => {
        return {
          x: new Date(w.time).getTime(),
          y: w.temperature,
        }
      })
    };
    this.state = {
      data: chartData,
    };
  }

  // componentDidMount() {
  //   const chartData = {
  //     datasets: this.props.weather.map((w: Weather) => {
  //       return {
  //         x: new Date(w.time).getTime(),
  //         y: w.temperature,
  //       }
  //     })
  //   };

  //   this.setState({ data: chartData });
  // }

  render(): React.ReactNode {
    return (
      <div>
        {/* { this.state.data ? <Chart type="line" data={this.state.data} options={this.options} /> : null } */}
      </div>
    );
  }

}

export default HistoricGraph;
