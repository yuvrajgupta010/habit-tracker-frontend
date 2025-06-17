import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const labels = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      max: 3,
    },
  },
};

export default function DataBarChart({ barData = [], yMax = undefined }) {
  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Your Achievement",
        backgroundColor: "#6c5ffc",
        data: barData,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: yMax,
      },
    },
  };

  return (
    <Chart type="bar" data={data} options={options} className="appchart" />
  );
}
