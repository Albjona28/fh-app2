import { Line } from "react-chartjs-2";

export const LineChart = ({data}) => {

    const years = data.map((d) => d.Year);
    const totals = data.map((d) => d.Total);

    const chartData = {
      labels: years,
      datasets: [
        {
          label: "Total",
          data: totals,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;