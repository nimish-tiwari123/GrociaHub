import React from "react";
import "./style.css";

type ButtonProps = {
  leftIcon?: React.ReactNode;
  btnLabel: string;
  btnStyle?: string;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  leftIcon,
  btnLabel,
  btnStyle,
  rightIcon,
  onClick,
}) => {
  return (
    <button
      type="submit"
      className={`d-flex align-items-center gap-2 btn-hover ${btnStyle || ""}`}
      onClick={onClick}
    >
      {leftIcon}
      {btnLabel}
      {rightIcon}
    </button>
  );
};

export default Button;
