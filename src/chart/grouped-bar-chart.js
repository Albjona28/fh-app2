import React from 'react';
import { Bar } from 'react-chartjs-2';

const GroupedBarChart = ({ data }) => {
  const years = data.map(({ Year }) => Year);
  const gasFlaring = data.map(obj => obj.hasOwnProperty("Gas Flaring") ? obj["Gas Flaring"] : 0);
  const gasFuel = data.map(obj => obj.hasOwnProperty("Gas Fuel") ? obj["Gas Fuel"] : 0);
  const liquidFuel = data.map(obj => obj.hasOwnProperty("Liquid Fuel") ? obj["Liquid Fuel"] : 0);
  const solidFuel = data.map(obj => obj.hasOwnProperty("Solid Fuel") ? obj["Solid Fuel"] : 0);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Gas Flaring',
        data: gasFlaring,
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Gas Fuel',
        data: gasFuel,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Liquid Fuel',
        data: liquidFuel,
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      },
      {
        label: 'Solid Fuel',
        data: solidFuel,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
    ],
  };

  const chartOptions = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default GroupedBarChart;