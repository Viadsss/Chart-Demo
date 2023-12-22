import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(...registerables);

export default function BarChart({ chartData }) {
  const filteredData = chartData.filter(
    (data) => data.allowance !== null || data.expenses !== null
  );

  const data = {
    labels: filteredData.map((data) => "day " + data.day),
    datasets: [
      {
        label: "Allowance",
        data: filteredData.map((data) => data.allowance),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: filteredData.map((data) => data.expenses),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={data} />;
}

BarChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};
