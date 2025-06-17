import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataPieChart = ({ goalCompletion = 65, totalCount = 100 }) => {
  const data = {
    labels: ["Goal Complete"],
    datasets: [
      {
        data: [goalCompletion, totalCount - goalCompletion],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default DataPieChart;
