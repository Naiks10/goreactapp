
import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';

const plotOptions = {
  series: {
    series: {
        pointStart: Date.UTC(2019, 0, 1),
        pointInterval: 24 * 3600 * 1000
    }
  }
};

const Tass = () => (
  <div className="justify-content-md-center">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>График выполненной работы</Title>

      <Subtitle>На основе данных исполнительной группы</Subtitle>

      <XAxis>
        <XAxis.Title>Время (д.)</XAxis.Title>
      </XAxis>

      <YAxis max="100">
        <YAxis.Title>Процент выполнения работы (%)</YAxis.Title>
        <LineSeries name="Installation" data={[5, 10, 15, 20, 25, 35, 40, 55, 60, 65, 75, 90, 100]} />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(Tass, Highcharts);