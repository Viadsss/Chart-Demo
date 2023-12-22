import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(...registerables);

export default function BarChartFull({ chartData }) {
  const data = {
    labels: chartData.map((data) => "day " + data.day),
    datasets: [
      {
        label: "Allowance",
        data: chartData.map((data) => data.allowance),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: chartData.map((data) => data.expenses),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={data} />;
}

BarChartFull.propTypes = {
  chartData: PropTypes.array.isRequired,
};
