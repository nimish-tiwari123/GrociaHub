import React from "react";
import "./style.css";

type ButtonProps = {
  leftIcon?: React.ReactNode;
  btnLabel: string;
  btnStyle?: string;
  rightIcon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  leftIcon,
  btnLabel,
  btnStyle,
  rightIcon,
}) => {
  return (
    <div>
      <button className={`d-flex align-items-center gap-2 btn-hover ${btnStyle || ""}`}>
        {leftIcon}
        {btnLabel}
        {rightIcon}
      </button>
    </div>
  );
};

export default Button;
