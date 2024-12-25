import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const data = {
    labels: ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [10000, 8000, 9000, 2000, 7000, 10000, 6000],
        backgroundColor: "#009933",
        borderRadius: 5,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        type: "linear", 
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value.toLocaleString(),
        },
        grid: {
          drawBorder: false,
        },
      },
      x: {
        type: "category", 
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="my-3 my-md-4 border rounded p-3 bg-white custom-shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Sales Overview</h5>
        <select
          className="form-select w-auto rounded-pill outline-none"
          defaultValue="Weekly"
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="mt-3">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
