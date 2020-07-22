import React from 'react';
import {Pie} from 'react-chartjs-2';


export default function PieChart({pieData}){
  const myData = {
    labels: [
        'Total Deaths',
        'Total Recovered',
        'Total Cases'
    ],
    datasets: [{
        data: [pieData.deaths,pieData.recovered, pieData.total],
        backgroundColor: [
            'red',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

    return (
      <div>
        <Pie data={myData} height={100} width={200} />
      </div>
    );
  }
