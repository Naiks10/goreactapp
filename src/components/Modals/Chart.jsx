
import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries, Annotation, Tooltip
} from 'react-jsx-highcharts';

const plotOptions = {
    series: {
      pointStart: Date.UTC(2019, 1, 1, 0, 0, 0),
      pointInterval: 3600000 * 24, // one hour
    },
};

//#--get-data-func--#//

function getData(arr, value) {
  var self = ''
  arr.forEach((item, i) => {
    if (item['name'] == value) {
      self = item['desc']
    }
  })
  return self
}

//#--Chart-class--#//

const Tass = (props) => (
  <div className="justify-content-md-center">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>График выполненной работы</Title>

      <Subtitle>На основе данных исполнительной группы</Subtitle>

      <XAxis type="datetime" id="xas">
        <XAxis.Title>Время (д.)</XAxis.Title>
      </XAxis>

      <Tooltip hideDelay={250} className="col" shape="square" formatter={function () {
        var date = new Date(this.x)
        var options = {
          month: 'long',
          day: 'numeric'
        };
        return (
        `<div class="col">
          <ol class="list-group">
            <li class="list-group-item"><u>День</u> : <b> ${date.toLocaleString("ru", options)} </b>;</li><br/>
            <li class="list-group-item"><u>Процент выполнения</u> : <b> ${this.y} </b>;</li><br/>
            <li class="list-group-item"><u>Заметка</u> : ${getData(props.data, this.y)}</li><br/>
          </ol>
        </div>`
        );
      }} />

      <YAxis id="yas" max="100">
        <YAxis.Title>Процент выполнения работы (%)</YAxis.Title>
        <LineSeries name="Devs" data={props.data.map(result => result.name)} />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(Tass, Highcharts);