import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Loading from '../Components/Loading';
//import TimelineData from '../Data/TimelineData';


export default function LineChart({ region }) {
  const [dates, setDates] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  useEffect(() => {
    async function getData() {
      var dataset = [];
      var dates = [];
      var cases = [];
      var deaths = [];
      let response = null;
      let TimelineData = null;
      if (region.code === "GLO") {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        response = await fetch(proxyUrl + 'https://thevirustracker.com/timeline/map-data.json');
        TimelineData = await response.json();
        TimelineData.data.map((country) => {
          var index = dataset.findIndex(o => o.milli === Date.parse(country.date));
          if (index > -1) {
            dataset[index].cases += parseInt(country.cases);
            dataset[index].deaths += parseInt(country.deaths);
          } else {
            dataset = [...dataset, {
              date: country.date,
              cases: parseInt(country.cases),
              deaths: parseInt(country.deaths),
              milli: Date.parse(country.date)
            }]
          }
        })
        dataset = dataset.sort((a, b) => (a.milli > b.milli) ? 1 : -1)
        dataset.map((obj) => {
          dates = [...dates, obj.date];
          cases = [...cases, obj.cases];
          deaths = [...deaths, obj.deaths];
        })

      } else {
        response = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=' + region.code);
        TimelineData = await response.json();
        TimelineData = TimelineData.timelineitems[0];
        dates = Object.keys(TimelineData);
        dates.map((date) => {
          cases = [...cases, TimelineData[date].total_cases];
          deaths = [...deaths, TimelineData[date].total_deaths];
        })
      }
      setDates(dates);
      setCases(cases);
      setDeaths(deaths);
    };
    getData();
  }, [region]);
  const data = {
    labels: dates,//['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Cases',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#FFCE56',
        borderColor: '#FFCE56',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFCE56',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FFCE56',
        pointHoverBorderColor: '@FFCE56',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: cases//[65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Total Deaths',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'red',
        borderColor: 'red',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: deaths//[65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  return (
    <div>
      <h2>Overall Timeline</h2>
      {(dates.length === 0 || cases.length === 0) ?
        <div>
          <Loading type={"Rings"} color={"gray"} />
          Fetching data please wait..
        </div>
        : <Line data={data} />}

    </div>
  );
}