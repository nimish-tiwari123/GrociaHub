import React from "react";

interface CardProps {
  icon: React.ReactNode;
  heading: string;
  subHeading: string;
}

const Card: React.FC<CardProps> = ({ icon, heading, subHeading }) => {
  return (
    <div className="dashboard-card p-3 bg-white rounded border mt-3 mt-lg-0">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <p className="opacity-75 m-0 fw-medium">{subHeading}</p>
          <h5 className="mb-0 fs-2 m-1 fw-bold">{heading}</h5>
        </div>
        <div className="bg-custom-primary rounded-circle d-flex align-items-center justify-content-center card-icon-container text-light">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
