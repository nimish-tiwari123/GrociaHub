import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./style.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderDetailsChart: React.FC = () => {
  const data = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Completed",
        data: [70, 30, 0],
        backgroundColor: ["#009933", "#e0e0e0", "#e0e0e0"],
        cutout: "80%",
      },
      {
        label: "Pending",
        data: [0, 50, 50],
        backgroundColor: ["#e0e0e0", "#FFCC00", "#e0e0e0"],
        cutout: "65%",
      },
      {
        label: "Cancelled",
        data: [0, 0, 100],
        backgroundColor: ["#e0e0e0", "#e0e0e0", "#FF4D4D"],
        cutout: "50%",
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
          label: (context: any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="order-details-chart my-4 border rounded p-3 bg-white custom-shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Order Details</h5>
        <select
          className="form-select w-auto rounded-pill outline-none"
          defaultValue="Weekly"
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <Doughnut data={data} options={options} />
      </div>
      <div className="chart-legend mt-3 d-flex justify-content-around">
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#009933" }}
          ></span>
          Completed
        </div>
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#FFCC00" }}
          ></span>
          Pending
        </div>
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#FF4D4D" }}
          ></span>
          Cancelled
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsChart;
