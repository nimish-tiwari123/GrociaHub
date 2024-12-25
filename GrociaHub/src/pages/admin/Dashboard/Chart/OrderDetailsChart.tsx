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
        label: "Weekly Orders",
        data: [70, 30, 0], // Weekly data for Completed, Pending, Cancelled
        backgroundColor: ["#009933", "#e0e0e0", "#e0e0e0"],
        cutout: "60%", // Hollow center
      },
      {
        label: "Monthly Orders",
        data: [50, 40, 10], // Monthly data for Completed, Pending, Cancelled
        backgroundColor: ["#e0e0e0", "#FFCC00", "#e0e0e0"],
        cutout: "55%", // Hollow center
      },
      {
        label: "Yearly Orders",
        data: [30, 50, 20], // Yearly data for Completed, Pending, Cancelled
        backgroundColor: ["#e0e0e0", "#e0e0e0", "#FF4D4D"],
        cutout: "50%", // Hollow center
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the default legend for a cleaner chart
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}%`, // Tooltip displaying percentage
        },
      },
    },
  };

  return (
    <div className="order-details-chart mt-0 mb-3 my-md-4 border rounded p-3 bg-white custom-shadow">
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
      <div className="mt-3 d-flex justify-content-center px-4 pt-3 pb-4">
        <Doughnut data={data} options={options} />
      </div>
      <div className="chart-legend mt-3 d-flex justify-content-around">
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#009933" }}
          ></span>
          Weekly Orders
        </div>
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#FFCC00" }}
          ></span>
          Monthly Orders
        </div>
        <div>
          <span
            className="legend-icon"
            style={{ backgroundColor: "#FF4D4D" }}
          ></span>
          Yearly Orders
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsChart;
