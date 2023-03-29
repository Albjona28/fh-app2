import React from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

const generateChartData = (data) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#CC65FE",
          "#29EBF2",
          "#F2C029",
        ],
      },
    ],
  };

  data.forEach((item) => {
    chartData.labels.push(item.Year.toString());
    chartData.datasets[0].data.push(item.Total);
  });

  return chartData;
};

const Chart = ({ data }) => {
  const chartData = generateChartData(data);

  return <div style={{height:"60vh",position:"relative", marginBottom:"1%", padding:"1%"}}>
  <Pie data={chartData} /> </div>;
};

export default Chart;